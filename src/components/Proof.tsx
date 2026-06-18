"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE } from "@/lib/site";

export default function Proof() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="section-pad relative" style={{ background: "var(--noir-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div
        className="orb-float absolute pointer-events-none"
        style={{ top: "10%", right: "6%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, var(--orchid-glow) 0%, transparent 70%)" }}
        aria-hidden
      />
      <div className="shell relative text-center" style={{ maxWidth: 860 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center justify-center"
          style={{ gap: "0.4rem", marginBottom: "1.6rem" }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={{ color: "var(--champagne)", fontSize: "1.4rem", textShadow: "0 0 12px var(--bulb-glow)" }}>
              &#9733;
            </span>
          ))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="display"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.4rem)" }}
        >
          <span style={{ color: "var(--bulb)" }}>{SITE.rating}</span> out of five,
          <br />
          <span className="display-it">earned one chair at a time.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25 }}
          style={{ marginTop: "1.6rem", color: "var(--pearl-dim)", fontSize: "1.05rem", lineHeight: 1.65 }}
        >
          {SITE.reviewCount} and counting. The number that matters most around
          here is the one that brings guests back, and sends their friends
          through the door.
        </motion.p>
      </div>
    </section>
  );
}
