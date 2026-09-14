import { CartButton } from "@/components/navigation/CartButton";
import { LanguageToggle } from "@/components/navigation/LanguageToggle";
import { SearchButton } from "@/components/navigation/SearchButton";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { UserMenu } from "@/components/navigation/UserMenu";
import { placeholderCartCount } from "@/constants/site";

/**
 * The header's interactive controls: search, language, theme, cart and account
 * (Step 14). Each control owns its own behaviour; this only arranges them.
 */
export function HeaderActions() {
  return (
    <div className="flex items-center gap-0.5">
      <SearchButton />
      <LanguageToggle />
      <ThemeToggle />
      <CartButton count={placeholderCartCount} />
      <UserMenu />
    </div>
  );
}
