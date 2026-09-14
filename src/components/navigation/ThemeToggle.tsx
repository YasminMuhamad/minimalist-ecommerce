import { Moon, Sun } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`${t.theme.toggle} — ${nextTheme === "dark" ? t.theme.dark : t.theme.light}`}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-md",
        "text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun className="size-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="size-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
