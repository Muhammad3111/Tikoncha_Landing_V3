"use client";

import { useEffect } from "react";

export function VideoModalManager() {
  useEffect(() => {
    const getModal = () => document.querySelector<HTMLElement>("[data-video-modal]");
    const getPlayer = () => document.querySelector<HTMLVideoElement>("[data-video-modal-player]");

    const closeModal = () => {
      const modal = getModal();
      const player = getPlayer();
      if (!modal || !player) return;
      player.pause();
      player.removeAttribute("src");
      player.load();
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("video-modal-open");
    };

    const openModal = (src: string) => {
      const modal = getModal();
      const player = getPlayer();
      if (!modal || !player || !src) return;
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("video-modal-open");

      if (player.getAttribute("src") !== src) {
        player.setAttribute("src", src);
        player.load();
      }

      const promise = player.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch(() => {});
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest("[data-video-modal-trigger]");
      if (trigger) {
        event.preventDefault();
        const source = trigger.getAttribute("data-video-src") || trigger.getAttribute("href") || "";
        openModal(source);
        return;
      }

      if (target.closest("[data-video-modal-close]")) {
        event.preventDefault();
        closeModal();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      closeModal();
      document.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="video-modal" data-video-modal hidden aria-hidden="true">
      <div className="video-modal__backdrop" data-video-modal-close></div>
      <div className="video-modal__dialog" data-video-modal-dialog role="dialog" aria-modal="true">
        <button type="button" className="video-modal__close" data-video-modal-close aria-label="Close video">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round"></path>
          </svg>
        </button>
        <video
          className="video-modal__player"
          data-video-modal-player
          controls
          preload="none"
          playsInline
          controlsList="nodownload"
        >
          Your browser does not support video playback.
        </video>
      </div>
    </div>
  );
}
