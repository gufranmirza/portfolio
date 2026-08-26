/**
 * https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
 */

import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

function usePrefersReducedMotion() {
  // Start with the same value the server rendered so hydration matches.
  // The effect below reads the real preference on the client, before any
  // animation runs. Consumers must list this in their effect deps.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    setPrefersReducedMotion(!mediaQueryList.matches);

    const listener = event => {
      setPrefersReducedMotion(!event.matches);
    };

    // addListener is deprecated but still needed for Safari < 14
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
      return () => mediaQueryList.removeEventListener('change', listener);
    }
    mediaQueryList.addListener(listener);
    return () => mediaQueryList.removeListener(listener);
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
