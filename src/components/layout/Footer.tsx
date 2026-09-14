import { Link } from "react-router-dom";
import { CategoryLinks } from "@/components/navigation/CategoryLinks";
import { CurrencySelect } from "@/components/navigation/CurrencySelect";
import { LanguageSelect } from "@/components/navigation/LanguageSelect";
import { policyNavigation, quickNavigation } from "@/constants/navigation";
import { socialLinks } from "@/constants/site";
import { useLocale } from "@/hooks/useLocale";

/**
 * Site footer (Step 16). Quick links, the shared category definitions, social
 * placeholders, policy links and the language/currency selectors.
 *
 * Laid out with logical properties only, so the column order follows the
 * writing direction without RTL-specific rules.
 */
export function Footer() {
  const { t } = useLocale();
  const linkClasses =
    "text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]";
  const headingClasses =
    "mb-4 text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground)]";

  return (
    <footer
      aria-label={t.nav.footer}
      className="mt-auto border-t border-[var(--border)] bg-[var(--muted)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-base font-semibold tracking-tight">
              {t.app.name}
            </p>
            <p className="mt-3 max-w-sm text-sm text-[var(--muted-foreground)]">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={t.footer.quickLinks}>
            <h2 className={headingClasses}>{t.footer.quickLinks}</h2>
            <ul className="flex flex-col gap-2.5">
              {quickNavigation.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClasses}>
                    {t.nav[item.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.categories}>
            <h2 className={headingClasses}>{t.footer.categories}</h2>
            <CategoryLinks variant="stacked" className="gap-2.5" />
          </nav>

          <nav aria-label={t.footer.policies}>
            <h2 className={headingClasses}>{t.footer.policies}</h2>
            <ul className="flex flex-col gap-2.5">
              {policyNavigation.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClasses}>
                    {t.footer[item.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 grid gap-8 border-t border-[var(--border)] pt-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className={headingClasses}>{t.footer.follow}</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className={linkClasses}
                    rel="noreferrer noopener"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label
              htmlFor="footer-language"
              className={`${headingClasses} block`}
            >
              {t.footer.language}
            </label>
            <LanguageSelect id="footer-language" />
          </div>

          <div>
            <label
              htmlFor="footer-currency"
              className={`${headingClasses} block`}
            >
              {t.footer.currency}
            </label>
            <CurrencySelect id="footer-currency" />
          </div>
        </div>

        <p className="mt-12 text-xs text-[var(--muted-foreground)]">
          {`© ${new Date().getFullYear()} ${t.app.name}. ${t.footer.rights}`}
        </p>
      </div>
    </footer>
  );
}
