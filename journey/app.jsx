/* Main app — orchestrates the scrollable journal */

const { useState, useEffect, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "bloom",
  "typography": "classic",
  "density": "comfortable",
  "texture": "subtle",
  "mapStyle": "parchment"
}/*EDITMODE-END*/;

/* ---------------- Hero ---------------- */
const Hero = ({ onBegin, isMobile }) => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr',
      alignItems: 'center',
      position: 'relative',
      padding: '80px 6vw 40px',
      overflow: 'hidden',
    }}>
      {/* Mandala backdrop */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'var(--clay)',
        pointerEvents: 'none',
      }}>
        <Mandala size={900} rings={6} petals={24} opacity={0.07} spin={300} />
      </div>

      <div className="hero-grid" style={{
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
        gap: isMobile ? '32px' : '80px',
        alignItems: 'center',
        maxWidth: 1300,
        margin: '0 auto',
        width: '100%',
      }}>
        <div>
          <div className="mono" style={{ color: 'var(--clay-deep)', marginBottom: 20 }}>
            ◦ A love letter, in six stops ◦
          </div>

          <h1 className="serif-display" style={{
            fontSize: 'clamp(56px, 9vw, 128px)',
            lineHeight: 0.88,
            fontWeight: 300,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: 24,
          }}>
            The Bowl<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--clay)' }}>&amp; the</span><br/>
            Road
          </h1>

          <div className="handwrite" style={{
            fontSize: 'clamp(32px, 3.5vw, 48px)',
            color: 'var(--clay-deep)',
            marginBottom: 28,
            transform: 'rotate(-1.5deg)',
            transformOrigin: 'left',
          }}>
            — the journey of Mukun Verma
          </div>

          <p style={{
            fontSize: 20,
            lineHeight: 1.6,
            maxWidth: '42ch',
            color: 'var(--umber)',
            marginBottom: 36,
            textWrap: 'pretty',
          }}>
            Eleven places. One practice. A map of everywhere the singing bowl has
            travelled in her hands, and everywhere she has travelled in its hum.
          </p>

          <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 24 }}>
            <button onClick={onBegin} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'var(--umber)',
              color: 'var(--parchment)',
              border: 'none',
              padding: '16px 28px',
              cursor: 'pointer',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}>
              Begin the journey
              <span style={{ fontSize: 16, lineHeight: 0 }}>↓</span>
            </button>
            <Stamp rotate={-8} color="var(--clay-deep)">Vol. I · 11 stops · 2019–2026</Stamp>
          </div>

          <div style={{ display: 'flex', gap: 28, marginTop: 40, alignItems: 'center' }}>
            <div>
              <div className="mono" style={{ color: 'var(--umber-soft)', marginBottom: 4 }}>From</div>
              <div style={{ fontSize: 18 }}>Rishikesh, IN</div>
            </div>
            <div style={{ width: 40, height: 1, background: 'var(--umber)', opacity: 0.3 }} />
            <div>
              <div className="mono" style={{ color: 'var(--umber-soft)', marginBottom: 4 }}>To</div>
              <div style={{ fontSize: 18 }}>Toronto, CA</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            background: 'var(--parchment-soft)',
            padding: 18,
            boxShadow: '0 30px 70px rgba(58,42,34,0.25), 0 2px 0 rgba(58,42,34,0.08)',
            transform: 'rotate(2.5deg)',
          }}>
            <img
              src="assets/portrait-purple.jpg"
              alt="Portrait of Mukun"
              style={{
                width: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                background: 'var(--parchment-deep)',
                display: 'block',
                filter: 'saturate(0.98)',
              }}
            />
            <div className="handwrite" style={{
              textAlign: 'center',
              fontSize: 28,
              padding: '18px 0 6px',
              color: 'var(--umber)',
            }}>
              namaste, from wherever i am
            </div>
          </div>

          <div style={{
            position: 'absolute',
            top: -20,
            right: -10,
            transform: 'rotate(8deg)',
          }}>
            <Stamp rotate={0} color="var(--clay-deep)">Srī · 2026</Stamp>
          </div>

          <div style={{ position: 'absolute', bottom: -30, left: -30, color: 'var(--umber)' }}>
            <CompassRose size={90} color="currentColor" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Map section ---------------- */
