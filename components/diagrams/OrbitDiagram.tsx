export function OrbitDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 160"
      width="220"
      height="160"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Orbit ellipse */}
      <ellipse cx="108" cy="82" rx="88" ry="52" strokeWidth="1.1" />

      {/* Apsidal axis — dashed reference line */}
      <line x1="20" y1="82" x2="196" y2="82" strokeWidth="0.7" strokeDasharray="3 3" stroke="currentColor" opacity="0.45" />

      {/* Earth at left focus (c ≈ 71, focus at 108-71=37) */}
      <circle cx="37" cy="82" r="7" strokeWidth="1.1" />
      {/* Equator line on Earth */}
      <line x1="30" y1="82" x2="44" y2="82" strokeWidth="0.7" opacity="0.5" />

      {/* Tick marks at apoapsis and periapsis */}
      <line x1="20" y1="78" x2="20" y2="86" strokeWidth="1.1" />
      <line x1="196" y1="78" x2="196" y2="86" strokeWidth="1.1" />

      {/* Spacecraft (small cross) near apoapsis */}
      <line x1="193" y1="82" x2="199" y2="82" strokeWidth="1.2" />
      <line x1="196" y1="79" x2="196" y2="85" strokeWidth="1.2" />

      {/* Velocity vector arrow at spacecraft */}
      <line x1="196" y1="72" x2="196" y2="60" strokeWidth="0.8" />
      <polyline points="193,63 196,59 199,63" strokeWidth="0.8" fill="none" />

      {/* Labels */}
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="8" fill="currentColor" stroke="none" opacity="0.7">
        <tspan x="4" y="76">rp</tspan>
        <tspan x="199" y="76">ra</tspan>
        <tspan x="29" y="99">⊕</tspan>
        <tspan x="185" y="57">v</tspan>
      </text>

      {/* Dimension line from Earth to periapsis */}
      <line x1="37" y1="94" x2="20" y2="94" strokeWidth="0.6" opacity="0.35" strokeDasharray="2 2" />
    </svg>
  );
}
