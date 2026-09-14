import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

/**
 * AR ↔ EN switch. Persistence and `dir`/`lang` updates are handled by
 * LocaleProvider, so this only flips the active locale (Step 14).
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const nextLocale = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      aria-label={`${t.language.toggle} — ${nextLocale === "ar" ? t.language.arabic : t.language.english}`}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-3",
        "text-xs font-semibold uppercase tracking-widest text-[var(--foreground)]",
        "transition-colors hover:bg-[var(--muted)]",
        className,
      )}
    >
      {nextLocale === "ar" ? "ع" : "EN"}
    </button>
  );
}
