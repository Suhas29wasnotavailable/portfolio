import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import { experience } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import SectionLabel from '../ui/SectionLabel';

/**
 * Experience — a quiet tabbed layout: companies down the side, the
 * selected role's story on the right.
 */
export default function Experience() {
  const [active, setActive] = useState(0);
  const job = experience[active];

  return (
    <section id="experience" className="relative w-full" aria-label="Experience">
      <div className="relative mx-auto w-full max-w-5xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <RevealItem>
            <SectionLabel title="experience" />
          </RevealItem>

          <RevealItem>
            <div className="mt-12 grid gap-8 md:grid-cols-[200px_1fr] md:gap-14">
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
                    className={`cursor-target px-5 py-3 text-left font-mono text-[13px] whitespace-nowrap transition-colors duration-300 md:-ml-px md:border-l-2 ${
                      i === active
                        ? 'border-holo bg-holo-faint text-holo'
                        : 'border-transparent text-faint hover:text-mist'
                    }`}
                  >
                    {item.company}
                  </button>
                ))}
              </div>

              {/* role details */}
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={job.company}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
                      {job.role} <span className="text-holo">@ {job.company}</span>
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
