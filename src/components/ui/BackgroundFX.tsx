import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/scroll';

/**
 * A living backdrop, borrowed from the intro's palette.
 *
 * A sparse field of colored monospace glyphs is painted on a fixed
 * canvas behind every section. Each glyph twinkles on a slow sine
 * field and cycles through the vibrant "hey" hues; scroll position
 * feeds into both the pattern phase and the hue, so the background
 * quietly changes as the visitor moves down the page — never the same
 * frame twice, but faint enough to stay behind the words.
 *
 * Cheap by construction: one canvas, only the lit cells are drawn,
 * paused when the tab is hidden or when the motion preference is set.
 */

const GLYPHS = ['*', '+', '.', ':', 'o', 'x', '#', '@', '/', '=', '~', '·'] as const;
const CELL = 26; // px between glyph slots

/** Stable per-cell pseudo-random value in [0,1). */
function hash(c: number, r: number): number {
  const x = Math.sin(c * 127.1 + r * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cols = 0;
    let rows = 0;
    let raf = 0;
    let running = true;
    let isLight = document.documentElement.getAttribute('data-theme') === 'light';

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `600 15px 'IBM Plex Mono', monospace`;
    };

    const frame = (t: number) => {
      const time = t * 0.001;
      const scroll = window.scrollY;
      // subtle parallax: the field drifts opposite the scroll
      const drift = (-scroll * 0.12) % CELL;
      const phase = scroll * 0.0016;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // tuned per theme: bright glyphs on black, deeper + more opaque
      // glyphs on paper so the colour reads on both
      const maxAlpha = isLight ? 0.34 : 0.24;
      const light = isLight ? 42 : 62;
      const sat = isLight ? 92 : 88;

      // brightness of the vivid "spark" pops — matched to the intro's glow
      const sparkLight = isLight ? 52 : 66;
      const sparkMaxAlpha = isLight ? 0.62 : 0.95;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // --- random vivid pops: a handful of pixels "ignite" like the
          // ascii "hey!", each on its own hash-offset twinkle cycle, hue
          // racing through the full spectrum at full saturation ---
          const h = hash(c, r);
          const twinkle = Math.sin(time * 0.9 + h * 6.2831853);
          if (twinkle > 0.94) {
            const s = (twinkle - 0.94) / 0.06; // 0..1
            const sHue = (h * 360 + time * 90) % 360;
            ctx.fillStyle = `hsla(${sHue}, 100%, ${sparkLight}%, ${(s * sparkMaxAlpha).toFixed(3)})`;
            const gg = GLYPHS[(c * 3 + r * 7 + Math.floor(time * 3)) % GLYPHS.length];
            ctx.fillText(gg, c * CELL, r * CELL + drift);
            continue;
          }

          // Dark mode gets ONLY the vivid sparks (new). Light mode also
          // keeps the subtle base field underneath (old + new).
          if (!isLight) continue;

          // --- the subtle base field: two waves plus a diagonal low-freq
          // term so it never visibly tiles ---
          const a = Math.sin(c * 0.45 + time * 0.5 + phase);
          const b = Math.cos(r * 0.5 - time * 0.4 + phase * 0.7);
          const diag = Math.sin((c * 0.9 + r * 1.3) * 0.15 - time * 0.3);
          const v = 0.5 + 0.34 * a * b + 0.3 * diag;
          if (v < 0.72) continue;

          const strength = Math.min(1, (v - 0.72) / 0.3); // 0..1
          const hue = (c * 7 + r * 11 + time * 22 + scroll * 0.35) % 360;
          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${(strength * maxAlpha).toFixed(3)})`;

          const g = GLYPHS[(c * 3 + r * 7 + Math.floor(v * 9) + Math.floor(time * 0.5)) % GLYPHS.length];
          ctx.fillText(g, c * CELL, r * CELL + drift);
        }
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    // one static frame for reduced-motion users. Dark gets a sparse
    // scatter of vivid dots (frozen sparks); light also keeps the field.
    const staticFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const maxAlpha = isLight ? 0.28 : 0.18;
      const light = isLight ? 42 : 62;
      const sat = isLight ? 92 : 88;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const h = hash(c, r);
          if (h > 0.9) {
            ctx.fillStyle = `hsla(${(h * 360) % 360}, 100%, ${isLight ? 52 : 66}%, ${isLight ? 0.5 : 0.85})`;
            ctx.fillText(GLYPHS[(c * 3 + r * 7) % GLYPHS.length], c * CELL, r * CELL);
            continue;
          }
          if (!isLight) continue;
          const v = 0.5 + 0.34 * Math.sin(c * 0.45) * Math.cos(r * 0.5) + 0.3 * Math.sin((c * 0.9 + r * 1.3) * 0.15);
          if (v < 0.72) continue;
          const hue = (c * 7 + r * 11) % 360;
          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${maxAlpha})`;
          ctx.fillText(GLYPHS[(c * 3 + r * 7) % GLYPHS.length], c * CELL, r * CELL);
        }
      }
    };

    resize();
    if (reduced) staticFrame();
    else raf = requestAnimationFrame(frame);

    const onResize = () => {
      resize();
      if (reduced) staticFrame();
    };
    window.addEventListener('resize', onResize);

    // pause when the tab is hidden to save cycles
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // repaint immediately when the theme flips
    const observer = new MutationObserver(() => {
      isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (reduced) staticFrame();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
