import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function GalleryPreview() {
  const picks = GALLERY_IMAGES.slice(0, 4);

  return (
    <section className="section">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Atmosphere</span>
          <h2 className="display-2">The Aura Experience</h2>
          <p className="lead mx-auto mt-4">
            Warm lighting, considered design, and a room built for lingering.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {picks.map((img, i) => (
            <Reveal key={img.src} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="object-cover transition-transform duration-[var(--dur-slow)] hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="mt-12 text-center">
          <Button href="/gallery" variant="outline" size="lg">
            Explore Gallery
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
