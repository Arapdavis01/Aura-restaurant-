import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import MenuPreview from "@/components/home/MenuPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import ReservationCta from "@/components/home/ReservationCta";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <MenuPreview />
      <GalleryPreview />
      <ReservationCta />
    </>
  );
}
