import { identity } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
// The interactive ASCII portrait is kept for an easy switch-back — to
// restore it, re-import AsciiPortrait and swap it for the <img> below.
// import AsciiPortrait from '../ui/AsciiPortrait';

/**
 * Section 2 — Home.
 *
 * A greeting beside a portrait photo, shown as-is in a clean frame.
 */
export default function Home() {
  return (
    <section id="home" className="relative flex w-full items-center" aria-label="Home">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-10 md:py-32">
        {/* text */}
        <Reveal>
          <RevealItem>
            <h1 className="font-display text-5xl leading-[1.02] font-bold tracking-[-0.04em] text-ink md:text-7xl">
              {identity.headingPre}
              <span className="text-holo">{identity.headingAccent}</span>
              {identity.headingPost}
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-mist md:text-xl">{identity.intro}</p>
          </RevealItem>
        </Reveal>

        {/* portrait photo — shown as-is */}
        <Reveal className="mx-auto w-full max-w-[360px] md:max-w-[440px]">
          <RevealItem>
            <div className="group relative overflow-hidden rounded-xl border border-line transition-colors duration-500 hover:border-holo/40">
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
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
