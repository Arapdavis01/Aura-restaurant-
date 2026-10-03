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
import { ABOUT_FEATURES } from "@/lib/constants";

const iconMap = {
  seedling: faSeedling,
  "wine-glass": faWineGlass,
  utensils: faUtensils,
  star: faStar,
} as const;

export default function AboutPreview() {
  return (
    <section id="about-preview" className="section">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        {/* Images collage */}
        <Reveal className="relative h-[420px] lg:h-[520px]">
          <div className="absolute left-0 top-0 h-[75%] w-[65%] overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-lg)]">
            <Image
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
              alt="AURA dining room interior"
              fill
              sizes="(max-width: 1024px) 65vw, 420px"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[60%] w-[55%] overflow-hidden rounded-[var(--radius-md)] border-[6px] border-[var(--bg-color)] shadow-[var(--shadow-lg)]">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
              alt="Chef plating a dish"
              fill
              sizes="(max-width: 1024px) 55vw, 360px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <span className="eyebrow">About Aura</span>
            <h2 className="display-2">
              Crafting Unforgettable
              <br />
              Dining Moments
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="lead mt-6">
              Founded on the philosophy that dining should engage all the senses,
              Aura blends contemporary culinary techniques with timeless
              hospitality. Every dish tells a story of local heritage and global
              inspiration.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {ABOUT_FEATURES.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={((i + 2) % 4) as 0 | 1 | 2 | 3}>
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                    <FontAwesomeIcon icon={iconMap[feature.icon as keyof typeof iconMap]} />
                  </span>
                  <div>
                    <h4 className="font-serif text-[var(--fs-lg)]">
                      {feature.title}
                    </h4>
                    <p className="mt-1 text-[var(--fs-sm)] text-[var(--text-muted)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={2} className="mt-10">
            <Button href="/about" variant="outline">
              Discover Our Story
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