const MapSection = ({ stops, activeId, onPinClick, scrollToStop }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [filterPractice, setFilterPractice] = useState('all');
  const rootColors = getComputedStyle(document.documentElement);
  const fg = 'var(--umber)', accent = 'var(--clay)', secondary = 'var(--stone)';

  const filteredIds = filterPractice === 'all'
    ? new Set(stops.map(s => s.id))
    : new Set(stops.filter(s => s.practice.toLowerCase().includes(filterPractice)).map(s => s.id));

  const mapStops = stops.map(s => ({ ...s, dim: !filteredIds.has(s.id) }));

  return (
    <section id="atlas" style={{
      padding: '120px 6vw',
      background: 'var(--parchment-soft)',
      borderTop: '1px solid var(--parchment-deep)',
      borderBottom: '1px solid var(--parchment-deep)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="mono" style={{ color: 'var(--clay-deep)', marginBottom: 12 }}>
              ◦ The Atlas ◦
            </div>
            <h2 className="serif-display" style={{
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              marginBottom: 14,
            }}>
              Where the bowl has <em style={{ color: 'var(--clay)' }}>been</em>.
            </h2>
            <p style={{ fontSize: 18, maxWidth: '52ch', color: 'var(--umber)' }}>
              Click any pin to land in that chapter. Hover to hear its name.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { k: 'all', l: 'All practices' },
              { k: 'sound', l: 'Sound' },
              { k: 'breath', l: 'Breath' },
              { k: 'meditation', l: 'Meditation' },
            ].map(opt => (
              <button
                key={opt.k}
                onClick={() => setFilterPractice(opt.k)}
                className={`tweak-chip ${filterPractice === opt.k ? 'active' : ''}`}
                style={{
                  padding: '8px 14px',
                  fontSize: 10,
                }}
              >
                {opt.l}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--parchment)',
          border: '1px solid var(--parchment-deep)',
          padding: 30,
          boxShadow: 'inset 0 0 80px rgba(58,42,34,0.05)',
          position: 'relative',
        }}>
          <WorldMap
            stops={mapStops}
            activeId={activeId}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onPinClick={(id) => { onPinClick(id); scrollToStop(id); }}
            fgColor="#3a2a22"
            accentColor="#c96a3d"
            secondaryColor="#a8998a"
          />

          {/* Legend inside */}
          <div style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            background: 'var(--parchment-soft)',
            border: '1px solid var(--parchment-deep)',
            padding: '14px 18px',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.1em',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--clay)' }} />
              practice stop
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 2, background: 'var(--clay)', opacity: 0.6 }} />
              the path
            </div>
          </div>
        </div>

        {/* Quick jump */}
        <div style={{
          marginTop: 36,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
        }}>
          {stops.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { onPinClick(s.id); scrollToStop(s.id); }}
              style={{
                textAlign: 'left',
                background: activeId === s.id ? 'var(--umber)' : 'var(--parchment)',
                color: activeId === s.id ? 'var(--parchment)' : 'var(--ink)',
                border: '1px solid var(--parchment-deep)',
                padding: '14px 16px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => setHoveredId(s.id)}
              onMouseLeave={(e) => setHoveredId(null)}
            >
              <div className="mono" style={{
                fontSize: 9,
                opacity: 0.7,
                marginBottom: 4,
              }}>
                {String(i + 1).padStart(2, '0')} · {s.year}
              </div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>{s.place}</div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>{s.season}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Closing ---------------- */
const Closing = ({ isMobile }) => (
  <section style={{
    padding: '140px 6vw 120px',
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--parchment-soft)',
    borderTop: '1px solid var(--parchment-deep)',
  }}>
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'var(--clay)',
      pointerEvents: 'none',
    }}>
      <Mandala size={700} rings={5} petals={18} opacity={0.06} spin={360} />
    </div>

    <div style={{
      position: 'relative',
      maxWidth: 1100,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
      gap: isMobile ? 32 : 80,
      alignItems: 'center',
    }}>
      {/* Husband polaroid */}
      <div style={{ position: 'relative' }}>
        <div style={{
          background: 'var(--parchment)',
          padding: '14px 14px 52px',
          boxShadow: '0 24px 60px rgba(58,42,34,0.22)',
          transform: isMobile ? 'none' : 'rotate(-2.5deg)',
          position: 'relative',
        }}>
          <img
            src="assets/husband-goat.jpg"
            alt="Your husband"
            style={{
              width: '100%',
              maxHeight: '75vh',
              objectFit: 'contain',
              background: 'var(--parchment-deep)',
              display: 'block',
              filter: 'saturate(0.96)',
            }}
          />
          <div className="handwrite" style={{
            position: 'absolute',
            bottom: 14,
            left: 20,
            right: 20,
            textAlign: 'center',
            fontSize: 22,
            color: 'var(--umber)',
            lineHeight: 1.1,
          }}>
            the one who kept coming home to the sound
          </div>
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
        <div style={{
          position: 'absolute',
          bottom: -24,
          right: -10,
          transform: 'rotate(6deg)',
        }}>
          <Stamp rotate={0} color="var(--clay-deep)">From · Your Husband</Stamp>
        </div>
      </div>

      {/* Letter */}
      <div>
        <div className="mono" style={{ color: 'var(--clay-deep)', marginBottom: 18 }}>
          ◦ A letter at the end of the atlas ◦
        </div>
        <h2 className="serif-display" style={{
          fontSize: 'clamp(40px, 5vw, 72px)',
          fontWeight: 300,
          lineHeight: 1.02,
          marginBottom: 24,
          letterSpacing: '-0.01em',
        }}>
          My <em style={{ color: 'var(--clay)' }}>Mukun</em>,
        </h2>
        <p style={{ fontSize: 19, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 20, maxWidth: '48ch', textWrap: 'pretty' }}>
          I have watched you go to eleven places and come back each time a little more yourself. Rishikesh made you a teacher. Kashi covered you in ash and called you blessed. Vrindavan painted your face. Nepal put a bowl in your hands that your hands already knew.
        </p>
        <p style={{ fontSize: 19, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 20, maxWidth: '48ch', textWrap: 'pretty' }}>
          Bali, Colombia, Berlin, Paris, Venice, the Alps — each of them kept a little of you, and gave you a little of themselves in return. And still, somehow, you kept coming home to me.
        </p>
        <p className="handwrite" style={{
          fontSize: 'clamp(24px, 2.6vw, 32px)',
          color: 'var(--clay-deep)',
          marginBottom: 28,
          lineHeight: 1.35,
          maxWidth: '22ch',
        }}>
          I am so proud of you.<br/>Keep ringing the bowl.<br/>I'll keep the home warm.
        </p>
        <div style={{
          display: 'inline-block',
          borderTop: '1px solid var(--umber)',
          borderBottom: '1px solid var(--umber)',
          padding: '14px 28px',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--umber)',
        }}>
          Yours · always · Toronto · 2026
        </div>

        <p className="handwrite" style={{
          marginTop: 36,
          fontSize: 22,
          color: 'var(--umber-soft)',
          opacity: 0.85,
          lineHeight: 1.4,
          maxWidth: '30ch',
        }}>
          "Hold on to what is good,<br/>even if it's a handful of earth."
        </p>
      </div>
    </div>
  </section>
);

