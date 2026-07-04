import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Scroll reveal — content rises out of blur as it enters the viewport,
 * staggered child by child. Runs once per section; layout space is
 * always reserved, so scroll height never shifts.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE },
  },
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -120px 0px' }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem(props: HTMLMotionProps<'div'>) {
  const reduced = useReducedMotion();
  return <motion.div variants={reduced ? reducedItemVariants : itemVariants} {...props} />;
}
