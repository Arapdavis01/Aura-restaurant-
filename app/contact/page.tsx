import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebookF,
  faTripadvisor,
} from "@fortawesome/free-brands-svg-icons";

import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { HOURS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Find ${SITE.name} — address, phone, email, hours, and directions.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(
    `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`,
  );

  return (
    <section className="section">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Get In Touch</span>
          <h1 className="display-1">Contact & Location</h1>
          <p className="lead mx-auto mt-6">
            We are in the heart of the city, a short walk from the park. Valet
            available from 5:00 PM.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-8">
              <InfoRow icon={faLocationDot} label="Address">
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
              </InfoRow>

              <InfoRow icon={faPhone} label="Phone">
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {SITE.phone}
                </a>
              </InfoRow>

              <InfoRow icon={faEnvelope} label="Email">
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all transition-colors hover:text-[var(--accent)]"
                >
                  {SITE.email}
                </a>
              </InfoRow>

              <InfoRow icon={faClock} label="Hours">
                <ul className="space-y-1">
                  {HOURS.map((h) => (
                    <li key={h.day}>
                      <span className="text-[var(--text-main)]">{h.day}:</span>{" "}
                      <span className={h.closed ? "text-[var(--text-dim)]" : ""}>
                        {h.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </InfoRow>

              <div className="flex gap-3 pt-4">
                <SocialIcon href={SITE.social.instagram} label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </SocialIcon>
                <SocialIcon href={SITE.social.facebook} label="Facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </SocialIcon>
                <SocialIcon href={SITE.social.tripadvisor} label="Tripadvisor">
                  <FontAwesomeIcon icon={faTripadvisor} />
                </SocialIcon>
              </div>

              <div className="pt-4">
                <Button
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  variant="outline"
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-color)]">
              <iframe
                title="AURA location map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-[480px] w-full grayscale contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: never;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
        <FontAwesomeIcon icon={icon} />
      </span>
      <div>
        <p className="text-[var(--fs-xs)] uppercase tracking-widest text-[var(--text-dim)]">
          {label}
        </p>
        <div className="mt-1 text-[var(--text-muted)]">{children}</div>
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] transition-all duration-[var(--dur-base)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
    >
      {children}
    </a>
  );
}