/* ---------------- Tweaks Panel ---------------- */
const TweaksPanel = ({ open, onClose, state, onChange }) => (
  <div className={`tweaks-panel ${open ? 'open' : ''}`}>
    <h4>
      Tweaks
      <button
        onClick={onClose}
        style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 16, color: 'var(--umber)' }}
      >×</button>
    </h4>

    <label>
      <span>Palette</span>
      <div className="tweak-chips">
        {[
          { k: 'clay', c: '#c96a3d' },
          { k: 'dusk', c: '#a86e6e' },
          { k: 'stone', c: '#8a7a5c' },
          { k: 'charcoal', c: '#22201b' },
          { k: 'pranam', c: '#d99a8a' },
          { k: 'bloom', c: '#e6b8b8' },
        ].map(p => (
          <button
            key={p.k}
            className={`tweak-chip swatch ${state.palette === p.k ? 'active' : ''}`}
            style={{ background: p.c }}
            onClick={() => onChange('palette', p.k)}
            title={p.k}
          />
        ))}
      </div>
    </label>

    <label>
      <span>Typography</span>
      <div className="tweak-chips">
        {['classic', 'editorial', 'humanist'].map(t => (
          <button
            key={t}
            className={`tweak-chip ${state.typography === t ? 'active' : ''}`}
            onClick={() => onChange('typography', t)}
          >{t}</button>
        ))}
      </div>
    </label>

    <label>
      <span>Layout density</span>
      <div className="tweak-chips">
        {['airy', 'comfortable', 'dense'].map(d => (
          <button
            key={d}
            className={`tweak-chip ${state.density === d ? 'active' : ''}`}
            onClick={() => onChange('density', d)}
          >{d}</button>
        ))}
      </div>
    </label>

    <label>
      <span>Paper texture</span>
      <div className="tweak-chips">
        {['off', 'subtle', 'strong'].map(t => (
          <button
            key={t}
            className={`tweak-chip ${state.texture === t ? 'active' : ''}`}
            onClick={() => onChange('texture', t)}
          >{t}</button>
        ))}
      </div>
    </label>
  </div>
);

