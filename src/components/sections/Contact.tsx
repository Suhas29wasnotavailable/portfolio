import { FiGithub, FiLinkedin, FiFileText, FiArrowUpRight } from 'react-icons/fi';
import { contact, identity } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import ProximityText from '../ui/ProximityText';

/**
 * Contact — the editorial closer: an oversized heading, the email as a
 * large primary link, and the rest of the links in a quiet row.
 */

const links = [
  { label: 'GitHub', href: contact.github, icon: FiGithub, external: true },
  { label: 'LinkedIn', href: contact.linkedin, icon: FiLinkedin, external: true },
  { label: 'Resume', href: contact.resume, icon: FiFileText, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full" aria-label="Contact">
      <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16 md:px-10 md:pt-32">
        <Reveal>
          <div className="border-t border-line pt-14 md:pt-20">
            <RevealItem>
              <p className="font-mono text-xs tracking-[0.3em] text-faint uppercase">
                <span className="text-holo">06</span> — contact
              </p>
            </RevealItem>

            <RevealItem>
              <h2 className="font-display mt-6 text-6xl leading-[0.9] tracking-[-0.03em] text-ink md:text-8xl lg:text-9xl">
                <ProximityText label="Let's talk." from="'wght' 340, 'opsz' 40" to="'wght' 900, 'opsz' 144" radius={220} />
              </h2>
            </RevealItem>

            <RevealItem>
              <p className="mt-8 max-w-md leading-relaxed text-mist">{contact.blurb}</p>
            </RevealItem>

            <RevealItem>
              <a
                href={`mailto:${contact.email}`}
                className="cursor-target font-subhead group mt-10 inline-flex items-center gap-3 text-3xl text-ink transition-colors duration-300 hover:text-holo md:text-5xl"
              >
                {contact.email}
                <FiArrowUpRight
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={30}
                  aria-hidden="true"
                />
              </a>
            </RevealItem>

            <RevealItem>
              <nav className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4" aria-label="Contact links">
                {links.map(({ label, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="cursor-target inline-flex items-center gap-2.5 text-sm font-medium text-ink/85 transition-colors duration-300 hover:text-holo"
                  >
                    <Icon size={17} aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </nav>
            </RevealItem>
          </div>

          <RevealItem>
            <div className="mt-24 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs tracking-[0.2em] text-faint uppercase sm:flex-row sm:items-center sm:justify-between">
              <span>
                © {new Date().getFullYear()} {identity.name}
              </span>
              <span>Bengaluru, India</span>
              <span className="text-holo">Built from scratch</span>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
