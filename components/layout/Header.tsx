"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import Button from "@/components/ui/Button";
import MobileNav from "./MobileNav";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] border-b border-[var(--border-color)] backdrop-blur-md transition-all duration-[var(--dur-base)] ease-[var(--ease-smooth)]",
          scrolled
            ? "bg-[rgba(12,12,12,0.95)] py-2"
            : "bg-[rgba(12,12,12,0.75)] py-4",
        )}
      >
        <div className="container flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-[1.8rem] font-bold tracking-[0.12em]"
            aria-label={`${SITE.name} home`}
          >
            {SITE.name}
            <span className="text-[var(--accent)]">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-[var(--fs-sm)] transition-colors duration-[var(--dur-base)]",
                      isActive(link.href)
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] hover:text-[var(--accent)]",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px bg-[var(--accent)] transition-all duration-[var(--dur-base)]",
                        isActive(link.href) ? "w-full" : "w-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Button href="/reservations" size="sm" className="hidden sm:inline-flex">
              Book a Table
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-[var(--fs-xl)] text-[var(--text-main)] transition-colors hover:text-[var(--accent)] lg:hidden"
            >
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
