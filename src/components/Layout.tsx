import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/demo/Toast';

/**
 * Global layout. Navbar is fixed (64px) so the content slot carries
 * the matching top padding — pages must NOT add nav-height offsets.
 * Full-bleed hero sections opt out inside the page (e.g. -mt-16 + pt-40).
 */
export default function Layout() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const lenis = new Lenis({ lerp: 0.1 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {/* film grain overlay */}
      <div className="grain-overlay" aria-hidden />
    </div>
  );
}
