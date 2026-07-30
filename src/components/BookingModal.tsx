"use client";

/**
 * Kador — online booking.
 *
 * SPINE (identical across every build): service -> date -> time -> details -> confirm
 *
 * SKIN (unique to Kador, deliberately NOT MO's side drawer):
 *   - a centred modal ringed with the salon's own vanity bulbs, so booking a
 *     chair happens by stepping up to the mirror
 *   - noir / pearl / champagne, their palette
 *
 * Static export: no payment is taken. Deposits are off until the owner sets a figure.
 */

import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import { SITE } from "../lib/site";
import {
  BOOKABLE, SERVICE_GROUPS, upcomingDays, slotsFor, prettyDate,
  DEPOSIT_ENABLED, DEPOSIT_AMOUNT, type BookableService,
} from "../lib/booking";


/**
 * US phone formatting + validation, shared behaviour across every build.
 * Progressively formats to (xxx) xxx-xxxx as the customer types, hard-caps at
 * 10 digits so nothing longer can be entered, and exposes a completeness check
 * the submit gate uses. Non-digits are dropped rather than rejected, so paste
 * of "973-555-0123" or "+1 973 555 0123" still lands correctly.
 */
export function formatPhone(input: string): string {
  const d = input.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
export const isPhoneComplete = (v: string) => v.replace(/\D/g, "").length === 10;

type Step = "service" | "when" | "details" | "done";

const H_BULBS = 9;
const V_BULBS = 6;

function Bulb({ i }: { i: number }) {
  return (
    <motion.span
      className="block rounded-full shrink-0"
      style={{ width: 9, height: 9, background: "var(--bulb)" }}
      initial={{ opacity: 0.12, boxShadow: "0 0 0px 0px var(--bulb-glow)" }}
      animate={{
        opacity: [0.12, 1, 0.9],
        boxShadow: ["0 0 0px 0px var(--bulb-glow)", "0 0 14px 4px var(--bulb-glow)", "0 0 9px 2px var(--bulb-glow)"],
      }}
      transition={{ duration: 0.45, delay: 0.15 + i * 0.035, ease: "easeOut" }}
    />
  );
}

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("service");
  const [group, setGroup] = useState<string>(SERVICE_GROUPS[0]);
  const [service, setService] = useState<BookableService | null>(null);
  const [dateKey, setDateKey] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const days = useMemo(() => upcomingDays(14), []);
  const slots = useMemo(() => (dateKey ? slotsFor(dateKey) : []), [dateKey]);

  useEffect(() => {
    const onOpen = () => { setOpen(true); };
    window.addEventListener("kador:book", onOpen as EventListener);
    return () => window.removeEventListener("kador:book", onOpen as EventListener);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function reset() {
    setStep("service"); setService(null); setDateKey(""); setTime("");
    setName(""); setPhone("");
  }

  const canConfirm = name.trim() && isPhoneComplete(phone);

  return (
    <>
      {/* scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className="fixed inset-0 z-[80] transition-opacity duration-300"
        style={{
          background: "rgba(10,8,6,0.78)", backdropFilter: "blur(6px)",
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* the mirror */}
      <div
        role="dialog" aria-modal="true" aria-label="Book your chair"
        className="fixed z-[90] inset-0 grid place-items-center p-4 pointer-events-none"
        style={{ opacity: open ? 1 : 0, transition: "opacity .3s ease" }}
      >
        <div
          className="relative w-full max-w-[520px] max-h-[88vh] flex flex-col transition-transform duration-400"
          style={{
            background: "var(--noir)",
            border: "1px solid var(--border-strong)",
            borderRadius: 6,
            pointerEvents: open ? "auto" : "none",
            transform: open ? "scale(1)" : "scale(0.96)",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 40px 120px -30px rgba(0,0,0,0.9)",
          }}
        >
          {/* warm wash */}
          <div className="absolute -inset-8 pointer-events-none" aria-hidden
            style={{ background: "radial-gradient(58% 50% at 50% 30%, var(--bulb-glow) 0%, transparent 72%)", filter: "blur(10px)" }} />

          {/* bulb ring */}
          {open && (
            <>
              <div className="absolute left-5 right-5 -top-[4.5px] flex justify-between pointer-events-none" aria-hidden>
                {Array.from({ length: H_BULBS }, (_, i) => <Bulb key={`t${i}`} i={i} />)}
              </div>
              <div className="absolute left-5 right-5 -bottom-[4.5px] flex justify-between pointer-events-none" aria-hidden>
                {Array.from({ length: H_BULBS }, (_, i) => <Bulb key={`b${i}`} i={H_BULBS + V_BULBS + i} />)}
              </div>
              <div className="absolute top-5 bottom-5 -left-[4.5px] flex flex-col justify-between pointer-events-none" aria-hidden>
                {Array.from({ length: V_BULBS }, (_, i) => <Bulb key={`l${i}`} i={H_BULBS + i} />)}
              </div>
              <div className="absolute top-5 bottom-5 -right-[4.5px] flex flex-col justify-between pointer-events-none" aria-hidden>
                {Array.from({ length: V_BULBS }, (_, i) => <Bulb key={`r${i}`} i={H_BULBS + i} />)}
              </div>
            </>
          )}

          {/* header */}
          <header className="relative shrink-0 px-7 pt-7 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--champagne)" }}>
                  {step === "done" ? "Your chair is held" : "Book your chair"}
                </p>
                <h2 className="mt-2 text-[26px] leading-tight" style={{ fontFamily: "var(--font-display)", color: "var(--pearl)" }}>
                  {step === "service" && "What are we doing?"}
                  {step === "when" && "When suits you?"}
                  {step === "details" && "Who's sitting?"}
                  {step === "done" && `See you, ${name.split(" ")[0]}.`}
                </h2>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close booking"
                className="grid place-items-center w-9 h-9 rounded-full shrink-0"
                style={{ border: "1px solid var(--border-strong)", color: "var(--pearl-dim)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </header>

          {/* body */}
          <div className="relative grow overflow-y-auto px-7 py-6">
            {step === "service" && (
              <>
                <div className="flex flex-wrap gap-2 mb-5">
                  {SERVICE_GROUPS.map((g) => (
                    <button key={g} onClick={() => setGroup(g)}
                      className="rounded-full px-4 py-2 text-[12px] tracking-wide transition-all"
                      style={{
                        background: group === g ? "var(--champagne)" : "transparent",
                        color: group === g ? "var(--noir)" : "var(--pearl-dim)",
                        border: `1px solid ${group === g ? "var(--champagne)" : "var(--border-strong)"}`,
                      }}>{g}</button>
                  ))}
                </div>
                <ul className="flex flex-col gap-2">
                  {BOOKABLE.filter((b) => b.group === group).map((b) => (
                    <li key={b.id}>
                      <button
                        onClick={() => { setService(b); setStep("when"); }}
                        className="w-full text-left px-5 py-4 rounded transition-colors flex items-center justify-between gap-4 group"
                        style={{ border: "1px solid var(--border)", color: "var(--pearl)" }}>
                        <span className="text-[15px]">{b.name}</span>
                        <span style={{ color: "var(--champagne)" }}>→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {step === "when" && (
              <>
                <p className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: "var(--champagne)" }}>Choose a day</p>
                <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                  {days.map((d) => (
                    <button key={d.key} onClick={() => { setDateKey(d.key); setTime(""); }}
                      className="shrink-0 w-[62px] py-3 rounded text-center transition-all"
                      style={{
                        background: dateKey === d.key ? "var(--champagne)" : "transparent",
                        color: dateKey === d.key ? "var(--noir)" : "var(--pearl-dim)",
                        border: `1px solid ${dateKey === d.key ? "var(--champagne)" : "var(--border)"}`,
                      }}>
                      <span className="block text-[10px] uppercase tracking-wider opacity-80">{d.dow}</span>
                      <span className="block text-[19px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>{d.day}</span>
                      <span className="block text-[9px] uppercase tracking-wider opacity-70">{d.month}</span>
                    </button>
                  ))}
                </div>

                {dateKey && (
                  <>
                    <p className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: "var(--champagne)" }}>Choose a time</p>
                    {slots.length === 0 ? (
                      <p className="text-[14px]" style={{ color: "var(--pearl-faint)" }}>No times left today. Try tomorrow.</p>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {slots.map((s) => (
                          <button key={s} onClick={() => setTime(s)}
                            className="py-2.5 rounded text-[13px] tabular-nums transition-all"
                            style={{
                              background: time === s ? "var(--champagne)" : "transparent",
                              color: time === s ? "var(--noir)" : "var(--pearl-dim)",
                              border: `1px solid ${time === s ? "var(--champagne)" : "var(--border)"}`,
                            }}>{s}</button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {step === "details" && (
              <div className="flex flex-col gap-5">
                <div className="px-5 py-4 rounded" style={{ border: "1px solid var(--border)" }}>
                  <p className="text-[15px]" style={{ color: "var(--pearl)" }}>{service?.name}</p>
                  <p className="text-[13px] mt-1" style={{ color: "var(--champagne)" }}>
                    {prettyDate(dateKey)} · {time}
                  </p>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--champagne)" }}>Your name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last"
                    className="px-4 py-3 rounded text-[15px] bg-transparent"
                    style={{ border: "1px solid var(--border-strong)", color: "var(--pearl)" }} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--champagne)" }}>Phone</span>
                  <input value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} inputMode="tel" maxLength={14} placeholder="(862) 000-0000"
                    className="px-4 py-3 rounded text-[15px] bg-transparent"
                    style={{ border: "1px solid var(--border-strong)", color: "var(--pearl)" }} />
                </label>
                <p className="text-[12px] leading-relaxed" style={{ color: "var(--pearl-faint)" }}>
                  {DEPOSIT_ENABLED
                    ? `A $${DEPOSIT_AMOUNT} deposit holds the chair and comes off your service.`
                    : "No deposit taken. We'll text to confirm your chair."}
                </p>
              </div>
            )}

            {step === "done" && (
              <div className="text-center py-2">
                <div className="mx-auto w-12 h-12 rounded-full grid place-items-center mb-5"
                  style={{ background: "var(--champagne)", color: "var(--noir)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <p className="text-[16px]" style={{ color: "var(--pearl)" }}>{service?.name}</p>
                <p className="text-[14px] mt-1.5" style={{ color: "var(--champagne)" }}>{prettyDate(dateKey)} · {time}</p>
                <p className="text-[13px] mt-5 leading-relaxed" style={{ color: "var(--pearl-faint)" }}>
                  We&rsquo;ll text {phone} to confirm. Questions, call{" "}
                  <a href={SITE.phoneHref} style={{ color: "var(--pearl-dim)" }}>{SITE.phoneDisplay}</a>.
                </p>
                <p className="text-[11px] mt-6 inline-block px-3 py-2 rounded" style={{ border: "1px solid var(--border)", color: "var(--pearl-faint)" }}>
                  Demo booking — nothing was charged.
                </p>
                <button onClick={reset} className="block mx-auto mt-5 text-[12px] underline" style={{ color: "var(--champagne)" }}>
                  Book another
                </button>
              </div>
            )}
          </div>

          {/* footer */}
          {step !== "done" && (
            <footer className="relative shrink-0 px-7 py-5 flex gap-3" style={{ borderTop: "1px solid var(--border)" }}>
              {step !== "service" && (
                <button onClick={() => setStep(step === "details" ? "when" : "service")}
                  className="px-5 py-3 rounded text-[12px] uppercase tracking-[0.2em]"
                  style={{ border: "1px solid var(--border-strong)", color: "var(--pearl-dim)" }}>Back</button>
              )}
              {step === "when" && (
                <button disabled={!dateKey || !time} onClick={() => setStep("details")}
                  className="grow py-3 rounded text-[12px] uppercase tracking-[0.2em] transition-opacity"
                  style={{ background: "var(--champagne)", color: "var(--noir)", opacity: !dateKey || !time ? 0.35 : 1 }}>
                  Continue
                </button>
              )}
              {step === "details" && (
                <button disabled={!canConfirm} onClick={() => setStep("done")}
                  className="grow py-3 rounded text-[12px] uppercase tracking-[0.2em] transition-opacity"
                  style={{ background: "var(--champagne)", color: "var(--noir)", opacity: !canConfirm ? 0.35 : 1 }}>
                  Hold my chair
                </button>
              )}
              {step === "service" && (
                <p className="text-[12px] self-center" style={{ color: "var(--pearl-faint)" }}>
                  Pick a service to continue
                </p>
              )}
            </footer>
          )}
        </div>
      </div>
    </>
  );
}
