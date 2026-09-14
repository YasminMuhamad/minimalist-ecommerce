import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/types";

/** Footer language selector — same locale state as the header toggle. */
export function LanguageSelect({ id }: { id: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <select
      id={id}
      value={locale}
      onChange={(event) => setLocale(event.target.value as Locale)}
      className={
        "h-10 w-full rounded-md border border-[var(--border)] bg-transparent px-3 text-sm " +
        "text-[var(--foreground)] outline-none transition-colors focus-visible:border-[var(--ring)]"
      }
    >
      <option
        value="en"
        className="bg-[var(--background)] text-[var(--foreground)]"
      >
        {t.language.english}
      </option>
      <option
        value="ar"
        className="bg-[var(--background)] text-[var(--foreground)]"
      >
        {t.language.arabic}
      </option>
    </select>
  );
}
