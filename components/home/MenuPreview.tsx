import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { MENU_ITEMS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function MenuPreview() {
  const featured = MENU_ITEMS.filter((item) => item.featured).concat(
    MENU_ITEMS.filter((item) => !item.featured),
  ).slice(0, 3);

  return (
    <section className="section bg-[var(--card-bg)]">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Aesthetic & Taste</span>
          <h2 className="display-2">Signatures From The Kitchen</h2>
          <p className="lead mx-auto mt-4">
            A glimpse of the seasonal plates our chefs are most proud of.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <Link
                href="/menu"
                className="group block overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-color)] transition-all duration-[var(--dur-base)] hover:-translate-y-1 hover:border-[rgba(212,175,55,0.4)] hover:shadow-[var(--shadow-md)]"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition-transform duration-[var(--dur-slow)] group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-[var(--fs-lg)]">{item.name}</h3>
                    <span className="font-semibold text-[var(--accent)]">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[var(--fs-sm)] text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="mt-12 text-center">
          <Button href="/menu" variant="outline" size="lg">
            View Full Menu
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
