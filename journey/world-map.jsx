/* World map with journey path — simplified continent outlines + pins */

const CONTINENTS = [
  // Very simplified continent shapes — stylized hand-drawn look
  // Europe
  "M 460 180 Q 470 160 490 165 L 530 158 Q 560 162 570 180 L 575 210 Q 565 230 545 235 L 510 240 Q 485 235 470 220 Z",
  // Africa
  "M 475 260 Q 495 255 520 265 L 545 290 Q 555 340 545 390 L 525 430 Q 505 445 485 435 L 470 400 Q 465 350 470 300 Z",
  // Asia
  "M 575 170 Q 620 160 680 170 L 760 180 Q 810 195 820 230 L 815 275 Q 790 295 745 300 L 680 305 Q 620 300 590 280 L 580 230 Z",
  // India (separate, more detail)
  "M 640 285 Q 655 285 670 295 L 685 320 Q 690 345 680 370 Q 670 385 660 380 Q 655 360 650 340 Q 645 315 640 300 Z",
  // North America
  "M 155 170 Q 200 150 260 155 L 320 170 Q 340 195 335 230 L 310 260 Q 275 275 235 270 L 185 255 Q 155 235 150 210 Z",
  // South America
  "M 270 310 Q 300 305 325 325 L 340 360 Q 345 410 330 440 L 305 455 Q 285 450 275 425 L 265 380 Q 260 340 270 320 Z",
  // Australia
  "M 760 420 Q 790 415 815 425 L 830 445 Q 825 465 800 470 L 770 465 Q 755 450 755 435 Z",
];

const WorldMap = ({ stops, activeId, onPinClick, hoveredId, onHover, fgColor, accentColor, secondaryColor }) => {
  // Project lat/lon to simple equirectangular within 900x500 viewBox
  const project = ([lat, lon]) => {
    const x = ((lon + 180) / 360) * 900;
    const y = ((90 - lat) / 180) * 500;
    return [x, y];
  };

  const points = stops.map(s => ({ ...s, xy: project(s.coords) }));

  // Build the path as a smooth curve through the points
  let pathD = '';
  if (points.length > 1) {
    pathD = `M ${points[0].xy[0]} ${points[0].xy[1]}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1].xy;
      const curr = points[i].xy;
      const midX = (prev[0] + curr[0]) / 2;
      const midY = (prev[1] + curr[1]) / 2 - 18; // arc up
      pathD += ` Q ${midX} ${midY} ${curr[0]} ${curr[1]}`;
    }
  }

  return (
    <svg viewBox="0 0 900 500" width="100%" style={{ display: 'block' }}>
      {/* Lat/lon grid */}
      <g stroke={fgColor} strokeWidth="0.3" opacity="0.15">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="500" />
        ))}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="900" y2={i * 100} />
        ))}
      </g>

      {/* Continents */}
      <g fill={secondaryColor} opacity="0.35" stroke={fgColor} strokeWidth="0.5" strokeOpacity="0.4">
        {CONTINENTS.map((d, i) => <path key={i} d={d} />)}
      </g>

      {/* Dotted path between stops */}
      {pathD && (
        <path
          d={pathD}
          fill="none"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeDasharray="2 5"
          opacity="0.7"
        />
      )}

      {/* Pins */}
      {points.map((p, i) => {
        const isActive = p.id === activeId;
        const isHovered = p.id === hoveredId;
        const r = isActive ? 7 : isHovered ? 6 : 4.5;
        return (
          <g
            key={p.id}
            transform={`translate(${p.xy[0]}, ${p.xy[1]})`}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => onHover && onHover(p.id)}
            onMouseLeave={() => onHover && onHover(null)}
            onClick={() => onPinClick && onPinClick(p.id)}
          >
            {(isActive || isHovered) && (
              <>
                <circle r={r + 8} fill="none" stroke={accentColor} strokeWidth="0.6" opacity="0.6" />
                <circle r={r + 14} fill="none" stroke={accentColor} strokeWidth="0.4" opacity="0.35" />
              </>
            )}
            <circle r={r} fill={accentColor} stroke={fgColor} strokeWidth="0.8" />
            <text
              y={isActive || isHovered ? -14 : -10}
              textAnchor="middle"
              fontSize={isActive ? "11" : "9"}
              fill={fgColor}
              fontFamily="IBM Plex Mono, monospace"
              style={{ textTransform: 'uppercase', letterSpacing: '0.1em', pointerEvents: 'none' }}
              fontWeight={isActive ? 600 : 400}
            >
              {p.place}
            </text>
            <text
              y={r + 12}
              textAnchor="middle"
              fontSize="7"
              fill={fgColor}
              opacity="0.6"
              fontFamily="IBM Plex Mono, monospace"
              style={{ pointerEvents: 'none' }}
            >
              {String(i + 1).padStart(2, '0')}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

Object.assign(window, { WorldMap });
