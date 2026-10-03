import type { Metadata } from "next";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import { GALLERY_IMAGES, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Step inside ${SITE.name} — the dining room, the bar, the kitchen, and the details that make an evening here.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Atmosphere</span>
          <h1 className="display-1">Inside Aura</h1>
          <p className="lead mx-auto mt-6">
            A room designed for lingering, a bar built for conversation, and a
            kitchen open enough to watch the craft happen.
          </p>
        </Reveal>

        <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-4 lg:auto-rows-[220px] lg:grid-cols-4">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal
              key={img.src}
              delay={(i % 4) as 0 | 1 | 2 | 3}
              className={cn(
                img.span === "tall" && "row-span-2",
                img.span === "wide" && "col-span-2",
              )}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[var(--dur-slow)] group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100" />
                <p className="pointer-events-none absolute bottom-4 left-4 right-4 translate-y-2 text-[var(--fs-sm)] text-white opacity-0 transition-all duration-[var(--dur-base)] group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
