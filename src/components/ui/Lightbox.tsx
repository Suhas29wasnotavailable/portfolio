import { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getLenis } from '../../lib/scroll';
import type { Artwork } from '../../data/content';

/**
 * Fullscreen artwork lightbox. The artwork stays the focus: near-black
 * backdrop, a quiet caption, controls that keep out of the way.
 * Esc closes, arrow keys navigate, page scroll is suspended while open.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: Artwork[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onNavigate((index + dir + items.length) % items.length);
    },
    [index, items.length, onNavigate]
  );

  // suspend page scroll while open
  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, step]);

  const artwork = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={artwork.title}
        >
          <motion.figure
            key={artwork.src}
            className="flex max-h-full flex-col items-center px-6"
            initial={{ opacity: 0, scale: 0.965 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={artwork.src}
              alt={artwork.title}
              className="rounded-sm object-contain shadow-[0_0_80px_rgba(111,195,255,0.08)]"
              style={{
                // explicit sizing: SVG sources have no intrinsic pixel size
                aspectRatio: `${artwork.width} / ${artwork.height}`,
                height: artwork.height >= artwork.width ? '82vh' : 'auto',
                width: artwork.height >= artwork.width ? 'auto' : 'min(86vw, 1100px)',
                maxHeight: '82vh',
                maxWidth: '90vw',
              }}
              draggable={false}
            />
            <figcaption className="mt-5 font-mono text-[13px] tracking-[0.25em] text-mist uppercase">
              {artwork.title}
              <span className="ml-4 text-faint">
                {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </figcaption>
          </motion.figure>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-target absolute top-6 right-6 p-2 text-mist transition-colors duration-300 hover:text-ink"
          >
            <FiX size={22} />
          </button>

          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous artwork"
            className="cursor-target absolute left-4 p-3 text-faint transition-colors duration-300 hover:text-ink md:left-8"
          >
            <FiChevronLeft size={26} />
          </button>
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next artwork"
            className="cursor-target absolute right-4 p-3 text-faint transition-colors duration-300 hover:text-ink md:right-8"
          >
            <FiChevronRight size={26} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
