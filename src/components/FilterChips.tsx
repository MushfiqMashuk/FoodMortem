import Link from "next/link";

interface FilterChipsProps {
  label: string;
  /** Search param name, e.g. "brand". */
  param: string;
  options: string[];
  selected: string[];
  pathname: string;
  /** All current search params, so toggling one filter keeps the others. */
  searchParams: Record<string, string[]>;
}

function hrefWith(pathname: string, params: Record<string, string[]>): string {
  const query = new URLSearchParams();
  for (const [key, values] of Object.entries(params)) {
    for (const value of values) query.append(key, value);
  }
  const qs = query.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

/**
 * Multi-select filter rendered as plain links: filtering happens in the
 * database on the server, works without JavaScript, and is shareable by URL.
 */
export function FilterChips({ label, param, options, selected, pathname, searchParams }: FilterChipsProps) {
  if (options.length === 0) return null;

  return (
    <nav className="filters" aria-label={label}>
      <span className="filters__label">{label}</span>
      <ul>
        {options.map((option) => {
          const active = selected.includes(option);
          const nextValues = active ? selected.filter((v) => v !== option) : [...selected, option];
          return (
            <li key={option}>
              <Link
                scroll={false}
                className={`chip${active ? " chip--active" : ""}`}
                aria-current={active ? "true" : undefined}
                href={hrefWith(pathname, { ...searchParams, [param]: nextValues })}
              >
                {option}
              </Link>
            </li>
          );
        })}
        {selected.length > 0 && (
          <li>
            <Link scroll={false} className="chip chip--clear" href={hrefWith(pathname, { ...searchParams, [param]: [] })}>
              Clear
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

/** Normalises a Next.js searchParams value into a list of strings. */
export function paramList(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}
