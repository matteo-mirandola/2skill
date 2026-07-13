import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-line bg-bg-soft/40 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        <p>{t("tagline")}</p>
      </div>
    </footer>
  );
}
