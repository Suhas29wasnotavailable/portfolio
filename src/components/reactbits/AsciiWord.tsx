import { useEffect, useRef } from 'react';

/**
 * Renders a word as *animated* ASCII art on a 2D canvas — the word's
 * shapes are rebuilt from many small monospace glyphs that ripple, shimmer
 * and shift hue, echoing the intro "hey!". Used as a hover overlay so a
 * heading dynamically "becomes the ascii text" while the variable-proximity
 * weight effect stays as the resting interaction underneath.
 */

const RAMP = ' .:-=+*oO#%8B@$WM&'; // light → dense, indexed by ink coverage

export default function AsciiWord({
  text,
  fontFamily = "'Roboto Flex', 'Space Grotesk Variable', sans-serif",
  heightEm = 1.3,
}: {
  text: string;
  fontFamily?: string;
  heightEm?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let cancelled = false;

    const build = () => {
      // 1) render the word to an offscreen canvas (white on transparent)
      const F = 200;
      const src = document.createElement('canvas');
      const sctx = src.getContext('2d', { willReadFrequently: true });
      if (!sctx) return null;
      sctx.font = `800 ${F}px ${fontFamily}`;
      const m = sctx.measureText(text);
      const asc = m.actualBoundingBoxAscent || F * 0.72;
      const desc = m.actualBoundingBoxDescent || F * 0.28;
      const pad = Math.round(F * 0.06);
      const tw = Math.ceil(m.width) + pad * 2;
      const th = Math.ceil(asc + desc) + pad * 2;
      src.width = tw;
      src.height = th;
      sctx.font = `800 ${F}px ${fontFamily}`;
      sctx.fillStyle = '#fff';
      sctx.textAlign = 'left';
      sctx.textBaseline = 'alphabetic';
      sctx.fillText(text, pad, pad + asc);
      const data = sctx.getImageData(0, 0, tw, th).data;

      // 2) ascii grid + precomputed coverage per cell
      const rows = 12;
      const cellAspect = 0.55;
      const cols = Math.max(1, Math.round((tw / th) * rows / cellAspect));
      const stepX = tw / cols;
      const stepY = th / rows;
      const coverage = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = Math.floor(c * stepX);
          const x1 = Math.max(x0 + 1, Math.floor((c + 1) * stepX));
          const y0 = Math.floor(r * stepY);
          const y1 = Math.max(y0 + 1, Math.floor((r + 1) * stepY));
          let sum = 0;
          let n = 0;
          for (let y = y0; y < y1; y++) {
            for (let x = x0; x < x1; x++) {
              sum += data[(y * tw + x) * 4 + 3];
              n++;
            }
          }
          coverage[r * cols + c] = n ? sum / n / 255 : 0;
        }
      }

      // 3) visible canvas sizing
      const CH = 16;
      const CW = Math.max(1, Math.round(CH * cellAspect));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const outW = cols * CW;
      const outH = rows * CH;
      canvas.width = Math.round(outW * dpr);
      canvas.height = Math.round(outH * dpr);
      canvas.style.height = `${heightEm}em`;
      canvas.style.width = `${(outW / outH) * heightEm}em`;

      const grad = ctx.createLinearGradient(0, 0, outW, outH);
      grad.addColorStop(0.0, '#7ff3d8');
      grad.addColorStop(0.28, '#a6ff9e');
      grad.addColorStop(0.52, '#ff9ec0');
      grad.addColorStop(0.76, '#ffb27a');
      grad.addColorStop(1.0, '#ffe58c');

      return { cols, rows, coverage, CW, CH, outW, outH, dpr, grad };
    };

    const g = build();
    if (!g) return;

    const start = performance.now();
    const frame = (now: number) => {
      if (cancelled) return;
      const t = (now - start) / 1000;
      const { cols, rows, coverage, CW, CH, outW, outH, dpr, grad } = g;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, outW, outH);
      // dynamic: colours drift through the spectrum over time
      ctx.filter = `hue-rotate(${((t * 45) % 360).toFixed(1)}deg)`;
      ctx.fillStyle = grad;
      ctx.font = `${CH}px 'IBM Plex Mono', ui-monospace, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const a = coverage[r * cols + c];
          if (a < 0.1) continue;
          // ripple — a travelling wave, like the intro's distortion
          const dx = Math.cos(t * 2.1 + r * 0.55) * (CW * 0.35);
          const dy = Math.sin(t * 2.6 + c * 0.5) * (CH * 0.28);
          // shimmer — nudge the glyph choice with time so it flickers
          const flick = 0.5 + 0.5 * Math.sin(t * 9 + (r * 7 + c * 13));
          const base = 2 + Math.floor(a * (RAMP.length - 4));
          const idx = Math.min(RAMP.length - 1, base + (flick > 0.82 ? 1 : 0));
          ctx.fillText(RAMP[idx], (c + 0.5) * CW + dx, (r + 0.5) * CH + dy);
        }
      }
      ctx.filter = 'none';
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [text, fontFamily, heightEm]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none block" />;
}
