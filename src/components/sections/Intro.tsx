import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import ASCIIText from '../reactbits/ASCIIText';
import { intro } from '../../data/content';

/**
 * Section 1 — the ASCII introduction.
 *
 * One viewport of black holding the ASCIIText animation ("hey!") and a
 * quiet welcome hint, both centered on the same axis.
 *
 * ASCIIText runs its own WebGL + per-frame ASCII conversion, so we
 * mount it only while this section is anywhere near the viewport and
 * tear it down once the visitor has moved on.
 */
export default function Intro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [near, setNear] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: '60% 0px 60% 0px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative h-screen w-full overflow-hidden" aria-label="Introduction">
      {near && <ASCIIText text={intro.ascii} enableWaves asciiFontSize={7} planeBaseHeight={6} />}

      {/* welcome hint — centered on the same axis as the ASCII text */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-12 flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2, ease: 'easeOut' }}
      >
        <p className="font-mono text-[13px] tracking-[0.3em] text-mist uppercase">{intro.hint}</p>
        <p className="font-mono text-[11px] tracking-[0.25em] text-faint uppercase">{intro.hintSub}</p>
        <FiChevronDown className="hint-drift text-holo/70" size={18} aria-hidden="true" />
      </motion.div>
    </section>
  );
}
