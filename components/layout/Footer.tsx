import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { HOURS, NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-color)] bg-[#070707] pt-20 pb-8">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-serif text-[1.8rem] font-bold tracking-[0.12em]"
            >
              {SITE.name}
              <span className="text-[var(--accent)]">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-[var(--fs-sm)] text-[var(--text-muted)]">
              Redefining luxury dining through passion, flavor, and modern design.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={SITE.social.instagram} label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </SocialLink>
              <SocialLink href={SITE.social.facebook} label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </SocialLink>
              <SocialLink href={SITE.social.tripadvisor} label="Tripadvisor">
                <FontAwesomeIcon icon={faStar} />
              </SocialLink>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-[var(--fs-lg)]">Explore</h4>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--fs-sm)] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-[var(--fs-lg)]">Hours</h4>
            <ul className="flex flex-col gap-2 text-[var(--fs-sm)]">
              {HOURS.map((h) => (
                <li key={h.day} className="text-[var(--text-muted)]">
                  <span className="block text-[var(--text-main)]">{h.day}</span>
                  <span className={h.closed ? "text-[var(--text-dim)]" : ""}>
                    {h.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-[var(--fs-lg)]">Contact</h4>
            <ul className="flex flex-col gap-3 text-[var(--fs-sm)] text-[var(--text-muted)]">
              <li className="flex gap-3">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mt-1 text-[var(--accent)]"
                />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.region}{" "}
                  {SITE.address.postal}
                </span>
              </li>
              <li className="flex gap-3">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mt-1 text-[var(--accent)]"
                />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mt-1 text-[var(--accent)]"
                />
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all transition-colors hover:text-[var(--accent)]"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--border-color)] pt-6 text-center text-[var(--fs-xs)] text-[var(--text-dim)]">
          &copy; {year} {SITE.name} Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-main)] transition-all duration-[var(--dur-base)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
    >
      {children}
    </a>
  );
}
