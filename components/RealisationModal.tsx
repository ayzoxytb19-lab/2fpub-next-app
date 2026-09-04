"use client";

import { useEffect, useState } from "react";
import { realisationCategoryLabel } from "@/lib/realisations/categories";
import type { RealisationSummary } from "@/components/RealisationsGallery";

const CLOSE_ANIMATION_MS = 280;

export default function RealisationModal({
  project,
  onClose,
}: {
  project: RealisationSummary;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, CLOSE_ANIMATION_MS);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const images = project.images.length > 0 ? project.images : [{ url: "", alt: "" }];
  const current = images[index];

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <div
      className={`rea-modal-backdrop${visible ? " open" : ""}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.seoTitle}
    >
      <div className="rea-modal-bg" />
      <div className="rea-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="rea-modal-close" onClick={handleClose} aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="rea-modal-img">
          {current.url && (
            <img className="rea-modal-img-inner" src={current.url} alt={current.alt || project.seoTitle} />
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="rea-modal-carousel-arrow rea-modal-carousel-arrow-prev"
                onClick={prev}
                aria-label="Photo précédente"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className="rea-modal-carousel-arrow rea-modal-carousel-arrow-next"
                onClick={next}
                aria-label="Photo suivante"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <div className="rea-modal-carousel-dots">
                {images.map((img, i) => (
                  <button
                    key={img.url + i}
                    type="button"
                    className={i === index ? "active" : ""}
                    onClick={() => setIndex(i)}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="rea-modal-body">
          <span className="rea-modal-badge">{realisationCategoryLabel(project.category)}</span>
          <h2 className="rea-modal-title">{project.seoTitle}</h2>
          {project.description && <p className="rea-modal-desc">{project.description}</p>}
        </div>
      </div>
    </div>
  );
}
