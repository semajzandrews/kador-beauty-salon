"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE, STORY_IMG } from "@/lib/site";

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section id="studio" ref={ref} className="section-pad relative">
      <div className="shell">
        <div className="story-grid">
          {/* photo with offset champagne frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute pointer-events-none"
              style={{ top: 16, left: 16, right: -16, bottom: -16, border: "1px solid var(--champagne)", opacity: 0.4, borderRadius: 4 }}
              aria-hidden
            />
            <div className="graded" style={{ aspectRatio: "4 / 5", borderRadius: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={STORY_IMG} alt="Inside Kador Beauty Salon" loading="lazy" />
            </div>
          </motion.div>

          {/* copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <span className="eyebrow">The studio</span>
            <h2 className="display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.7rem)", marginTop: "1.3rem" }}>
              A neighborhood chair on <span className="display-it" style={{ color: "var(--bulb)" }}>Scotland Road.</span>
            </h2>
            <p style={{ marginTop: "1.6rem", color: "var(--pearl-dim)", lineHeight: 1.7 }}>
              Kador sits on the stretch of Scotland Road that the City of Orange
              comes to when it wants to look like itself, only sharper. No rush,
              no script. You get the consultation first, then the work, then the
              finish that makes the whole thing worth the seat.
            </p>
            <p style={{ marginTop: "1.1rem", color: "var(--pearl-dim)", lineHeight: 1.7 }}>
              It is the kind of place you leave as a regular. The light is good,
              the hands are steady, and the result is the reason guests keep
              coming back.
            </p>

            <div className="flex flex-wrap" style={{ gap: "2.4rem", marginTop: "2.4rem" }}>
              <div>
                <div className="display" style={{ fontSize: "2.6rem", color: "var(--champagne)" }}>
                  {SITE.rating}
                </div>
                <div style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--pearl-faint)" }}>
                  Guest rating
                </div>
              </div>
              <div>
                <div className="display" style={{ fontSize: "2.6rem", color: "var(--champagne)" }}>
                  {SITE.reviewCount}+
                </div>
                <div style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--pearl-faint)" }}>
                  Reviews
                </div>
              </div>
              <div>
                <div className="display" style={{ fontSize: "2.6rem", color: "var(--champagne)" }}>
                  Orange
                </div>
                <div style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--pearl-faint)" }}>
                  New Jersey
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .story-grid {
            grid-template-columns: 0.85fr 1fr;
            gap: 5rem;
          }
        }
      `}</style>
    </section>
  );
}
