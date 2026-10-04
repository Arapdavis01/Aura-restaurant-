import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { CURRENCY, LOCALE } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  value: number,
  currency: string = CURRENCY,
  locale: string = LOCALE,
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    // Fallback if the runtime does not support the locale/currency combo
    return `KSh ${value.toLocaleString("en-KE")}`;
  }
}

export function formatTime24to12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

export function todayISO(): string {
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60 * 1000);
  return local.toISOString().split("T")[0];
}

export function maxReservationDateISO(daysAhead = 90): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60 * 1000);
  return local.toISOString().split("T")[0];
}
