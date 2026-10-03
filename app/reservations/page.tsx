import type { Metadata } from "next";

import ReservationForm from "@/components/reservations/ReservationForm";
import Reveal from "@/components/ui/Reveal";
import { HOURS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Reservations",
  description: `Reserve your table at ${SITE.name}. Bookings open 90 days in advance.`,
  alternates: { canonical: "/reservations" },
};

export default function ReservationsPage() {
  return (
    <section className="section">
      <div className="container grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">Reservations</span>
          <h1 className="display-1">Reserve Your Table</h1>
          <p className="lead mt-6">
            We hold a small number of tables for walk-ins each evening, but a
            reservation is the surest way to spend the night with us.
          </p>

          <dl className="mt-10 space-y-5 border-l border-[var(--border-color)] pl-6">
            {HOURS.map((h) => (
              <div key={h.day}>
                <dt className="font-serif text-[var(--fs-lg)]">{h.day}</dt>
                <dd
                  className={
                    h.closed
                      ? "text-[var(--fs-sm)] text-[var(--text-dim)]"
                      : "text-[var(--fs-sm)] text-[var(--text-muted)]"
                  }
                >
                  {h.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 space-y-2 text-[var(--fs-sm)] text-[var(--text-muted)]">
            <p>
              For parties of seven or more, please call{" "}
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="text-[var(--accent)] hover:underline"
              >
                {SITE.phone}
              </a>
              .
            </p>
            <p>
              Or email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-[var(--accent)] hover:underline"
              >
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <ReservationForm />
        </Reveal>
      </div>
    </section>
  );
}
