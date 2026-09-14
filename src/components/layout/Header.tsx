import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";

import { HeaderActions } from "./HeaderActions";
import { MainNavigation } from "./MainNavigation";
import { MobileNavigation } from "./MobileNavigation";

/**
 * Primary header (Step 12): logo, five-category navigation and action controls.
 * Minimal and spacious — a single hairline border, no shadows or gradients.
 */
export function Header() {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20">
        <MobileNavigation />

        <Link
          to="/"
          className="text-base font-semibold tracking-tight whitespace-nowrap lg:text-lg"
        >
          {t.app.name}
        </Link>

        <div className="flex flex-1 justify-center">
          <MainNavigation />
        </div>

        <HeaderActions />
      </div>
    </header>
  );
}
