import { useEffect, useState } from 'react';

export function readViewport() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0, safeAreaBottom: 0 };
  }

  const visualViewport = window.visualViewport;
  const rawSafeAreaBottom =
    typeof document !== 'undefined' && window.getComputedStyle
      ? Number.parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--safe-area-bottom'),
        )
      : 0;

  return {
    width: Math.round(visualViewport?.width ?? window.innerWidth),
    height: Math.round(visualViewport?.height ?? window.innerHeight),
    safeAreaBottom: Number.isFinite(rawSafeAreaBottom)
      ? Math.max(0, rawSafeAreaBottom)
      : 0,
  };
}

export function useViewport() {
  const [viewport, setViewport] = useState(readViewport);

  useEffect(() => {
    let animationFrame = null;

    const updateViewport = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(() => {
        const nextViewport = readViewport();
        setViewport((currentViewport) =>
          currentViewport.width === nextViewport.width &&
          currentViewport.height === nextViewport.height &&
          currentViewport.safeAreaBottom === nextViewport.safeAreaBottom
            ? currentViewport
            : nextViewport,
        );
        animationFrame = null;
      });
    };

    window.addEventListener('resize', updateViewport);
    window.visualViewport?.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.visualViewport?.removeEventListener('resize', updateViewport);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return viewport;
}
