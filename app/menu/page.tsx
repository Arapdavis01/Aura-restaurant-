import type { Metadata } from "next";

import MenuGrid from "@/components/menu/MenuGrid";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Menu",
  description: `Explore the seasonal menu at ${SITE.name} — starters, mains, desserts, and signature cocktails.`,
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Aesthetic & Taste</span>
          <h1 className="display-1">Our Seasonal Menu</h1>
          <p className="lead mx-auto mt-6">
            Explore our carefully curated dishes designed to awaken your palate.
            Every plate is prepared to order using ingredients sourced the same
            morning.
          </p>
        </Reveal>

        <div className="mt-16">
          <MenuGrid />
        </div>
      </div>
    </section>
  );
}
