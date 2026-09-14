import { useEffect, useState, type ReactNode } from "react";
import { getResource, localeDirections } from "@/i18n";
import type { Locale } from "@/types";

import { LocaleContext } from "./locale-context";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem("locale");
    return stored === "ar" || stored === "en" ? stored : "en";
  });

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem("locale", nextLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDirections[locale];
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        direction: localeDirections[locale],
        setLocale,
        t: getResource(locale),
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
