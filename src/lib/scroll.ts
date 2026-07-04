import Lenis from 'lenis';
import { gsap } from 'gsap';

/**
 * One Lenis instance for the whole app, driven by GSAP's ticker so that
 * scrolling, the droid flight loop and every tween share a single RAF.
 * Competing animation clocks are the usual source of scroll jitter —
 * this removes the possibility entirely.
 */
let lenis: Lenis | null = null;

export function initSmoothScroll(): Lenis {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  gsap.ticker.add(time => {
    lenis?.raf(time * 1000);
  });
  // Lenis is the timing source of truth; lag smoothing would fight it.
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function destroySmoothScroll(): void {
  lenis?.destroy();
  lenis = null;
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
