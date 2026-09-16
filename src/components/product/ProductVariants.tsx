import { useLocale } from "@/hooks/useLocale";
import type { ProductOption } from "@/types";

export function ProductVariants({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ProductOption[];
  value?: string;
  onChange: (value: string) => void;
}) {
  const { locale } = useLocale();
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            aria-pressed={value === option.value}
            className={`min-w-12 border px-3 py-2 text-sm transition-colors ${value === option.value ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]" : "border-[var(--border)] hover:bg-[var(--muted)]"}`}
            key={option.id}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label[locale] || option.label.en || option.value}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
