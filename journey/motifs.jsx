/* Motifs — SVG illustrations used throughout the journal */

const Mandala = ({ size = 220, rings = 3, petals = 12, stroke = 'currentColor', opacity = 0.5, spin = 120 }) => {
  const cx = size / 2, cy = size / 2;
  const petalPaths = [];
  for (let ring = 1; ring <= rings; ring++) {
    const r = (size / 2) * (ring / (rings + 0.5));
    for (let i = 0; i < petals; i++) {
      const a = (i / petals) * Math.PI * 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      petalPaths.push(
        <circle key={`${ring}-${i}`} cx={x} cy={y} r={size * 0.02} fill="none" stroke={stroke} strokeWidth="0.8" />
      );
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity }}>
      <g style={{ animation: `spin ${spin}s linear infinite`, transformOrigin: `${cx}px ${cy}px` }}>
        {[...Array(rings)].map((_, i) => (
          <circle key={i} cx={cx} cy={cy} r={(size/2) * ((i + 1) / (rings + 0.5))} fill="none" stroke={stroke} strokeWidth="0.6" />
        ))}
        {petalPaths}
        {[...Array(petals)].map((_, i) => {
          const a = (i / petals) * Math.PI * 2;
          const x2 = cx + Math.cos(a) * (size * 0.48);
          const y2 = cy + Math.sin(a) * (size * 0.48);
          return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke={stroke} strokeWidth="0.3" />;
        })}
      </g>
    </svg>
  );
};

const BowlGlyph = ({ size = 40, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <ellipse cx="20" cy="14" rx="14" ry="2" fill="none" stroke={color} strokeWidth="0.8" />
    <path d="M 6 14 Q 6 30 20 30 Q 34 30 34 14" fill="none" stroke={color} strokeWidth="1.2" />
    <ellipse cx="20" cy="14" rx="10" ry="1.2" fill="none" stroke={color} strokeWidth="0.5" opacity="0.6" />
    <ellipse cx="20" cy="14" rx="6" ry="0.8" fill="none" stroke={color} strokeWidth="0.4" opacity="0.4" />
  </svg>
);

const Mountain = ({ size = 60, color = 'currentColor' }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 120 60">
    <path d="M 0 55 L 30 15 L 45 35 L 65 5 L 85 30 L 105 20 L 120 55 Z" fill="none" stroke={color} strokeWidth="1" />
    <path d="M 55 18 L 65 5 L 75 22" fill="none" stroke={color} strokeWidth="0.8" />
  </svg>
);

const Stamp = ({ children, rotate = -6, color = 'currentColor' }) => (
  <div style={{
    display: 'inline-block',
    border: `1.5px solid ${color}`,
    padding: '6px 14px',
    color,
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    transform: `rotate(${rotate}deg)`,
    opacity: 0.72,
    background: 'transparent',
    position: 'relative',
  }}>
    {children}
  </div>
);

const CompassRose = ({ size = 80, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.55 }}>
    <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="0.6" />
    <circle cx="40" cy="40" r="28" fill="none" stroke={color} strokeWidth="0.4" />
    <path d="M 40 6 L 44 40 L 40 74 L 36 40 Z" fill={color} opacity="0.5" />
    <path d="M 6 40 L 40 36 L 74 40 L 40 44 Z" fill={color} opacity="0.3" />
    <text x="40" y="5" fontSize="6" textAnchor="middle" fill={color} fontFamily="IBM Plex Mono, monospace">N</text>
    <text x="40" y="79" fontSize="6" textAnchor="middle" fill={color} fontFamily="IBM Plex Mono, monospace">S</text>
    <circle cx="40" cy="40" r="2" fill={color} />
  </svg>
);

const SoundRings = ({ size = 300, color = 'currentColor', playing = false }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" style={{ opacity: 0.8 }}>
    {[1, 2, 3, 4].map(i => (
      <circle
        key={i}
        cx="150" cy="150"
        r={30 * i}
        fill="none"
        stroke={color}
        strokeWidth={1.2 - i * 0.15}
        opacity={playing ? 0.9 - i * 0.15 : 0.4 - i * 0.08}
        style={playing ? {
          animation: `ripple ${2 + i * 0.4}s ease-out infinite`,
          animationDelay: `${i * 0.3}s`,
          transformOrigin: '150px 150px'
        } : {}}
      />
    ))}
    <circle cx="150" cy="150" r="4" fill={color} />
  </svg>
);

const PlaceholderImg = ({ label, aspect = '4 / 5' }) => (
  <div style={{
    aspectRatio: aspect,
    width: '100%',
    background: `repeating-linear-gradient(45deg, var(--parchment-deep) 0 10px, var(--stone-light) 10px 20px)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--umber)',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: '20px',
  }}>
    {label}
  </div>
);

Object.assign(window, { Mandala, BowlGlyph, Mountain, Stamp, CompassRose, SoundRings, PlaceholderImg });
