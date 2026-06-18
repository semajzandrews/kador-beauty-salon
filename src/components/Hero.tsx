"use client";

import { motion } from "framer-motion";
import VanityFrame from "./VanityFrame";
import { SITE, HERO_IMG } from "@/lib/site";

const headline = ["Sit", "down.", "Leave", "luminous."];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center"
      style={{ minHeight: "100svh", paddingTop: "7rem", paddingBottom: "4rem" }}
    >
      {/* ambient orbs */}
      <div
        className="orb-float absolute pointer-events-none"
        style={{
          top: "8%",
          left: "-10%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--orchid-glow) 0%, transparent 68%)",
        }}
        aria-hidden
      />
      <div
        className="orb-float-alt absolute pointer-events-none"
        style={{
          bottom: "2%",
          right: "-8%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--bulb-glow) 0%, transparent 70%)",
          opacity: 0.5,
        }}
        aria-hidden
      />

      <div className="shell relative grid items-center" style={{ gap: "3.5rem" }}>
        <div
          className="grid items-center"
          style={{ gridTemplateColumns: "1fr", gap: "3.5rem" }}
        >
          {/* copy */}
          <div className="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="eyebrow">A beauty salon on Scotland Road</span>
            </motion.div>

            <h1
              className="display"
              style={{ fontSize: "clamp(3rem, 8vw, 6.2rem)", marginTop: "1.4rem" }}
            >
              {headline.map((word, i) => (
                <motion.span
                  key={i}
                  className={i >= 2 ? "display-it" : ""}
                  style={{
                    display: "inline-block",
                    marginRight: "0.28em",
                    color: i >= 2 ? "var(--bulb)" : "var(--pearl)",
                  }}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              style={{
                marginTop: "1.6rem",
                maxWidth: 460,
                color: "var(--pearl-dim)",
                fontSize: "1.05rem",
                lineHeight: 1.65,
              }}
            >
              A full-service beauty salon in the City of Orange. Take the chair,
              face the light, and walk back out looking like the best version of
              your day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-wrap items-center"
              style={{ gap: "1rem", marginTop: "2.2rem" }}
            >
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center"
                style={{
                  padding: "0.95rem 1.7rem",
                  borderRadius: 999,
                  background: "var(--champagne)",
                  color: "var(--noir)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
                data-cursor
              >
                Book your chair
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center"
                style={{
                  padding: "0.95rem 1.4rem",
                  borderRadius: 999,
                  border: "1px solid var(--border-strong)",
                  color: "var(--pearl)",
                  letterSpacing: "0.04em",
                }}
                data-cursor
              >
                See the menu
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.6 }}
              className="flex items-center"
              style={{ gap: "0.7rem", marginTop: "2.2rem", color: "var(--pearl-faint)", fontSize: "0.85rem", letterSpacing: "0.04em" }}
            >
              <span style={{ color: "var(--champagne)", fontWeight: 600 }}>
                {SITE.rating} &#9733;
              </span>
              <span>rated by {SITE.reviewCount}+ guests</span>
            </motion.div>
          </div>

          {/* signature: vanity station */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <VanityFrame src={HERO_IMG} />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          .hero-copy {
            order: -1;
          }
          .shell > div {
            grid-template-columns: 1.05fr 0.95fr !important;
          }
        }
      `}</style>
    </section>
  );
}
