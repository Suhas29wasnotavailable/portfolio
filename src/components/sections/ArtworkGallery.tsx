import { useState } from 'react';
import { artworks, artworkIntro } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import Lightbox from '../ui/Lightbox';

/**
 * Bento tile sizes (column × row spans) keyed by position — a mix of
 * large feature tiles, wide tiles and tall tiles so the gallery reads as
 * a dynamic mosaic rather than an even grid. Wraps if there are more
 * artworks than entries.
 */
const BENTO: { c: number; r: number }[] = [
  { c: 2, r: 3 }, // large feature
  { c: 2, r: 2 }, // wide
  { c: 1, r: 2 },
  { c: 1, r: 3 }, // tall
  { c: 1, r: 2 },
  { c: 1, r: 3 }, // tall
  { c: 2, r: 3 }, // large feature
  { c: 1, r: 2 },
  { c: 1, r: 3 }, // tall
];

/**
 * Artwork — a bento mosaic. Tiles vary in size and pack with dense
 * auto-flow; clicking any piece opens the fullscreen lightbox with the
 * full, uncropped image.
 */
export default function ArtworkGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="artwork" className="relative w-full" aria-label="Artwork">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <RevealItem>
            <SectionHeader index="05" title="artwork" kicker="when i'm not coding" />
          </RevealItem>

          <RevealItem>
            <p className="max-w-xl leading-relaxed text-mist">{artworkIntro}</p>
          </RevealItem>

          <RevealItem>
            <div className="mt-12 grid auto-rows-[120px] grid-cols-2 gap-4 [grid-auto-flow:dense] sm:auto-rows-[150px] md:grid-cols-4 lg:auto-rows-[160px]">
              {artworks.map((artwork, i) => {
                const span = BENTO[i % BENTO.length];
                return (
                  <button
                    key={artwork.src}
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`View ${artwork.title}`}
                    style={{ gridColumn: `span ${span.c}`, gridRow: `span ${span.r}` }}
                    className="cursor-target group relative block overflow-hidden rounded-lg border border-line transition-colors duration-500 hover:border-holo/40"
                  >
                    <img
                      src={artwork.src}
                      alt={artwork.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-110"
                      draggable={false}
                    />
                  </button>
                );
              })}
            </div>
          </RevealItem>
        </Reveal>
      </div>

      <Lightbox items={artworks} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </section>
  );
}
