"use client";

import { motion } from "framer-motion";

/**
 * The signature moment: a styling-station vanity mirror. Round bulbs ring a
 * portrait and ignite in a chasing sequence on load, then settle to a steady
 * warm glow. Degrades to all-bulbs-lit under prefers-reduced-motion.
 */

const H_BULBS = 7; // bulbs across top / bottom
const V_BULBS = 9; // bulbs down each side

function Bulb({ order }: { order: number }) {
  return (
    <motion.span
      className="block rounded-full"
      style={{
        width: 12,
        height: 12,
        background: "var(--bulb)",
      }}
      initial={{ opacity: 0.12, boxShadow: "0 0 0px 0px var(--bulb-glow)" }}
      animate={{
        opacity: [0.12, 1, 0.92],
        boxShadow: [
          "0 0 0px 0px var(--bulb-glow)",
          "0 0 16px 5px var(--bulb-glow)",
          "0 0 11px 2px var(--bulb-glow)",
        ],
      }}
      transition={{
        duration: 0.5,
        delay: 0.6 + order * 0.05,
        ease: "easeOut",
      }}
    />
  );
}

export default function VanityFrame({ src }: { src: string }) {
  // Perimeter ignition order, clockwise from top-left.
  const top = Array.from({ length: H_BULBS }, (_, i) => i);
  const right = Array.from({ length: V_BULBS }, (_, i) => H_BULBS + i);
  const bottom = Array.from({ length: H_BULBS }, (_, i) => H_BULBS + V_BULBS + (H_BULBS - 1 - i));
  const left = Array.from({ length: V_BULBS }, (_, i) => H_BULBS + V_BULBS + H_BULBS + (V_BULBS - 1 - i));

  return (
    <div className="relative mx-auto" style={{ maxWidth: 460 }}>
      {/* warm wash behind the station */}
      <div
        className="absolute -inset-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 42%, var(--bulb-glow) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
        aria-hidden
      />

      <div
        className="relative"
        style={{
          padding: "26px",
          borderRadius: 6,
          background:
            "linear-gradient(180deg, var(--noir-2), var(--noir-3))",
          border: "1px solid var(--border-strong)",
          boxShadow: "0 40px 120px -30px rgba(0,0,0,0.8)",
        }}
      >
        {/* Top bulb rail */}
        <div className="absolute left-7 right-7 flex justify-between" style={{ top: 7 }}>
          {top.map((o) => (
            <Bulb key={`t${o}`} order={o} />
          ))}
        </div>
        {/* Bottom bulb rail */}
        <div className="absolute left-7 right-7 flex justify-between" style={{ bottom: 7 }}>
          {bottom.map((o, i) => (
            <Bulb key={`b${i}`} order={o} />
          ))}
        </div>
        {/* Left bulb rail */}
        <div className="absolute top-7 bottom-7 flex flex-col justify-between" style={{ left: 7 }}>
          {left.map((o, i) => (
            <Bulb key={`l${i}`} order={o} />
          ))}
        </div>
        {/* Right bulb rail */}
        <div className="absolute top-7 bottom-7 flex flex-col justify-between" style={{ right: 7 }}>
          {right.map((o, i) => (
            <Bulb key={`r${i}`} order={o} />
          ))}
        </div>

        {/* The "mirror" — graded portrait */}
        <div
          className="graded"
          style={{ borderRadius: 3, aspectRatio: "4 / 5", border: "1px solid var(--border)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="A guest styled at Kador Beauty Salon" loading="eager" />
          {/* mirror sheen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, transparent 22%, transparent 78%, rgba(255,255,255,0.05) 100%)",
              zIndex: 2,
            }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
