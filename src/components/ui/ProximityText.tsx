import { useRef, useState } from 'react';
import VariableProximity from '../reactbits/VariableProximity';
import AsciiWord from '../reactbits/AsciiWord';

/**
 * Drop-in wrapper around VariableProximity: letters swell toward the
 * cursor (Roboto Flex weight axis). On hover the whole word also resolves
 * into static ASCII art — the word rebuilt from small glyphs in the
 * intro's "hey!" gradient — overlaid in place of the text.
 */
export default function ProximityText({
  label,
  className,
  from = "'wght' 300, 'opsz' 16",
  to = "'wght' 900, 'opsz' 64",
  radius = 150,
}: {
  label: string;
  className?: string;
  from?: string;
  to?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState(false);

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <span className="transition-opacity duration-150" style={{ opacity: hover ? 0 : 1 }}>
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

      {hover && (
        <span className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2">
          <AsciiWord text={label} />
        </span>
      )}
    </span>
  );
}
