"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SERVICES } from "@/lib/site";

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section id="services" ref={ref} className="section-pad relative">
      <div className="shell">
        <div className="flex flex-col" style={{ gap: "1rem", marginBottom: "3.5rem" }}>
          <span className="eyebrow">On the chair</span>
          <h2 className="display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", maxWidth: 720 }}>
            Everything you came in for, and the bit you didn&rsquo;t know you needed.
          </h2>
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "var(--border)" }}
        >
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
              style={{ background: "var(--noir)", padding: "2.6rem 2rem 2.4rem" }}
            >
              <span
                className="display"
                style={{ position: "absolute", top: 18, right: 22, fontSize: "5rem", lineHeight: 1, color: "var(--pearl)", opacity: 0.05 }}
                aria-hidden
              >
                0{i + 1}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--champagne)",
                }}
              >
                {s.key}
              </span>
              <h3 className="display display-it" style={{ fontSize: "1.9rem", marginTop: "0.9rem" }}>
                {s.title}
              </h3>
              <p style={{ marginTop: "1rem", color: "var(--pearl-dim)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                {s.body}
              </p>
              <ul style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {s.detail.map((d) => (
                  <li key={d} className="flex items-center" style={{ gap: "0.6rem", fontSize: "0.85rem", color: "var(--pearl-dim)" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--orchid)" }} />
                    {d}
                  </li>
                ))}
              </ul>
              <span
                className="absolute left-0 bottom-0 origin-left"
                style={{
                  height: 2,
                  width: "100%",
                  background: "var(--champagne)",
                  transform: "scaleX(0)",
                  transition: "transform 0.5s ease",
                }}
                aria-hidden
              />
              <style jsx>{`
                .group:hover span:last-child {
                  transform: scaleX(1) !important;
                }
              `}</style>
            </motion.article>
          ))}
        </div>

        <p style={{ marginTop: "2rem", color: "var(--pearl-faint)", fontSize: "0.85rem", letterSpacing: "0.02em" }}>
          Not sure what you need? Call and we&rsquo;ll talk it through before you sit down.
        </p>
      </div>
    </section>
  );
}
