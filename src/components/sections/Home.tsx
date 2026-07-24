import { identity } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import AsciiPortrait from '../ui/AsciiPortrait';

/**
 * Section 2 — Home.
 *
 * A cursive greeting beside an interactive ASCII portrait: the photo
 * rendered as a glyph grid that scatters away from the cursor.
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

        {/* interactive ASCII portrait */}
        <Reveal className="mx-auto w-full max-w-[340px] md:max-w-[400px]">
          <RevealItem>
            <AsciiPortrait src={identity.portrait} alt="ASCII portrait of Suhas — move your cursor across it" />
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
