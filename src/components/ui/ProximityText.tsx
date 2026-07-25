import { useRef, useState } from 'react';
import VariableProximity from '../reactbits/VariableProximity';
import AsciiWord from '../reactbits/AsciiWord';

/**
 * Drop-in wrapper around VariableProximity: letters swell toward the
 * cursor (Roboto Flex weight axis). On hover, the animated "hey!" ASCII
 * art also plays over the word in place — the text stays visible (so the
 * proximity swell still reads) and the rippling, hue-shifting ascii is
 * blended on top.
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
      <VariableProximity
        label={label}
        className={className}
        fromFontVariationSettings={from}
        toFontVariationSettings={to}
        containerRef={ref}
        radius={radius}
        falloff="gaussian"
      />

      {hover && (
        <span
          className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2"
          style={{ mixBlendMode: 'difference' }}
        >
          <AsciiWord text={label} />
        </span>
      )}
    </span>
  );
}
