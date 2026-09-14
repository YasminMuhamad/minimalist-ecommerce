import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

import { getAccountLinks } from "./accountLinks";

/**
 * Desktop account control. Guests get a direct link to sign in; authenticated
 * users get a menu whose admin entry appears only once the Firestore-resolved
 * role says `admin` (Step 14).
 */
export function UserMenu() {
  const { t } = useLocale();
  const { isAuthenticated, isAdmin, user, profile, logout, loading } =
    useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const triggerClasses = cn(
    "inline-flex size-10 items-center justify-center rounded-md",
    "text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]",
  );

  if (loading) {
    return (
      <span
        className={triggerClasses}
        aria-label={t.auth.checkingSession}
        role="status"
      >
        <User className="size-[18px] opacity-40" aria-hidden="true" />
      </span>
    );
  }

  if (!isAuthenticated) {
    return (
      <Link to="/login" aria-label={t.auth.login} className={triggerClasses}>
        <User className="size-[18px]" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.nav.account}
        className={triggerClasses}
      >
        <User className="size-[18px]" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t.nav.account}
          className={cn(
            "absolute end-0 top-full z-40 mt-2 w-60 overflow-hidden rounded-md",
            "border border-[var(--border)] bg-[var(--background)] shadow-lg",
          )}
        >
          <p className="border-b border-[var(--border)] px-4 py-3 text-start">
            <span className="block text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
              {t.auth.signedInAs}
            </span>
            <span className="mt-0.5 block truncate text-sm font-medium">
              {profile?.displayName || user?.email || t.auth.guest}
            </span>
          </p>

          <ul className="py-1">
            {getAccountLinks(t, isAdmin).map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-start text-sm transition-colors hover:bg-[var(--muted)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-[var(--border)] py-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                void logout();
              }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-start text-sm transition-colors hover:bg-[var(--muted)]"
            >
              <LogOut className="size-4" aria-hidden="true" />
              {t.auth.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
