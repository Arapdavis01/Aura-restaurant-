import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { HOURS, SITE } from "@/lib/constants";

export default function ReservationCta() {
  return (
    <section className="section-sm bg-[var(--card-bg)]">
      <div className="container">
        <div className="grid items-center gap-10 rounded-[var(--radius-lg)] border border-[var(--border-color)] bg-[var(--bg-color)] p-10 lg:grid-cols-[2fr_1fr] lg:p-16">
          <Reveal>
            <span className="eyebrow">Reservations</span>
            <h2 className="display-2">Reserve Your Table</h2>
            <p className="lead mt-4">
              Secure your experience with us. Walk-ins welcome when available,
              but a reservation guarantees your evening.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/reservations" size="lg">
                Book Now
              </Button>
              <Button href={`tel:${SITE.phone.replace(/\s/g, "")}`} variant="outline" size="lg">
                Call {SITE.phone}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <ul className="flex flex-col gap-5 border-l border-[var(--border-color)] pl-8">
              {HOURS.map((h) => (
                <li key={h.day}>
                  <p className="font-serif text-[var(--fs-lg)]">{h.day}</p>
                  <p
                    className={
                      h.closed
                        ? "text-[var(--fs-sm)] text-[var(--text-dim)]"
                        : "text-[var(--fs-sm)] text-[var(--text-muted)]"
                    }
                  >
                    {h.value}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
