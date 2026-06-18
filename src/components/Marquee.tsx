"use client";

const ITEMS = [
  "Cuts",
  "Color",
  "Blowouts",
  "Silk Press",
  "Styling",
  "Treatments",
  "Brows",
  "Scalp Care",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--noir-2)",
        padding: "1.4rem 0",
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ width: "max-content", animation: "marquee-scroll 38s linear infinite" }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center" style={{ flexShrink: 0 }}>
            <span
              className="display display-it"
              style={{ fontSize: "1.8rem", color: "var(--pearl)", padding: "0 1.6rem" }}
            >
              {item}
            </span>
            <span style={{ color: "var(--champagne)", fontSize: "0.7rem" }}>&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
