import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";

export function AdminRoute() {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  const { t } = useLocale();
  if (loading)
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-6">
        <p className="text-sm text-[var(--muted-foreground)]">
          {t.auth.checkingSession}
        </p>
      </main>
    );
  if (!isAuthenticated) return <Navigate replace to="/login" />;
  if (!isAdmin) return <Navigate replace to="/account" />;
  return <Outlet />;
}
