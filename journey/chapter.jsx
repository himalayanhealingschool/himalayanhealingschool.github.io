/* Chapter component — one stop in the journey */

const Chapter = ({ stop, index, total, active, registerRef, soundPlaying, onToggleSound }) => {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) registerRef(stop.id, ref.current); }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className={`chapter ${active ? 'is-active' : ''}`}
      data-screen-label={`${String(index + 1).padStart(2, '0')} ${stop.place}`}
      data-stop-id={stop.id}
      style={{
        position: 'relative',
        padding: '120px 0',
        scrollMarginTop: '80px',
      }}
    >
      {/* Chapter number watermark */}
      <div style={{
        position: 'absolute',
        top: 40,
        [isEven ? 'right' : 'left']: '4vw',
        fontFamily: 'var(--font-display, Cormorant Garamond), serif',
        fontSize: 'clamp(120px, 22vw, 320px)',
        fontWeight: 300,
        color: 'var(--umber)',
        opacity: 0.05,
        lineHeight: 0.8,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
        gap: '60px',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 6vw',
        alignItems: 'start',
        direction: isEven ? 'ltr' : 'rtl',
      }}>
        {/* LEFT: IMAGE + STAMP */}
        <div style={{ direction: 'ltr', position: 'relative' }}>
          <div style={{
            position: 'relative',
            transform: `rotate(${isEven ? -1.2 : 1.1}deg)`,
            transition: 'transform 0.6s cubic-bezier(.2,.8,.2,1)',
          }}
          className="photo-frame"
          >
            <div style={{
              background: 'var(--parchment-soft)',
              padding: '14px 14px 56px',
              boxShadow: '0 20px 50px rgba(58,42,34,0.18), 0 2px 0 rgba(58,42,34,0.08)',
              position: 'relative',
            }}>
              {stop.img ? (
                <img
                  src={stop.img}
                  alt={stop.imgAlt}
                  style={{
                    width: '100%',
                    display: 'block',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    background: 'var(--parchment-deep)',
                    filter: 'saturate(0.96)',
                  }}
                />
              ) : (
                <PlaceholderImg label={stop.imgAlt} aspect="4 / 5" />
              )}
              <div className="handwrite" style={{
                position: 'absolute',
                bottom: 14,
                left: 20,
                right: 20,
                textAlign: 'center',
                fontSize: '22px',
                color: 'var(--umber)',
                lineHeight: 1.1,
              }}>
                {stop.caption}
              </div>
            </div>
            {/* Tape */}
            <div style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%) rotate(-2deg)',
              width: 80,
              height: 22,
              background: 'rgba(212, 162, 76, 0.35)',
              border: '1px solid rgba(212, 162, 76, 0.2)',
            }} />
          </div>

          {/* Metadata card */}
          <div style={{
            marginTop: 36,
            background: 'var(--parchment-soft)',
            border: '1px solid var(--parchment-deep)',
            padding: '22px 24px',
            transform: `rotate(${isEven ? 0.8 : -0.8}deg)`,
            maxWidth: 380,
            boxShadow: '0 8px 24px rgba(58,42,34,0.08)',
          }}>
            <div className="mono" style={{ color: 'var(--clay-deep)', marginBottom: 12 }}>
              ≈ Field Notes ≈
            </div>
            <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 18px', fontSize: '13px' }}>
              <dt className="mono" style={{ color: 'var(--umber-soft)' }}>Lat</dt>
              <dd style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px' }}>{stop.lat}</dd>
              <dt className="mono" style={{ color: 'var(--umber-soft)' }}>Lon</dt>
              <dd style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px' }}>{stop.lon}</dd>
              <dt className="mono" style={{ color: 'var(--umber-soft)' }}>Alt</dt>
              <dd style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px' }}>{stop.altitude}</dd>
              <dt className="mono" style={{ color: 'var(--umber-soft)' }}>Bowl</dt>
              <dd style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px' }}>{stop.bowl} chakra</dd>
            </dl>
          </div>
        </div>

        {/* RIGHT: COPY */}
        <div style={{ direction: 'ltr', paddingTop: 20 }}>
          {/* Chapter marker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 40, height: 40,
              border: '1px solid var(--umber)',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 11,
              color: 'var(--umber)',
            }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div style={{ flex: 1, height: 1, background: 'var(--umber)', opacity: 0.2 }} />
            <span className="mono" style={{ color: 'var(--umber-soft)' }}>{stop.year}</span>
          </div>

          <div className="mono" style={{ color: 'var(--clay-deep)', marginBottom: 8 }}>
            Chapter {String(index + 1).padStart(2, '0')} — {stop.season}
          </div>

          <h2 className="serif-display" style={{
            fontSize: 'clamp(48px, 6vw, 84px)',
            lineHeight: 0.95,
            fontWeight: 400,
            color: 'var(--ink)',
            marginBottom: 8,
            letterSpacing: '-0.01em',
          }}>
            {stop.place}
          </h2>
          <div className="handwrite" style={{
            fontSize: '28px',
            color: 'var(--clay)',
            marginBottom: 32,
          }}>
            {stop.region}
          </div>

          <blockquote style={{
            borderLeft: '2px solid var(--clay)',
            paddingLeft: 20,
            margin: '32px 0',
            fontSize: '24px',
            fontStyle: 'italic',
            lineHeight: 1.4,
            color: 'var(--umber)',
            fontFamily: 'var(--font-display, Cormorant Garamond), serif',
          }}>
            "{stop.quote}"
          </blockquote>

          <p style={{
            fontSize: '19px',
            lineHeight: 1.7,
            color: 'var(--ink)',
            marginBottom: 32,
            maxWidth: '55ch',
            textWrap: 'pretty',
          }}>
            {stop.story}
          </p>

          {/* Practice + element */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            padding: '24px 0',
            borderTop: '1px solid var(--parchment-deep)',
            borderBottom: '1px solid var(--parchment-deep)',
            margin: '32px 0',
          }}>
            <div>
              <div className="mono" style={{ color: 'var(--umber-soft)', marginBottom: 8 }}>Practice</div>
              <div style={{ fontSize: 20, color: 'var(--ink)' }}>{stop.practice}</div>
            </div>
            <div>
              <div className="mono" style={{ color: 'var(--umber-soft)', marginBottom: 8 }}>Element</div>
              <div style={{ fontSize: 20, color: 'var(--ink)' }}>{stop.element}</div>
            </div>
          </div>

          {/* Offerings */}
          <div style={{ marginTop: 32 }}>
            <div className="mono" style={{ color: 'var(--umber-soft)', marginBottom: 14 }}>What was offered here</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {stop.offerings.map((o, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  fontSize: 17,
                  color: 'var(--ink)',
                }}>
                  <span style={{
                    width: 8, height: 8,
                    background: 'var(--clay)',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }} />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Sound toggle */}
          <button
            onClick={() => onToggleSound(stop.id)}
            style={{
              marginTop: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              background: soundPlaying ? 'var(--umber)' : 'transparent',
              color: soundPlaying ? 'var(--parchment)' : 'var(--umber)',
              border: '1px solid var(--umber)',
              padding: '14px 22px',
              cursor: 'pointer',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              transition: 'all 0.3s',
            }}
          >
            <BowlGlyph size={22} color={soundPlaying ? 'var(--parchment)' : 'var(--umber)'} />
            {soundPlaying ? 'hush the bowl' : 'sound the bowl'}
          </button>

          {soundPlaying && (
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <SoundRings size={40} color="var(--clay)" playing={true} />
              <span className="handwrite" style={{ fontSize: 18, color: 'var(--clay-deep)' }}>
                the bowl speaks in {stop.bowl.toLowerCase()}…
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

window.Chapter = Chapter;
