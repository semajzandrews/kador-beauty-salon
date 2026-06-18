"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE } from "@/lib/site";

export default function Visit() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="visit" ref={ref} className="section-pad relative">
      <div className="shell">
        <div className="visit-grid">
          {/* details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <span className="eyebrow">Find the chair</span>
            <h2 className="display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", marginTop: "1.3rem" }}>
              Come see us on<br />Scotland Road.
            </h2>

            <div style={{ marginTop: "2.4rem", display: "flex", flexDirection: "column", gap: "1.8rem" }}>
              <div>
                <div style={{ fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--champagne)" }}>
                  Address
                </div>
                <a
                  href={SITE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", marginTop: "0.5rem", fontSize: "1.15rem", color: "var(--pearl)" }}
                  data-cursor
                >
                  {SITE.street}
                  <br />
                  {SITE.city}, {SITE.state} {SITE.zip}
                </a>
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--champagne)" }}>
                  Phone
                </div>
                <a
                  href={SITE.phoneHref}
                  style={{ display: "block", marginTop: "0.5rem", fontSize: "1.15rem", color: "var(--pearl)" }}
                  data-cursor
                >
                  {SITE.phoneDisplay}
                </a>
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--champagne)" }}>
                  Hours
                </div>
                <p style={{ marginTop: "0.5rem", fontSize: "1.05rem", color: "var(--pearl-dim)", lineHeight: 1.5 }}>
                  Call ahead to book your chair or check today&rsquo;s hours.
                </p>
              </div>

              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center"
                style={{
                  marginTop: "0.4rem",
                  alignSelf: "flex-start",
                  padding: "0.95rem 1.8rem",
                  borderRadius: 999,
                  background: "var(--champagne)",
                  color: "var(--noir)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
                data-cursor
              >
                Call to book
              </a>
            </div>
          </motion.div>

          {/* map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative"
            style={{
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid var(--border-strong)",
              minHeight: 420,
              boxShadow: "0 40px 110px -40px rgba(0,0,0,0.8)",
            }}
          >
            <iframe
              title="Map to Kador Beauty Salon"
              src={SITE.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420, filter: "grayscale(0.3) contrast(1.05) brightness(0.85)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .visit-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: stretch;
        }
        @media (min-width: 900px) {
          .visit-grid {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 4rem;
          }
        }
      `}</style>
    </section>
  );
}
