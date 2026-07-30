/**
 * Online booking — data layer.
 * Composed from factory-blueprints/addons/booking-widget. Spine unchanged:
 *   service -> date -> time -> details -> confirm
 *
 * WHY THIS EXISTS: booking at Kador is currently "call to book." That loses every
 * request made after close, and holds no chair against a no-show.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * NOT CONFIGURED YET — deposits and service durations.
 * src/lib/site.ts carries no prices and no durations for any service, and this
 * file will not invent them for a real salon. While DEPOSIT_ENABLED is false the
 * flow books a chair without taking money, and the UI says so plainly.
 *
 * TO TURN ON DEPOSITS: set DEPOSIT_ENABLED = true and fill DEPOSIT_AMOUNT with
 * the figure the owner agrees to. That is the whole change.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { SERVICES } from "./site";

export const DEPOSIT_ENABLED = false;
export const DEPOSIT_AMOUNT = 0;

/** Salon hours used to generate the slot grid. Adjust to the owner's real hours. */
export const OPEN_HOUR = 9;
export const CLOSE_HOUR = 19;
export const SLOT_MINUTES = 30;

export type BookableService = {
  id: string;
  /** e.g. "Color & Tone" */
  group: string;
  /** e.g. "Gloss & toner" */
  name: string;
};

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** The `detail` entries are the things a client actually books. */
export const BOOKABLE: BookableService[] = SERVICES.flatMap((s) =>
  s.detail.map((d) => ({ id: slug(`${s.key}-${d}`), group: s.title, name: d }))
);

export const SERVICE_GROUPS = SERVICES.map((s) => s.title);

/** Next `days` calendar days, skipping none — the salon confirms availability. */
export function upcomingDays(days = 14) {
  const out: { key: string; dow: string; day: string; month: string }[] = [];
  const d = new Date();
  for (let i = 0; i < days; i++) {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    out.push({
      key: x.toISOString().slice(0, 10),
      dow: x.toLocaleDateString("en-US", { weekday: "short" }),
      day: String(x.getDate()),
      month: x.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return out;
}

/** Half-hour slots across opening hours. */
export function slotsFor(dateKey: string): string[] {
  const out: string[] = [];
  const now = new Date();
  const isToday = dateKey === now.toISOString().slice(0, 10);
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      if (isToday && (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes()))) continue;
      const t = new Date();
      t.setHours(h, m, 0, 0);
      out.push(t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    }
  }
  return out;
}

export function prettyDate(dateKey: string) {
  const d = new Date(dateKey + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
