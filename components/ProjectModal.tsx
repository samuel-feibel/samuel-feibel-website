"use client";

import { useEffect } from "react";

export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; caption?: string; full?: boolean }
  | { type: "images"; srcs: string[]; captions?: string[] }
  | { type: "video"; src: string; caption?: string; controls?: boolean }
  | { type: "links"; items: { href: string; label: string }[] };

export interface Project {
  name: string;
  label?: string;
  tags?: string[];
  heroImage: string;       // card thumbnail only
  description: string;     // card overlay excerpt
  body?: ContentBlock[];   // rich modal content
  link?: { href: string; label: string };
}

interface Props {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={project.name}>

        {/* Sticky top bar */}
        <div className="modal-topbar">
          <span />
          <button className="modal-topbar-close" onClick={onClose} aria-label="Close">
            ✕ close
          </button>
        </div>

        {/* Scrollable content */}
        <div className="modal-scroll">
          <div className="modal-body">

            {/* ── Header ── */}
            <header className="modal-header">
              <h2 className="modal-title">{project.name}</h2>
              {project.label && <p className="modal-label">{project.label}</p>}
              {project.tags && project.tags.length > 0 && (
                <div className="modal-tags">
                  {project.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}
            </header>

            <div className="modal-divider" />

            {/* ── Document body ── */}
            {project.body ? (
              project.body.map((block, i) => {
                if (block.type === "text") {
                  return <p key={i} className="modal-desc">{block.text}</p>;
                }
                if (block.type === "heading") {
                  return <h3 key={i} className="modal-section-heading">{block.text}</h3>;
                }
                if (block.type === "image") {
                  return (
                    <figure key={i} className="modal-figure">
                      <img src={block.src} alt={block.caption ?? ""} style={block.full ? { maxHeight: "none", objectFit: "contain" } : undefined} />
                      {block.caption && <figcaption>{block.caption}</figcaption>}
                    </figure>
                  );
                }
                if (block.type === "images") {
                  return (
                    <div key={i} className="modal-images">
                      {block.srcs.map((src, j) => (
                        <figure key={j} className="modal-images-figure">
                          <img src={src} alt={block.captions?.[j] ?? ""} />
                          {block.captions?.[j] && <figcaption>{block.captions[j]}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  );
                }
                if (block.type === "links") {
                  return (
                    <div key={i} className="modal-links">
                      {block.items.map((item, j) => (
                        <a key={j} href={item.href} target="_blank" rel="noopener noreferrer" className="modal-link">
                          {item.label}
                        </a>
                      ))}
                    </div>
                  );
                }
                if (block.type === "video") {
                  return (
                    <figure key={i} className="modal-figure">
                      <video
                        src={block.src}
                        className="modal-video"
                        autoPlay={!block.controls}
                        loop={!block.controls}
                        muted={!block.controls}
                        playsInline
                        controls={block.controls}
                      />
                      {block.caption && <figcaption>{block.caption}</figcaption>}
                    </figure>
                  );
                }
              })
            ) : (
              /* Fallback: hero image then description */
              <>
                <figure className="modal-figure modal-figure--hero">
                  <img src={project.heroImage} alt={project.name} />
                </figure>
                <p className="modal-desc">{project.description}</p>
              </>
            )}

            {/* ── Footer link ── */}
            {project.link && (
              <div className="modal-footer">
                <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="modal-link">
                  {project.link.label}
                </a>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
