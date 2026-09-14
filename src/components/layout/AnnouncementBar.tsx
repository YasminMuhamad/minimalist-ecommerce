import { Link } from "react-router-dom";
import { announcement } from "@/constants/site";
import { useLocale } from "@/hooks/useLocale";

export function AnnouncementBar() {
  const { t } = useLocale();
  return (
    <div className="border-b border-[var(--border)] bg-[var(--muted)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-center sm:px-6">
        <p className="text-xs tracking-wide text-[var(--muted-foreground)] sm:text-[13px]">
          {t.announcement[announcement.messageKey]}
        </p>
        <Link
          to={announcement.actionHref}
          className="text-xs font-medium underline underline-offset-4 transition-opacity hover:opacity-70 sm:text-[13px]"
        >
          {t.announcement[announcement.actionKey]}
        </Link>
      </div>
    </div>
  );
}
