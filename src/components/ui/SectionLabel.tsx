/**
 * Chapter heading in the `> section` style — an accent chevron, a
 * lowercase display-face title that lights up with the intro's
 * radiating palette on hover, and a hairline carrying the eye across.
 */
export default function SectionLabel({ title }: { title: string }) {
  return (
    <h2 className="flex items-center gap-5">
      <span className="hey-gradient-hover font-display text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
        <span className="mr-3 text-holo">&gt;</span>
        {title}
      </span>
      <span className="h-px max-w-72 flex-1 bg-line" aria-hidden="true" />
    </h2>
  );
}
