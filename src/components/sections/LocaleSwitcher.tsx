"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const labels: Record<string, string> = { en: "EN", es: "ES" };

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "es" : "en";

  return (
    <Link
      href={pathname}
      locale={other}
      className="text-sm font-medium text-muted transition-colors hover:text-ink"
    >
      {labels[other]}
    </Link>
  );
}
