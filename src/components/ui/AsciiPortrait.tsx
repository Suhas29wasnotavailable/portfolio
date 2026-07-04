import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../lib/scroll';

/**
 * Interactive ASCII portrait.
 *
 * The photo is sampled into a character grid — multiple ASCII symbols
 * chosen by brightness, coloured with the photo's own colours
 * (saturation-boosted and posterized), so the portrait keeps its real
 * palette instead of a monochrome wash. Hovering distorts the grid:
 * characters are pushed away from the cursor and ease back with a
 * gentle wave. Near-black cells are dropped entirely, so the portrait
 * floats on the page as pure glyphs.
 *
 * Performance: every (char, colour) pair actually used is pre-rendered
 * once into a sprite atlas; each frame is just ~4k drawImage calls on
 * the shared GSAP ticker, paused whenever the canvas is off-screen.
 */

const CHAR_RAMP = [' ', '.', ':', ';', '+', '*', 'x', '%', '#', '@'] as const;

/** Posterize a saturation-boosted pixel so the atlas stays small. */
function quantizeColor(r: number, g: number, b: number): string {
  // rgb → hsl
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  // boost colour so it sings on black, then posterize each channel
  const qh = Math.round(h * 18) * 20; // 18 hue steps
  const qs = Math.min(100, Math.round((s * 1.55 + 0.06) * 4) * 25); // 4 sat steps
  const ql = Math.min(88, Math.max(22, Math.round((l * 1.12) * 6) * 17)); // 6 light steps, clamped visible
  return `hsl(${qh}, ${qs}%, ${ql}%)`;
}

const COLS = 64;
const CELL_ASPECT = 1.16; // characters are taller than they are wide
const BOX_ASPECT = 5 / 4; // portrait crop: height / width
const RADIUS = 105; // px — cursor influence
const PUSH = 30; // px — max displacement

interface Cell {
  x: number;
  y: number;
  ox: number;
  oy: number;
  sprite: number; // index into the atlas, -1 = skip (near-black)
}

export default function AsciiPortrait({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cells: Cell[] = [];
    let cellW = 0;
    let cellH = 0;
    let atlas: HTMLCanvasElement | null = null;
    let colorCount = 0;
    let visible = true;
    let hovering = false;
    let settled = false;
    const mouse = { x: -9999, y: -9999 };
    let elapsed = 0;

    const img = new Image();
    img.src = src;

    /** Sample the image (center-cropped to the box aspect) into the grid. */
    const build = () => {
      if (!img.complete || img.naturalWidth === 0) return;

      const w = wrap.clientWidth;
      const h = w * BOX_ASPECT;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;

      cellW = w / COLS;
      cellH = cellW * CELL_ASPECT;
      const rows = Math.ceil(h / cellH);

      // ---- sample the photo: center-crop to the box aspect ----
      const sample = document.createElement('canvas');
      sample.width = COLS;
      sample.height = rows;
      const sctx = sample.getContext('2d', { willReadFrequently: true })!;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const targetRatio = h / w;
      let sw = iw;
      let sh = ih;
      if (ih / iw > targetRatio) sh = iw * targetRatio;
      else sw = ih / targetRatio;
      sctx.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, 0, 0, COLS, rows);
      const data = sctx.getImageData(0, 0, COLS, rows).data;

      // collect cells; colours come from the photo itself, quantized
      const colorIndex = new Map<string, number>();
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = (r * COLS + c) * 4;
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          // gentle contrast lift so the subject reads clearly
          const v = Math.min(1, Math.max(0, (lum - 0.08) * 1.25));
          const charIdx = Math.round(v * (CHAR_RAMP.length - 1));
          if (charIdx === 0) continue; // near-black → empty, keeps the page's void
          const key = quantizeColor(data[i], data[i + 1], data[i + 2]);
          let colorIdx = colorIndex.get(key);
          if (colorIdx === undefined) {
            colorIdx = colorIndex.size;
            colorIndex.set(key, colorIdx);
          }
          cells.push({
            x: c * cellW,
            y: r * cellH,
            ox: 0,
            oy: 0,
            sprite: charIdx * 1024 + colorIdx, // packed; unpacked in draw()
          });
        }
      }
      colorCount = colorIndex.size;

      // ---- sprite atlas: every (char, colour) pair actually used ----
      atlas = document.createElement('canvas');
      const spriteW = Math.ceil(cellW * dpr);
      const spriteH = Math.ceil(cellH * dpr);
      atlas.width = spriteW * CHAR_RAMP.length;
      atlas.height = spriteH * Math.max(1, colorCount);
      const actx = atlas.getContext('2d')!;
      actx.font = `600 ${cellH * dpr * 0.92}px 'IBM Plex Mono', monospace`;
      actx.textAlign = 'center';
      actx.textBaseline = 'middle';
      for (const [color, p] of colorIndex) {
        actx.fillStyle = color;
        for (let c = 0; c < CHAR_RAMP.length; c++) {
          actx.fillText(CHAR_RAMP[c], (c + 0.5) * spriteW, (p + 0.55) * spriteH);
        }
      }
      settled = false;
    };

    const draw = () => {
      if (!atlas || colorCount === 0) return;
      const spriteW = Math.ceil(cellW * dpr);
      const spriteH = Math.ceil(cellH * dpr);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const cell of cells) {
        const c = Math.floor(cell.sprite / 1024);
        const p = cell.sprite % 1024;
        ctx.drawImage(
          atlas,
          c * spriteW,
          p * spriteH,
          spriteW,
          spriteH,
          Math.round((cell.x + cell.ox) * dpr),
          Math.round((cell.y + cell.oy) * dpr),
          spriteW,
          spriteH
        );
      }
    };

    const tick = (_t: number, deltaMS: number) => {
      if (!visible || cells.length === 0) return;
      // once everything is at rest and the cursor is away, stop painting
      if (settled && !hovering) return;

      elapsed += deltaMS / 1000;
      let maxOffset = 0;

      for (const cell of cells) {
        let tx = 0;
        let ty = 0;
        if (hovering) {
          const dx = cell.x + cellW / 2 - mouse.x;
          const dy = cell.y + cellH / 2 - mouse.y;
          const d2 = dx * dx + dy * dy;
          const falloff = Math.exp(-d2 / (RADIUS * RADIUS));
          if (falloff > 0.01) {
            const d = Math.sqrt(d2) || 1;
            const push = PUSH * falloff;
            tx = (dx / d) * push;
            ty = (dy / d) * push + Math.sin(elapsed * 2.2 + cell.x * 0.06) * 1.6 * falloff;
          }
        }
        cell.ox += (tx - cell.ox) * 0.16;
        cell.oy += (ty - cell.oy) * 0.16;
        const m = Math.abs(cell.ox) + Math.abs(cell.oy);
        if (m > maxOffset) maxOffset = m;
      }

      draw();
      settled = maxOffset < 0.05;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    img.onload = () => {
      build();
      draw();
      if (!reduced) {
        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerleave', onLeave);
        gsap.ticker.add(tick);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth > 0) {
        build();
        draw();
      }
    });
    ro.observe(wrap);

    return () => {
      gsap.ticker.remove(tick);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      io.disconnect();
      ro.disconnect();
    };
  }, [src]);

  return (
    <div ref={wrapRef} className="w-full" role="img" aria-label={alt}>
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}
