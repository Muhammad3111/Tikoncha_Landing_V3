"use client";

import { useEffect } from "react";

type Point = {
  x: number;
  y: number;
};

export function CursorTrail() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !hasFinePointer) return;

    const canvas = document.getElementById("cursor-trail-canvas");
    if (!(canvas instanceof HTMLCanvasElement) || canvas.dataset.ready) return;

    canvas.dataset.ready = "true";

    const context = canvas.getContext("2d");
    if (!context) {
      delete canvas.dataset.ready;
      return;
    }

    const MIN_TRAIL_LENGTH_PX = 10;
    const MAX_TRAIL_LENGTH_PX = 100;
    const SPEED_MIN_PX_PER_MS = 0.18;
    const SPEED_MAX_PX_PER_MS = 2.1;
    const BASE_HEAD_RADIUS = 6.2;
    const MAX_HEAD_RADIUS = 9.5;
    const IDLE_SHRINK_PX = 13;
    const IDLE_THRESHOLD_MS = 72;

    const points: Point[] = [];
    let dpr = 1;
    let pointerVisible = false;
    let pointerX = 0;
    let pointerY = 0;
    let lastMoveTime = 0;
    let lastEventTime = 0;
    let smoothedSpeed = 0;
    let frameId = 0;

    const clamp = (value: number, min: number, max: number): number =>
      Math.max(min, Math.min(max, value));

    const toCanvasColor = (raw: string): string => {
      if (!raw) return "";
      if (raw.startsWith("rgb(") || raw.startsWith("rgba(") || raw.startsWith("#")) return raw;

      const parts = raw.split(/\s+/).filter(Boolean).slice(0, 3);
      const isRgbTriple = parts.length === 3 && parts.every((part) => !Number.isNaN(Number(part)));
      return isRgbTriple ? `rgb(${parts.join(",")})` : "";
    };

    const getTrailColor = (): string => {
      const styles = getComputedStyle(document.documentElement);
      const candidates = [
        styles.getPropertyValue("--color-cursor-trail").trim(),
        styles.getPropertyValue("--color-secondary").trim(),
      ];

      for (const candidate of candidates) {
        const parsed = toCanvasColor(candidate);
        if (parsed) return parsed;
      }

      return "rgb(75,180,98)";
    };

    let trailColor = getTrailColor();

    const distance = (a: Point, b: Point): number => Math.hypot(b.x - a.x, b.y - a.y);

    const getSpeedProgress = (): number => {
      const normalized = clamp(
        (smoothedSpeed - SPEED_MIN_PX_PER_MS) / (SPEED_MAX_PX_PER_MS - SPEED_MIN_PX_PER_MS),
        0,
        1,
      );
      return normalized ** 1.85;
    };

    const getDynamicTrailLength = (): number =>
      MIN_TRAIL_LENGTH_PX + (MAX_TRAIL_LENGTH_PX - MIN_TRAIL_LENGTH_PX) * getSpeedProgress();

    const getDynamicHeadRadius = (): number =>
      BASE_HEAD_RADIUS + (MAX_HEAD_RADIUS - BASE_HEAD_RADIUS) * getSpeedProgress();

    const resizeCanvas = (): void => {
      dpr = Math.max(window.devicePixelRatio || 1, 1);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      trailColor = getTrailColor();

      if (!pointerVisible) {
        pointerX = width * 0.5;
        pointerY = height * 0.5;
      }
    };

    const clampTrailLength = (maxLength: number): void => {
      let totalLength = 0;
      for (let i = 1; i < points.length; i += 1) {
        totalLength += distance(points[i - 1], points[i]);
      }

      while (totalLength > maxLength && points.length > 1) {
        const first = points[0];
        const second = points[1];
        const segmentLength = distance(first, second) || 0.0001;
        const overflow = totalLength - maxLength;

        if (segmentLength <= overflow) {
          points.shift();
          totalLength -= segmentLength;
        } else {
          const ratio = overflow / segmentLength;
          first.x += (second.x - first.x) * ratio;
          first.y += (second.y - first.y) * ratio;
          totalLength = maxLength;
        }
      }
    };

    const shrinkTrail = (shrinkPx: number): void => {
      let remaining = shrinkPx;
      while (remaining > 0 && points.length > 1) {
        const first = points[0];
        const second = points[1];
        const segmentLength = distance(first, second) || 0.0001;

        if (segmentLength <= remaining) {
          points.shift();
          remaining -= segmentLength;
        } else {
          const ratio = remaining / segmentLength;
          first.x += (second.x - first.x) * ratio;
          first.y += (second.y - first.y) * ratio;
          remaining = 0;
        }
      }
    };

    const drawTrailStroke = (lineWidth: number): void => {
      if (points.length < 2) return;

      context.save();
      context.strokeStyle = trailColor;
      context.globalAlpha = 0.92;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 1; i += 1) {
        const next = points[i + 1];
        const midpointX = (points[i].x + next.x) * 0.5;
        const midpointY = (points[i].y + next.y) * 0.5;
        context.quadraticCurveTo(points[i].x, points[i].y, midpointX, midpointY);
      }

      const tail = points[points.length - 1];
      context.lineTo(tail.x, tail.y);
      context.stroke();
      context.restore();
    };

    const drawHeadCircle = (radius: number): void => {
      if (!pointerVisible) return;
      context.save();
      context.fillStyle = trailColor;
      context.globalAlpha = 0.98;
      context.beginPath();
      context.arc(pointerX, pointerY, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const onPointerMove = (event: PointerEvent): void => {
      const now = performance.now();
      const { clientX, clientY } = event;
      const deltaX = clientX - pointerX;
      const deltaY = clientY - pointerY;
      const deltaTime = lastEventTime > 0 ? Math.max(now - lastEventTime, 1) : 16;
      const instantSpeed = Math.hypot(deltaX, deltaY) / deltaTime;
      smoothedSpeed = smoothedSpeed * 0.82 + instantSpeed * 0.18;

      pointerX = clientX;
      pointerY = clientY;
      pointerVisible = true;
      lastMoveTime = now;
      lastEventTime = now;

      const lastPoint = points[points.length - 1];
      if (!lastPoint || Math.hypot(pointerX - lastPoint.x, pointerY - lastPoint.y) > 1.2) {
        points.push({ x: pointerX, y: pointerY });
      }

      clampTrailLength(getDynamicTrailLength());
    };

    const render = (time: number): void => {
      const idleMs = time - lastMoveTime;
      const isMoving = idleMs < IDLE_THRESHOLD_MS;
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.clearRect(0, 0, width, height);

      if (pointerVisible) {
        const trailLength = getDynamicTrailLength();
        const headRadius = getDynamicHeadRadius();
        const lineWidth = headRadius * 2;

        if (isMoving) {
          clampTrailLength(trailLength);
        } else {
          smoothedSpeed *= 0.76;
          shrinkTrail(IDLE_SHRINK_PX);
        }

        drawTrailStroke(lineWidth);
        drawHeadCircle(headRadius);

        if (!isMoving && points.length < 2 && smoothedSpeed < 0.0015) {
          points.length = 0;
        }
      }

      frameId = window.requestAnimationFrame(render);
    };

    const onResize = () => {
      resizeCanvas();
    };

    const onPointerDown = (event: PointerEvent) => {
      onPointerMove(event);
    };

    const onPointerLeave = () => {
      pointerVisible = false;
      points.length = 0;
    };

    resizeCanvas();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    frameId = window.requestAnimationFrame(render);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerleave", onPointerLeave);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      delete canvas.dataset.ready;
    };
  }, []);

  return <canvas id="cursor-trail-canvas" aria-hidden="true"></canvas>;
}
