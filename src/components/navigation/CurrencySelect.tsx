import { useEffect, useState } from "react";
import { defaultCurrency, supportedCurrencies } from "@/constants/site";
import { useLocale } from "@/hooks/useLocale";
import type { Currency } from "@/types";

const STORAGE_KEY = "currency";

function isCurrency(value: string | null): value is Currency {
  return value !== null && supportedCurrencies.includes(value as Currency);
}

/**
 * Currency selector. Phase 2 establishes the UI/state boundary only — no rates,
 * no conversion, no price formatting (Step 16 / Risk 8).
 */
export function CurrencySelect({ id }: { id: string }) {
  const { t } = useLocale();
  const [currency, setCurrency] = useState<Currency>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isCurrency(stored) ? stored : defaultCurrency;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  return (
    <select
      id={id}
      value={currency}
      onChange={(event) => setCurrency(event.target.value as Currency)}
      className={
        "h-10 w-full rounded-md border border-[var(--border)] bg-transparent px-3 text-sm " +
        "text-[var(--foreground)] outline-none transition-colors focus-visible:border-[var(--ring)]"
      }
    >
      {supportedCurrencies.map((code) => (
        <option
          key={code}
          value={code}
          className="bg-[var(--background)] text-[var(--foreground)]"
        >
          {t.currency[code]}
        </option>
      ))}
    </select>
  );
}
