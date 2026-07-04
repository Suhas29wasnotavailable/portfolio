import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { navigation, identity, contact } from '../../data/content';
import { getLenis } from '../../lib/scroll';

/**
 * Fixed navigation — name on the far left, section links beside it,
 * social icons on the right. Always present, including over the ASCII
 * introduction; it fades in gently on load.
 */
export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 250);
    return () => window.clearTimeout(id);
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  const socials = [
    { label: 'LinkedIn', href: contact.linkedin, icon: FiLinkedin },
    { label: 'GitHub', href: contact.github, icon: FiGithub },
    { label: 'Email', href: `mailto:${contact.email}`, icon: FiMail },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
      }`}
    >
      <div className="border-b border-line bg-void/70 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-10 px-6 md:px-10" aria-label="Primary">
          <button
            type="button"
            onClick={() => goTo('home')}
            className="cursor-target font-display text-lg font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 hover:text-holo"
          >
            {identity.name}
          </button>

          <ul className="hidden items-center gap-7 md:flex">
            {navigation.links.map(link => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => goTo(link.id)}
                  className="cursor-target text-sm text-mist transition-colors duration-300 hover:text-holo"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-5">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                aria-label={label}
                className="cursor-target text-mist transition-colors duration-300 hover:text-holo"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
