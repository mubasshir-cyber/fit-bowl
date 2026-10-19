/**
 * Smooth scrolling utility that leverages Lenis when available,
 * falling back gracefully to native scrollIntoView.
 */
export function smoothScrollTo(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number }
) {
  if (typeof window === 'undefined') return;

  const lenis = (
    window as unknown as {
      lenis?: {
        scrollTo: (
          target: string | HTMLElement,
          options?: Record<string, unknown>
        ) => void;
      };
    }
  ).lenis;

  if (lenis) {
    lenis.scrollTo(target, {
      offset: options?.offset ?? -20,
      duration: options?.duration ?? 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const el =
      typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
