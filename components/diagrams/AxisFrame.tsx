export function AxisFrame({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100"
      height="100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Origin dot */}
      <circle cx="48" cy="60" r="2.2" fill="currentColor" stroke="none" />

      {/* X axis — right */}
      <line x1="48" y1="60" x2="88" y2="60" strokeWidth="1.2" />
      <polyline points="84,56.5 89,60 84,63.5" strokeWidth="1.2" fill="none" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="9" fill="currentColor" stroke="none" opacity="0.85">
        <tspan x="92" y="63">x</tspan>
      </text>

      {/* Y axis — up */}
      <line x1="48" y1="60" x2="48" y2="18" strokeWidth="1.2" />
      <polyline points="44.5,22 48,17 51.5,22" strokeWidth="1.2" fill="none" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="9" fill="currentColor" stroke="none" opacity="0.85">
        <tspan x="51" y="14">y</tspan>
      </text>

      {/* Z axis — out of plane (drawn as diagonal) */}
      <line x1="48" y1="60" x2="14" y2="86" strokeWidth="1.2" />
      <polyline points="17,80 14,86 21,85" strokeWidth="1.2" fill="none" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="9" fill="currentColor" stroke="none" opacity="0.85">
        <tspan x="3" y="98">z</tspan>
      </text>

      {/* Dimension reference tick marks on x */}
      <line x1="62" y1="57" x2="62" y2="63" strokeWidth="0.7" opacity="0.4" />
      <line x1="76" y1="57" x2="76" y2="63" strokeWidth="0.7" opacity="0.4" />

      {/* Dimension reference tick marks on y */}
      <line x1="44" y1="44" x2="52" y2="44" strokeWidth="0.7" opacity="0.4" />
      <line x1="44" y1="30" x2="52" y2="30" strokeWidth="0.7" opacity="0.4" />
    </svg>
  );
}
