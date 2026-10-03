"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import Button from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: Props) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[110] bg-[var(--overlay)] backdrop-blur-sm transition-opacity duration-[var(--dur-base)] lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-[120] flex w-[min(88vw,380px)] flex-col border-l border-[var(--border-color)] bg-[var(--bg-elevated)] transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-5">
          <span className="font-serif text-[1.5rem] font-bold tracking-[0.1em]">
            {SITE.name}
            <span className="text-[var(--accent)]">.</span>
          </span>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "block rounded-[var(--radius-md)] px-3 py-3 font-serif text-[var(--fs-2xl)] transition-colors",
                    isActive(link.href)
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-main)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[var(--border-color)] px-6 py-6">
          <Button href="/reservations" fullWidth>
            Book a Table
          </Button>
          <p className="mt-4 text-center text-[var(--fs-sm)] text-[var(--text-muted)]">
            {SITE.phone}
          </p>
        </div>
      </div>
    </>
  );
}
