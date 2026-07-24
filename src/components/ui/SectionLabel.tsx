import ProximityText from './ProximityText';

/**
 * Chapter heading in the `> section` style — an accent chevron, a
 * lowercase display-face title whose letters swell toward the cursor
 * (variable-proximity on Space Grotesk's weight axis), and a hairline
 * carrying the eye across.
 */
export default function SectionLabel({ title }: { title: string }) {
  return (
    <h2 className="flex items-center gap-5">
      <span className="font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
        <span className="mr-3 text-holo">&gt;</span>
        <ProximityText label={title} />
      </span>
      <span className="h-px max-w-72 flex-1 bg-line" aria-hidden="true" />
    </h2>
  );
}
