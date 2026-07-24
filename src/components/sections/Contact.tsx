import { FiGithub, FiLinkedin, FiFileText, FiMail } from 'react-icons/fi';
import { contact, identity } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';

/**
 * Contact — the last stop. Four quiet links do the talking.
 */

const links = [
  { label: 'GitHub', href: contact.github, icon: FiGithub, external: true },
  { label: 'LinkedIn', href: contact.linkedin, icon: FiLinkedin, external: true },
  { label: 'Resume', href: contact.resume, icon: FiFileText, external: true },
  { label: 'Email', href: `mailto:${contact.email}`, icon: FiMail, external: false },
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full" aria-label="Contact">
      <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center md:px-10 md:py-32">
        <Reveal>
          <RevealItem>
            <p className="font-mono text-[13px] tracking-[0.35em] text-holo/80 uppercase">
              <span className="mr-3 text-holo">&gt;</span>contact
            </p>
          </RevealItem>

          <RevealItem>
            <h2 className="font-display mt-8 text-5xl font-bold tracking-[-0.03em] text-ink md:text-7xl">
              Let's talk.
            </h2>
          </RevealItem>

          <RevealItem>
            <p className="mx-auto mt-6 max-w-md leading-relaxed text-mist">{contact.blurb}</p>
          </RevealItem>

          <RevealItem>
            <nav
              className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
              aria-label="Contact links"
            >
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

          <RevealItem>
            <p className="mt-20 font-mono text-xs tracking-[0.25em] text-faint uppercase">
              © {new Date().getFullYear()} {identity.name} — Bengaluru, India
            </p>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
