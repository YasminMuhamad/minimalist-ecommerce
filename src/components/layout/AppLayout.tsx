import { Outlet } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppLayout() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-[var(--background)] focus:p-3"
        href="#main-content"
      >
        {t.nav.skipToContent}
      </a>
      <AnnouncementBar />
      <Header />
      <main className="flex-1" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
