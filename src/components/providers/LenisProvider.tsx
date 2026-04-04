"use client";

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { useEffect } from 'react';

function LenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleSync = () => {
      // Force recalculation and resume scroll
      lenis.resize();
      lenis.start();
    };

    // When the browser restores from BFCache (Back/Forward navigation)
    window.addEventListener('pageshow', handleSync);
    
    // When the tab becomes visible again
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        handleSync();
      }
    });

    // Re-trigger after short delay to ensure DOM is settled
    setTimeout(handleSync, 100);

    return () => {
      window.removeEventListener('pageshow', handleSync);
    };
  }, [lenis]);

  return null;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 1.0, smoothWheel: true }}>
      <LenisSync />
      {children as any}
    </ReactLenis>
  );
}
