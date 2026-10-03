"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MenuCard from "./MenuCard";
import MenuFilters from "./MenuFilters";
import { MENU_ITEMS, type MenuCategory } from "@/lib/constants";

export default function MenuGrid() {
  const [active, setActive] = useState<MenuCategory | "all">("all");

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: MENU_ITEMS.length };
    for (const item of MENU_ITEMS) {
      base[item.category] = (base[item.category] ?? 0) + 1;
    }
    return base;
  }, []);

  const filtered = useMemo(() => {
    if (active === "all") return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === active);
  }, [active]);

  return (
    <div>
      <MenuFilters active={active} onChange={setActive} counts={counts} />

      <div className="mt-12">
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-[var(--text-muted)]">
            No dishes in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
