import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import { experience } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

/**
 * Experience — a quiet tabbed layout: companies down the side, the
 * selected role's story on the right.
 */
export default function Experience() {
  const [active, setActive] = useState(0);
  const job = experience[active];

  return (
    <section id="experience" className="relative w-full" aria-label="Experience">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <RevealItem>
            <SectionHeader index="03" title="experience" kicker="where i've worked" />
          </RevealItem>

          <RevealItem>
            <div className="grid gap-8 md:grid-cols-[240px_1fr] md:gap-16">
              {/* company tabs */}
              <div
                className="flex gap-1 overflow-x-auto md:flex-col md:gap-0 md:border-l md:border-line"
                role="tablist"
                aria-label="Companies"
              >
                {experience.map((item, i) => (
                  <button
                    key={item.company}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    style={item.brandColor ? { color: item.brandColor } : undefined}
                    className={`cursor-target px-5 py-3 text-left font-mono text-[13px] font-medium whitespace-nowrap transition-all duration-300 md:-ml-px md:border-l-2 ${
                      i === active
                        ? 'border-current bg-holo-faint opacity-100'
                        : 'border-transparent opacity-55 hover:opacity-100'
                    }`}
                  >
                    {item.company}
                  </button>
                ))}
              </div>

              {/* role details */}
              <div className="min-h-[220px] max-w-3xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={job.company}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="font-subhead flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl font-semibold text-ink md:text-3xl">
                      <span>{job.role}</span>
                      <span style={job.brandColor ? { color: job.brandColor } : undefined} className={job.brandColor ? undefined : 'text-holo'}>
                        @
                      </span>
                      {job.logo && job.website ? (
                        <a
                          href={job.website}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${job.company} — visit website`}
                          title={`${job.company} — visit website`}
                          className="cursor-target inline-flex items-center rounded-md border border-line bg-white px-2.5 py-1.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-holo/50 hover:shadow-md"
                        >
                          <img src={job.logo} alt={job.company} className="block h-8 w-auto md:h-9" draggable={false} />
                        </a>
                      ) : (
                        <span className="text-holo">{job.company}</span>
                      )}
                    </h3>
                    <p className="mt-2 font-mono text-[13px] tracking-wide text-faint uppercase">
                      {job.period}
                      {job.location ? ` · ${job.location}` : ''}
                    </p>

                    <ul className="mt-7 space-y-4">
                      {job.bullets.map(bullet => (
                        <li key={bullet.slice(0, 24)} className="flex gap-3.5 leading-relaxed text-mist">
                          <FiChevronRight className="mt-1.5 shrink-0 text-holo" size={14} aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
