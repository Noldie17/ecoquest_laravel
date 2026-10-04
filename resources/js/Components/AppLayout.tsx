import { lazy, Suspense, type ReactNode } from "react";

const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("./Footer"));
const PlayerStats = lazy(() => import("./PlayerStats"));

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0e0f1a]">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {children}
      <Suspense fallback={null}>
        <Footer />
        <PlayerStats />
      </Suspense>
    </div>
  );
}
