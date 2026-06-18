"use client";

import { SITE, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer style={{ background: "var(--noir-2)", borderTop: "1px solid var(--border)" }}>
      <div className="shell" style={{ paddingTop: "4.5rem", paddingBottom: "2.5rem" }}>
        <div className="footer-grid">
          <div>
            <div className="display" style={{ fontSize: "1.8rem", letterSpacing: "0.14em" }}>
              KADOR
            </div>
            <p style={{ marginTop: "1rem", color: "var(--pearl-dim)", maxWidth: 320, lineHeight: 1.6, fontSize: "0.92rem" }}>
              A full-service beauty salon on Scotland Road. Sit down, face the
              light, leave luminous.
            </p>
            <div style={{ marginTop: "1.4rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--champagne)", fontSize: "0.85rem" }}>
              <span>&#9733;</span> {SITE.rating} &middot; {SITE.reviewCount}+ reviews
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--pearl-faint)", marginBottom: "1.1rem" }}>
              Explore
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} style={{ color: "var(--pearl-dim)", fontSize: "0.92rem" }} data-cursor>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--pearl-faint)", marginBottom: "1.1rem" }}>
              Visit
            </div>
            <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" style={{ color: "var(--pearl-dim)", fontSize: "0.92rem", lineHeight: 1.6, display: "block" }} data-cursor>
              {SITE.street}
              <br />
              {SITE.city}, {SITE.state} {SITE.zip}
            </a>
            <a href={SITE.phoneHref} style={{ color: "var(--pearl)", fontSize: "0.92rem", display: "block", marginTop: "0.9rem" }} data-cursor>
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="hairline" style={{ marginTop: "3rem", marginBottom: "1.6rem" }} />
        <div className="footer-bottom">
          <span style={{ color: "var(--pearl-faint)", fontSize: "0.8rem" }}>
            &copy; {new Date().getFullYear()} {SITE.name}. {SITE.city}, NJ.
          </span>
          <span style={{ color: "var(--pearl-faint)", fontSize: "0.8rem", letterSpacing: "0.04em" }}>
            Sit down. Leave luminous. &middot; <a href="https://bysemaj.com" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Built &middot; bysemaj.com</a>
          </span>
        </div>
      </div>

      <style jsx>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.6rem;
        }
        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        @media (min-width: 760px) {
          .footer-grid {
            grid-template-columns: 1.6fr 1fr 1fr;
            gap: 3rem;
          }
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}
