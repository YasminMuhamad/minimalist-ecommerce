import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";

export function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  const { t } = useLocale();
  const location = useLocation();
  if (loading) return <LoadingState label={t.auth.checkingSession} />;
  if (!isAuthenticated)
    return <Navigate replace state={{ from: location }} to="/login" />;
  return <Outlet />;
}

function LoadingState({ label }: { label: string }) {
  return (
    <main className="flex min-h-[50vh] items-center justify-center px-6">
      <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
    </main>
  );
}
