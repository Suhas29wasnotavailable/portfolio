import { useEffect, useRef } from 'react';

/**
 * Renders a word as static ASCII art on a 2D canvas — the word's shapes
 * are rebuilt out of many small monospace glyphs, painted with the intro's
 * "hey!" gradient. No animation (unlike the WebGL ASCIIText). Used as a
 * hover overlay so headings "become the ascii text" from the intro.
 */

const RAMP = ' .:-=+*oO#%8B@$WM&'; // light → dense, indexed by ink coverage

export default function AsciiWord({
  text,
  fontFamily = "'Space Grotesk Variable', sans-serif",
  heightEm = 1.45,
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

    let cancelled = false;

    const draw = () => {
      if (cancelled) return;

      // 1) render the word to an offscreen canvas (white on transparent)
      const F = 200;
      const src = document.createElement('canvas');
      const sctx = src.getContext('2d', { willReadFrequently: true });
      if (!sctx) return;
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

      // 2) ascii grid — fewer, larger rows so the glyphs stay legible/bright
      const rows = 12;
      const cellAspect = 0.55; // char width / height
      const cols = Math.max(1, Math.round((tw / th) * rows / cellAspect));
      const stepX = tw / cols;
      const stepY = th / rows;

      // 3) visible canvas
      const CH = 16;
      const CW = Math.max(1, Math.round(CH * cellAspect));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const outW = cols * CW;
      const outH = rows * CH;
      canvas.width = Math.round(outW * dpr);
      canvas.height = Math.round(outH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, outW, outH);

      // bright multi-hue gradient — echoes the intro "hey!" (teal/green body,
      // pink/orange/yellow accents) so it pops on the dark background
      const grad = ctx.createLinearGradient(0, 0, outW, outH);
      grad.addColorStop(0.0, '#7ff3d8');
      grad.addColorStop(0.28, '#a6ff9e');
      grad.addColorStop(0.52, '#ff9ec0');
      grad.addColorStop(0.76, '#ffb27a');
      grad.addColorStop(1.0, '#ffe58c');
      ctx.fillStyle = grad;
      ctx.font = `${CH}px 'IBM Plex Mono', ui-monospace, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

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
          const a = n ? sum / n / 255 : 0;
          if (a < 0.1) continue;
          const idx = Math.min(RAMP.length - 1, 2 + Math.floor(a * (RAMP.length - 3)));
          ctx.fillText(RAMP[idx], (c + 0.5) * CW, (r + 0.5) * CH);
        }
      }

      // scale to roughly the heading's height
      canvas.style.height = `${heightEm}em`;
      canvas.style.width = `${(outW / outH) * heightEm}em`;
    };

    if (document.fonts?.ready) document.fonts.ready.then(draw);
    draw();

    return () => {
      cancelled = true;
    };
  }, [text, fontFamily, heightEm]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none block" />;
}
