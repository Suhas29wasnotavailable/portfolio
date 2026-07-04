import { FiChevronRight } from 'react-icons/fi';
import { about } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import SectionLabel from '../ui/SectionLabel';

/**
 * About — text on the left, a photo on the right, and a short list of
 * current interests.
 */
export default function About() {
  return (
    <section id="about" className="relative w-full" aria-label="About">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <RevealItem>
            <SectionLabel title="about me" />
          </RevealItem>

          <div className="mt-12 grid gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
            {/* photo on the left — the ASCII portrait in Home sits on the right */}
            <div className="relative mx-auto w-full max-w-[300px] md:mx-0">
              <RevealItem>
                <div className="group relative overflow-hidden rounded-lg border border-line transition-colors duration-500 hover:border-holo/40">
                  <img
                    src={about.photo}
                    alt={about.photoAlt}
                    loading="lazy"
                    className="block aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    draggable={false}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(165deg, rgba(111,195,255,0.10), rgba(111,195,255,0) 45%, rgba(5,5,8,0.25))',
                    }}
                  />
                </div>
              </RevealItem>
            </div>

            <div>
              <RevealItem>
                <p className="text-xl leading-relaxed font-medium text-ink md:text-2xl md:leading-relaxed">
                  {about.lead}
                </p>
              </RevealItem>

              <div className="mt-8 space-y-5">
                {about.paragraphs.map(paragraph => (
                  <RevealItem key={paragraph.slice(0, 24)}>
                    <p className="leading-relaxed text-mist">{paragraph}</p>
                  </RevealItem>
                ))}
              </div>

              <RevealItem>
                <p className="mt-10 font-mono text-[13px] tracking-wide text-ink/80">{about.interestsTitle}</p>
                <ul className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
                  {about.interests.map(interest => (
                    <li key={interest} className="flex items-center gap-2.5 text-[15px] text-mist">
                      <FiChevronRight className="shrink-0 text-holo" size={14} aria-hidden="true" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
