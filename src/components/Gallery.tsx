"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GALLERY } from "@/lib/site";

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="gallery" ref={ref} className="section-pad relative" style={{ background: "var(--noir-2)" }}>
      <div className="shell">
        <div className="flex items-end justify-between flex-wrap" style={{ gap: "1rem", marginBottom: "3rem" }}>
          <div className="flex flex-col" style={{ gap: "1rem" }}>
            <span className="eyebrow">Under the light</span>
            <h2 className="display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>
              The work, lit the way<br />you&rsquo;ll wear it.
            </h2>
          </div>
          <p style={{ maxWidth: 320, color: "var(--pearl-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            A look at the chair. Real finishes, real light, the kind of result
            that walks out the door and gets noticed.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`graded gi gi-${i}`}
              data-cursor
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.caption} loading="lazy" />
              <figcaption
                className="absolute"
                style={{ left: 18, bottom: 16, zIndex: 2, fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--pearl)" }}
              >
                <span style={{ color: "var(--champagne)" }}>&#9670;</span> {g.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 200px;
          gap: 14px;
        }
        .gi {
          border-radius: 4px;
          border: 1px solid var(--border);
        }
        .gi-0 {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
        }
        .gi-1 {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
        .gi-2 {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }
        .gi-3 {
          grid-column: 1 / 2;
          grid-row: 3 / 4;
        }
        .gi-4 {
          grid-column: 2 / 3;
          grid-row: 3 / 4;
        }
        @media (min-width: 860px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 230px;
          }
          .gi-0 { grid-column: 1 / 2; grid-row: 1 / 3; }
          .gi-1 { grid-column: 2 / 4; grid-row: 1 / 2; }
          .gi-2 { grid-column: 4 / 5; grid-row: 1 / 3; }
          .gi-3 { grid-column: 2 / 3; grid-row: 2 / 3; }
          .gi-4 { grid-column: 3 / 4; grid-row: 2 / 3; }
        }
      `}</style>
    </section>
  );
}
