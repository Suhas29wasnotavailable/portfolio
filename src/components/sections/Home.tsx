import { identity } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
// The interactive ASCII portrait is kept for an easy switch-back — to
// restore it, re-import AsciiPortrait and swap it for the <img> below.
// import AsciiPortrait from '../ui/AsciiPortrait';

/**
 * Section 1 — Home / hero.
 *
 * An editorial opening: a meta strip, an oversized greeting, a serif
 * tagline, the intro, and an offset portrait photo.
 */
export default function Home() {
  return (
    <section id="home" className="relative flex min-h-screen w-full items-center">
      <div className="mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-32">
        <Reveal>
          {/* meta strip */}
          <RevealItem>
            <div className="mb-12 flex items-center justify-between border-b border-line pb-4 font-mono text-[11px] tracking-[0.25em] text-faint uppercase">
              <span className="text-holo">Portfolio — ’26</span>
              <span className="hidden sm:block">Manipal Institute of Technology</span>
              <span>Bengaluru, IN</span>
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
            {/* text */}
            <div className="lg:col-span-7">
              <RevealItem>
                <h1 className="font-display text-6xl leading-[0.9] font-bold tracking-[-0.045em] text-ink md:text-8xl">
                  {identity.headingPre.trim()}
                  <br />
                  <span className="text-holo">{identity.headingAccent}</span>
                  {identity.headingPost}
                </h1>
              </RevealItem>

              <RevealItem>
                <p className="font-subhead mt-6 text-2xl leading-tight text-mist italic md:text-3xl">
                  Computer Science <span className="text-holo not-italic">×</span> Artificial Intelligence
                </p>
              </RevealItem>

              <RevealItem>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist">{identity.intro}</p>
              </RevealItem>
            </div>

            {/* portrait photo — offset to the right */}
            <div className="lg:col-span-5 lg:pl-6">
              <RevealItem>
                <figure className="group relative mx-auto w-full max-w-[380px] lg:ml-auto">
                  <div className="relative overflow-hidden rounded-xl border border-line transition-colors duration-500 group-hover:border-holo/40">
                    <img
                      src={identity.portrait}
                      alt="Suhas"
                      loading="eager"
                      className="block w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      draggable={false}
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(165deg, rgba(169,208,107,0.12), rgba(169,208,107,0) 45%, rgba(5,5,8,0.20))',
                      }}
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                    <span>Suhas Y</span>
                    <span className="text-holo">●</span>
                  </figcaption>
                </figure>
              </RevealItem>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
