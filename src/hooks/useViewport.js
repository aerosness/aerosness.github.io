import { useEffect, useState } from 'react';

export function readViewport() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  const visualViewport = window.visualViewport;

  return {
    width: Math.round(visualViewport?.width ?? window.innerWidth),
    height: Math.round(visualViewport?.height ?? window.innerHeight),
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
          currentViewport.height === nextViewport.height
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
