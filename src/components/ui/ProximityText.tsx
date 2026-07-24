import { useRef } from 'react';
import VariableProximity from '../reactbits/VariableProximity';

/**
 * Drop-in wrapper around VariableProximity: sets up the relative
 * container it measures the cursor against, and defaults the weight
 * range to Space Grotesk's 'wght' axis so headings swell toward the
 * cursor. Pass `className` for the type styles (size, colour, family).
 */
export default function ProximityText({
  label,
  className,
  from = "'wght' 480",
  to = "'wght' 700",
  radius = 130,
}: {
  label: string;
  className?: string;
  from?: string;
  to?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <VariableProximity
        label={label}
        className={className}
        fromFontVariationSettings={from}
        toFontVariationSettings={to}
        containerRef={ref}
        radius={radius}
        falloff="gaussian"
      />
    </span>
  );
}
