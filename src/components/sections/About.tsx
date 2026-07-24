import { about } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

/**
 * About — an editorial spread: a large serif lead statement, then an
 * asymmetric grid with the photo offset left and the story + a tagged
 * list of interests on the right.
 */
export default function About() {
  return (
    <section id="about" className="relative w-full" aria-label="About">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <RevealItem>
            <SectionHeader index="02" title="about" kicker="who i am" />
          </RevealItem>

          {/* oversized serif lead */}
          <RevealItem>
            <p className="font-subhead max-w-5xl text-3xl leading-[1.22] text-ink md:text-5xl md:leading-[1.18]">
              {about.lead}
            </p>
          </RevealItem>

          <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-10">
            {/* photo — offset left */}
            <div className="md:col-span-5 lg:col-span-4">
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
                        'linear-gradient(165deg, rgba(169,208,107,0.12), rgba(169,208,107,0) 45%, rgba(5,5,8,0.25))',
                    }}
                  />
                </div>
              </RevealItem>
            </div>

            {/* story + interests */}
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-5">
                {about.paragraphs.map(paragraph => (
                  <RevealItem key={paragraph.slice(0, 24)}>
                    <p className="leading-relaxed text-mist">{paragraph}</p>
                  </RevealItem>
                ))}
              </div>

              <RevealItem>
                <p className="mt-10 font-mono text-[12px] tracking-[0.2em] text-faint uppercase">
                  {about.interestsTitle}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {about.interests.map(interest => (
                    <li
                      key={interest}
                      className="cursor-target rounded-full border border-line px-4 py-2 font-mono text-[12px] text-mist transition-colors duration-300 hover:border-holo/50 hover:text-ink"
                    >
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
