import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

import type { MenuItem } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

interface Props {
  item: MenuItem;
}

export default function MenuCard({ item }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--card-bg)] transition-all duration-[var(--dur-base)] hover:-translate-y-1 hover:border-[rgba(212,175,55,0.4)] hover:shadow-[var(--shadow-md)]">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className="object-cover transition-transform duration-[var(--dur-slow)] group-hover:scale-105"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[var(--radius-pill)] bg-black/70 px-3 py-1 text-[var(--fs-xs)] font-medium text-[var(--accent)] backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-[var(--fs-lg)]">{item.name}</h3>
          <span className="shrink-0 font-semibold text-[var(--accent)]">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="mt-3 flex-1 text-[var(--fs-sm)] text-[var(--text-muted)]">
          {item.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[var(--fs-xs)] uppercase tracking-wider text-[var(--text-dim)]">
          <FontAwesomeIcon icon={faLeaf} className="text-[var(--accent)]" />
          <span>{item.category}</span>
        </div>
      </div>
    </article>
  );
}
