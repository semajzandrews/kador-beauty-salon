"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: scrolled ? "blur(14px)" : "none",
        background: scrolled ? "rgba(20,16,12,0.72)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <nav className="shell flex items-center justify-between" style={{ height: 76 }}>
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          className="display"
          style={{ fontSize: "1.5rem", letterSpacing: "0.16em" }}
        >
          KADOR
        </a>

        <div className="hidden md:flex items-center" style={{ gap: "2.4rem" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              className="transition-colors"
              style={{
                fontSize: "0.82rem",
                letterSpacing: "0.06em",
                color: "var(--pearl-dim)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pearl)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pearl-dim)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center" style={{ gap: "1rem" }}>
          <a
            href={SITE.phoneHref}
            className="hidden sm:inline-flex items-center"
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              padding: "0.6rem 1.2rem",
              borderRadius: 999,
              color: "var(--noir)",
              background: "var(--champagne)",
              fontWeight: 600,
            }}
          >
            Book the chair
          </a>

          <button
            aria-label="Menu"
            className="md:hidden flex flex-col justify-center"
            style={{ width: 30, height: 30, gap: 6 }}
            onClick={() => setOpen((v) => !v)}
            data-cursor
          >
            <span style={{ height: 1.5, width: 24, background: "var(--pearl)", transform: open ? "translateY(4px) rotate(45deg)" : "none", transition: "transform 0.3s" }} />
            <span style={{ height: 1.5, width: 24, background: "var(--pearl)", transform: open ? "translateY(-3px) rotate(-45deg)" : "none", transition: "transform 0.3s" }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(20,16,12,0.96)", borderTop: "1px solid var(--border)" }}
          >
            <div className="shell flex flex-col" style={{ padding: "1.6rem 1.5rem 2.2rem", gap: "1.2rem" }}>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  className="display display-it"
                  style={{ fontSize: "1.9rem", color: "var(--pearl)" }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center"
                style={{
                  marginTop: "0.6rem",
                  padding: "0.85rem 1.2rem",
                  borderRadius: 999,
                  color: "var(--noir)",
                  background: "var(--champagne)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}
              >
                Call {SITE.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