/* ---------------- Progress marker ---------------- */
const ProgressMarker = ({ stops, activeId, onPick }) => (
  <div data-progress-rail="" style={{
    position: 'fixed',
    top: '50%',
    right: 20,
    transform: 'translateY(-50%)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    background: 'rgba(245, 234, 215, 0.88)',
    backdropFilter: 'blur(6px)',
    padding: '14px 10px',
    border: '1px solid var(--parchment-deep)',
    maxHeight: '80vh',
    overflowY: 'auto',
  }}>
    {stops.map((s, i) => (
      <button
        key={s.id}
        onClick={() => onPick(s.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 9,
          color: 'var(--umber)',
          opacity: activeId === s.id ? 1 : 0.45,
          padding: '4px 2px',
          textAlign: 'left',
          transition: 'all 0.3s',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{
          width: activeId === s.id ? 18 : 10,
          height: 1,
          background: 'var(--umber)',
          transition: 'all 0.3s',
        }} />
        {String(i + 1).padStart(2, '0')} {s.place.slice(0, 10)}
      </button>
    ))}
  </div>
);

/* ---------------- App ---------------- */
const App = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [activeId, setActiveId] = useState(JOURNEY[0].id);
  const [soundPlayingId, setSoundPlayingId] = useState(null);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const chapterRefs = useRef({});

  // Apply tweaks to body classes
  useEffect(() => {
    const body = document.body;
    body.className = [
      `palette-${tweaks.palette}`,
      `type-${tweaks.typography}`,
      `density-${tweaks.density}`,
      `texture-${tweaks.texture}`,
    ].join(' ');
  }, [tweaks]);

  // Persisted state — listen to host messages
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setTweaksOpen(true);
      if (d.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Restore last scroll position
  useEffect(() => {
    const last = localStorage.getItem('mukun-journey-stop');
    if (last && chapterRefs.current[last]) {
      setTimeout(() => {
        chapterRefs.current[last].scrollIntoView({ behavior: 'instant', block: 'start' });
      }, 200);
    }
  }, []);

  const registerRef = useCallback((id, el) => {
    chapterRefs.current[id] = el;
  }, []);

  // Observe active chapter
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.dataset.stopId;
          if (id) {
            setActiveId(id);
            localStorage.setItem('mukun-journey-stop', id);
          }
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    Object.values(chapterRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToStop = useCallback((id) => {
    const el = chapterRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const handleTweakChange = (key, value) => {
    const next = { ...tweaks, [key]: value };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
  };

  const handleBegin = () => {
    document.getElementById('atlas').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onBegin={handleBegin} isMobile={isMobile} />
      <MapSection
        stops={JOURNEY}
        activeId={activeId}
        onPinClick={setActiveId}
        scrollToStop={scrollToStop}
      />

      <div style={{ position: 'relative' }}>
        {JOURNEY.map((stop, i) => (
          <React.Fragment key={stop.id}>
            <Chapter
              stop={stop}
              index={i}
              total={JOURNEY.length}
              active={activeId === stop.id}
              registerRef={registerRef}
              soundPlaying={soundPlayingId === stop.id}
              onToggleSound={(id) => setSoundPlayingId(prev => prev === id ? null : id)}
              isMobile={isMobile}
            />
            {i < JOURNEY.length - 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '-40px 0',
                color: 'var(--clay)',
              }}>
                <svg width="40" height="120" viewBox="0 0 40 120">
                  <path
                    d="M 20 0 Q 30 30 15 60 Q 8 90 20 120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    opacity="0.6"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <Closing isMobile={isMobile} />

      {!isMobile && <ProgressMarker
        stops={JOURNEY}
        activeId={activeId}
        onPick={scrollToStop}
      />}

      <TweaksPanel
        open={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        state={tweaks}
        onChange={handleTweakChange}
      />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
