import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { getAccountLinks } from "@/components/navigation/accountLinks";
import { CategoryLinks } from "@/components/navigation/CategoryLinks";
import { CurrencySelect } from "@/components/navigation/CurrencySelect";
import { LanguageToggle } from "@/components/navigation/LanguageToggle";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { Sheet } from "@/components/ui/sheet";
import { placeholderCartCount } from "@/constants/site";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";

/**
 * Drawer navigation for small screens (Step 15).
 *
 * Renders the same `categoryNavigation` definitions as the desktop header via
 * CategoryLinks, and the same account links as the desktop user menu — nothing
 * about the menu is redeclared here (§3.5).
 */
export function MobileNavigation() {
  const { t } = useLocale();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const sectionHeading =
    "mb-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]";
  const rowLink =
    "block rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-[var(--muted)]";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.nav.openMenu}
        aria-expanded={open}
        className="inline-flex size-10 items-center justify-center rounded-md text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] lg:hidden"
      >
        <Menu className="size-[18px]" aria-hidden="true" />
      </button>

      <Sheet
        open={open}
        onClose={close}
        title={t.nav.menu}
        closeLabel={t.nav.closeMenu}
      >
        <nav aria-label={t.nav.mobile} className="flex flex-col gap-7">
          <section>
            <h2 className={sectionHeading}>{t.nav.categories}</h2>
            <CategoryLinks variant="stacked" onNavigate={close} />
          </section>

          <section>
            <h2 className={sectionHeading}>{t.nav.menu}</h2>
            <ul className="flex flex-col gap-1">
              <li>
                <Link to="/shop" onClick={close} className={rowLink}>
                  {t.nav.search}
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={close} className={rowLink}>
                  {`${t.nav.cart} (${placeholderCartCount})`}
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className={sectionHeading}>{t.nav.account}</h2>
            {isAuthenticated ? (
              <ul className="flex flex-col gap-1">
                {getAccountLinks(t, isAdmin).map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} onClick={close} className={rowLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      void logout();
                    }}
                    className={`flex w-full items-center gap-2 text-start ${rowLink}`}
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                    {t.auth.logout}
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col gap-1">
                <li>
                  <Link to="/login" onClick={close} className={rowLink}>
                    {t.auth.login}
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={close} className={rowLink}>
                    {t.auth.register}
                  </Link>
                </li>
              </ul>
            )}
          </section>

          <section className="border-t border-[var(--border)] pt-5">
            <div className="flex items-center gap-1">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <div className="mt-4">
              <label
                htmlFor="mobile-currency"
                className={`${sectionHeading} block`}
              >
                {t.footer.currency}
              </label>
              <CurrencySelect id="mobile-currency" />
            </div>
          </section>
        </nav>
      </Sheet>
    </>
  );
}
