import type { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faWineGlass,
  faUtensils,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_FEATURES, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${SITE.name} — our philosophy, our kitchen, and the people behind every plate.`,
  alternates: { canonical: "/about" },
};

const iconMap = {
  seedling: faSeedling,
  "wine-glass": faWineGlass,
  utensils: faUtensils,
  star: faStar,
} as const;

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Our Story</span>
            <h1 className="display-1">
              A Table Built On Craft, Season, and Time
            </h1>
            <p className="lead mx-auto mt-6">
              Aura began as a conversation between friends who believed fine
              dining could feel both refined and warm. Ten years later, that
              conversation still shapes every evening we host.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <Reveal className="relative aspect-[21/9] w-full overflow-hidden rounded-[var(--radius-lg)]">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
              alt="AURA main dining room"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Philosophy</span>
            <h2 className="display-2">Sourcing, Technique, and Restraint</h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="space-y-5 text-[var(--text-muted)]">
              <p>
                We work with a small circle of growers, fishermen, and producers
                who share our obsession with seasonality. What arrives at the
                door each morning writes the menu for that night.
              </p>
              <p>
                In the kitchen, technique is a tool, not a display. Every plate
                is stripped to what matters: flavor, texture, temperature, and
                the memory it leaves behind.
              </p>
              <p>
                Our sommelier curates over three hundred labels, with a
                particular focus on small growers and low-intervention
                producers.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-[var(--card-bg)]">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What Sets Us Apart</span>
            <h2 className="display-2">Four Commitments</h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-color)] p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                    <FontAwesomeIcon
                      icon={iconMap[feature.icon as keyof typeof iconMap]}
                    />
                  </span>
                  <h3 className="mt-5 font-serif text-[var(--fs-lg)]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[var(--fs-sm)] text-[var(--text-muted)]">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container text-center">
          <Reveal>
            <h2 className="display-2">Come Dine With Us</h2>
            <p className="lead mx-auto mt-4">
              We would love to host you. Reserve a table and let us take care of
              the rest.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/reservations" size="lg">
                Reserve a Table
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
