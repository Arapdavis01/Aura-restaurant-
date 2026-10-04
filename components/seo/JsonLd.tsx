import { HOURS, SITE, SITE_URL } from "@/lib/constants";

export default function JsonLd() {
  const dayMap: Record<string, string[]> = {
    Monday: ["Monday"],
    "Tuesday – Thursday": ["Tuesday", "Wednesday", "Thursday"],
    "Friday – Sunday": ["Friday", "Saturday", "Sunday"],
  };

  const to24 = (t: string) => {
    const [time, period] = t.split(" ");
    let [hh, mm] = time.split(":").map(Number);
    if (period === "PM" && hh !== 12) hh += 12;
    if (period === "AM" && hh === 12) hh = 0;
    return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
  };

  const openingHours = HOURS.filter((h) => !h.closed).flatMap((h) => {
    const [open, close] = h.value.split(" – ");
    return (dayMap[h.day] ?? []).map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day}`,
      opens: to24(open),
      closes: to24(close),
    }));
  });

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.name,
    description: SITE.description,
    url: SITE_URL,
    telephone: SITE.phone,
    email: SITE.email,
    servesCuisine: ["Contemporary", "Fine Dining"],
    priceRange: "KES 1500-6500",
    image: `${SITE_URL}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    sameAs: [
      SITE.social.instagram,
      SITE.social.facebook,
      SITE.social.tripadvisor,
    ],
    openingHoursSpecification: openingHours,
    acceptsReservations: `${SITE_URL}/reservations`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
