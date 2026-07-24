import ProximityText from './ProximityText';

/**
 * Editorial section header: a large index numeral, the section title
 * (with variable-proximity), and an optional right-aligned kicker, all
 * sitting on a full-width baseline rule. Replaces the older `> label`
 * SectionLabel for a more magazine-like structure.
 */
export default function SectionHeader({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-4">
        <div className="flex items-baseline gap-4 md:gap-7">
          <span className="font-mono text-xs text-holo md:text-sm">{index}</span>
          <h2 className="font-display text-4xl leading-[0.9] tracking-[-0.03em] text-ink md:text-6xl lg:text-7xl">
            <ProximityText label={title} />
          </h2>
        </div>
        {kicker && (
          <span className="hidden shrink-0 pb-1.5 font-mono text-[11px] tracking-[0.3em] text-faint uppercase sm:block">
            {kicker}
          </span>
        )}
      </div>
    </div>
  );
}
