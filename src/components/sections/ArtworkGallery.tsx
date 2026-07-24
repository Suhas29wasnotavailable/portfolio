import { useState } from 'react';
import { artworks, artworkIntro } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import Lightbox from '../ui/Lightbox';

/**
 * Artwork — a clean masonry gallery. Images lazy-load with reserved
 * dimensions (no layout shift), and clicking opens the fullscreen
 * lightbox. The work itself is the whole show.
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
            <div className="mt-12 columns-2 gap-5 md:columns-3 lg:columns-4">
              {artworks.map((artwork, i) => (
                <button
                  key={artwork.src}
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`View ${artwork.title}`}
                  className="cursor-target group mb-5 block w-full overflow-hidden rounded-md border border-line transition-colors duration-500 hover:border-holo/35"
                >
                  <img
                    src={artwork.src}
                    alt={artwork.title}
                    width={artwork.width}
                    height={artwork.height}
                    loading="lazy"
                    decoding="async"
                    className="block w-full transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </RevealItem>
        </Reveal>
      </div>

      <Lightbox items={artworks} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </section>
  );
}
