"use client";

import { useEffect, useState } from "react";

type Props = {
  to: string;
};

const FALLBACK_DELAY_MS = 4000;

export function StaticRedirectPage({ to }: Props) {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    window.location.replace(to);
    const timer = window.setTimeout(() => setShowFallback(true), FALLBACK_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [to]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Yuklanmoqda"
      style={{ backgroundColor: "#121212" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 px-6 text-center"
    >
      <span className="tikoncha-loader-glow" aria-hidden="true" />

      <img
        src="/logo.png"
        alt="Tikoncha"
        width="220"
        height="74"
        decoding="async"
        fetchPriority="high"
        className="tikoncha-loader-logo h-10 w-auto md:h-14"
      />

      <div className="tikoncha-loader-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <a
        href={to}
        className="text-sm text-secondary underline underline-offset-4 transition-opacity duration-300"
        style={{ opacity: showFallback ? 0.85 : 0, pointerEvents: showFallback ? "auto" : "none" }}
      >
        Avtomatik o&apos;tmasa shu havolani bosing
      </a>

      <style>{`
        .tikoncha-loader-glow {
          position: absolute;
          width: 520px;
          height: 520px;
          max-width: 80vw;
          max-height: 80vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(75, 180, 98, 0.22) 0%, rgba(75, 180, 98, 0) 70%);
          filter: blur(40px);
          pointer-events: none;
          animation: tikoncha-glow-pulse 2.4s ease-in-out infinite;
        }
        .tikoncha-loader-logo {
          position: relative;
          animation: tikoncha-logo-breath 2.4s ease-in-out infinite;
        }
        .tikoncha-loader-dots {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .tikoncha-loader-dots span {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #4bb462;
          animation: tikoncha-dot-bounce 1.1s ease-in-out infinite;
        }
        .tikoncha-loader-dots span:nth-child(2) { animation-delay: 0.15s; }
        .tikoncha-loader-dots span:nth-child(3) { animation-delay: 0.3s; }

        @keyframes tikoncha-logo-breath {
          0%, 100% { opacity: 0.92; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes tikoncha-glow-pulse {
          0%, 100% { opacity: 0.55; transform: scale(0.95); }
          50% { opacity: 0.95; transform: scale(1.08); }
        }
        @keyframes tikoncha-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.55; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tikoncha-loader-glow,
          .tikoncha-loader-logo,
          .tikoncha-loader-dots span {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
