export function ControlLoop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 310 90"
      width="310"
      height="90"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Summing junction */}
      <circle cx="32" cy="40" r="9" strokeWidth="1.1" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="10" fill="currentColor" stroke="none" textAnchor="middle" dominantBaseline="middle">
        <tspan x="32" y="41">Σ</tspan>
      </text>

      {/* r(t) input arrow */}
      <line x1="2" y1="40" x2="22" y2="40" strokeWidth="1" />
      <polyline points="19,37 23,40 19,43" strokeWidth="1" fill="none" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="7.5" fill="currentColor" stroke="none" opacity="0.65">
        <tspan x="2" y="35">r(t)</tspan>
      </text>

      {/* Arrow to GNC block */}
      <line x1="41" y1="40" x2="66" y2="40" strokeWidth="1" />
      <polyline points="63,37 67,40 63,43" strokeWidth="1" fill="none" />

      {/* GNC block */}
      <rect x="67" y="26" width="52" height="28" strokeWidth="1.2" rx="1" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="8.5" fill="currentColor" stroke="none" textAnchor="middle" dominantBaseline="middle">
        <tspan x="93" y="40">GNC</tspan>
      </text>

      {/* u(t) arrow to ACT */}
      <line x1="119" y1="40" x2="144" y2="40" strokeWidth="1" />
      <polyline points="141,37 145,40 141,43" strokeWidth="1" fill="none" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="7.5" fill="currentColor" stroke="none" opacity="0.65">
        <tspan x="122" y="35">u(t)</tspan>
      </text>

      {/* ACT block */}
      <rect x="145" y="26" width="46" height="28" strokeWidth="1.2" rx="1" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="8.5" fill="currentColor" stroke="none" textAnchor="middle" dominantBaseline="middle">
        <tspan x="168" y="40">ACT</tspan>
      </text>

      {/* Arrow to PLANT */}
      <line x1="191" y1="40" x2="214" y2="40" strokeWidth="1" />
      <polyline points="211,37 215,40 211,43" strokeWidth="1" fill="none" />

      {/* PLANT block */}
      <rect x="215" y="26" width="56" height="28" strokeWidth="1.2" rx="1" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="8.5" fill="currentColor" stroke="none" textAnchor="middle" dominantBaseline="middle">
        <tspan x="243" y="40">PLANT</tspan>
      </text>

      {/* y(t) output arrow */}
      <line x1="271" y1="40" x2="306" y2="40" strokeWidth="1" />
      <polyline points="303,37 307,40 303,43" strokeWidth="1" fill="none" />
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="7.5" fill="currentColor" stroke="none" opacity="0.65">
        <tspan x="283" y="35">y(t)</tspan>
      </text>

      {/* Feedback path — down, left, up to summing junction */}
      <line x1="289" y1="40" x2="289" y2="76" strokeWidth="0.9" strokeDasharray="3 2.5" />
      <line x1="32" y1="76" x2="289" y2="76" strokeWidth="0.9" strokeDasharray="3 2.5" />
      <line x1="32" y1="49" x2="32" y2="76" strokeWidth="0.9" strokeDasharray="3 2.5" />

      {/* Feedback label */}
      <text fontFamily="var(--font-dm-mono, monospace)" fontSize="7" fill="currentColor" stroke="none" opacity="0.5">
        <tspan x="140" y="85">feedback</tspan>
      </text>
    </svg>
  );
}
