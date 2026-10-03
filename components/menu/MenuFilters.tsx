"use client";

import { cn } from "@/lib/utils";
import { MENU_CATEGORIES, type MenuCategory } from "@/lib/constants";

interface Props {
  active: MenuCategory | "all";
  onChange: (value: MenuCategory | "all") => void;
  counts?: Record<string, number>;
}

export default function MenuFilters({ active, onChange, counts }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Filter menu by category"
      className="flex flex-wrap justify-center gap-3"
    >
      {MENU_CATEGORIES.map((cat) => {
        const isActive = active === cat.value;
        const count = counts?.[cat.value];
        return (
          <button
            key={cat.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(cat.value)}
            className={cn(
              "rounded-[var(--radius-pill)] border px-5 py-2 text-[var(--fs-sm)] font-medium transition-all duration-[var(--dur-base)]",
              isActive
                ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                : "border-[var(--border-color)] bg-transparent text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
            )}
          >
            {cat.label}
            {typeof count === "number" && (
              <span
                className={cn(
                  "ml-2 text-[var(--fs-xs)]",
                  isActive ? "text-black/60" : "text-[var(--text-dim)]",
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
