import { NavLink } from "react-router-dom";
import { categoryNavigation } from "@/constants/navigation";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

/**
 * Renders the five approved categories from the shared definitions. Desktop
 * header, mobile drawer and footer all use this, so category labels and routes
 * cannot diverge between them (§3.5 / Risk 4).
 */
export function CategoryLinks({
  variant,
  onNavigate,
  className,
}: {
  variant: "inline" | "stacked";
  onNavigate?: () => void;
  className?: string;
}) {
  const { t } = useLocale();

  return (
    <ul
      className={cn(
        variant === "inline"
          ? "flex items-center gap-7"
          : "flex flex-col gap-1",
        className,
      )}
    >
      {categoryNavigation.map((item) => (
        <li key={item.id}>
          <NavLink
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "block rounded-md text-sm transition-colors",
                variant === "inline"
                  ? "py-1"
                  : "px-2 py-2.5 hover:bg-[var(--muted)]",
                isActive
                  ? "font-medium text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
              )
            }
          >
            {t.category[item.labelKey]}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
