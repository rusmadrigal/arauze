import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function PageBreadcrumbs({
  items,
  ariaLabel = "Percorso di navigazione",
}: {
  items: BreadcrumbItem[];
  ariaLabel?: string;
}) {
  if (!items.length) return null;

  return (
    <nav aria-label={ariaLabel} className="mb-4">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-[#2552AD] hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-medium text-slate-800" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden className="text-slate-300">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

