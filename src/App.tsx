import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToHash = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Handle initial hash on load if present
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          lenis.scrollTo(hash, { offset: 0, duration: 1.2 });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(href, { offset: 0, duration: 1.2 });
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleHashClick);
    return () => {
      document.removeEventListener('click', handleHashClick);
    };
  }, [lenis]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactLenis root options={{
      // Self-drive the animation loop
      autoRaf: true,

      // Desktop / Laptop settings
      smoothWheel: true,
      duration: 1.2,
      // wheelMultiplier: 0.9 increases the "weight" by 10% (requires more physical movement)
      wheelMultiplier: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // Touch-only physics
      syncTouch: true,
      syncTouchLerp: 0.15,         // Subtle smooth trailing
      // touchMultiplier: 1.2 reduces the "weight" by 20% (moves further with less effort)
      touchMultiplier: 1.2,
      touchInertiaExponent: 1.55,  // Subtle dampening
    }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ReactLenis>
  </QueryClientProvider>
);

export default App;