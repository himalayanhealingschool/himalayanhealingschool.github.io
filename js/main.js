/* ══════════════════════════════════════════════════════
   HIMALAYAN HEALING SCHOOL — main.js v2
══════════════════════════════════════════════════════ */

/* ─── FLOATING PARTICLES ─── */
(function () {
  const canvas = document.getElementById('particles-layer');
  const ctx = canvas.getContext('2d');
  let W, H;
  const pts = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 65; i++) {
    pts.push({ x: Math.random()*1920, y: Math.random()*1080, r: Math.random()*2+0.4,
      vx: (Math.random()-.5)*.28, vy: (Math.random()-.5)*.28,
      a: Math.random()*.4+.07, hue: Math.random()>.5?270:45 });
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${p.hue},80%,75%,${p.a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─── HERO SOUND WAVES ─── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;
  function resize() {
    const hero = document.getElementById('hero');
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const waves = [
    { amp:50, freq:.005, phase:0,   alpha:.13, color:'168,85,247' },
    { amp:30, freq:.008, phase:1.6, alpha:.08, color:'245,200,66' },
    { amp:65, freq:.0035,phase:3,   alpha:.07, color:'216,180,254' },
    { amp:25, freq:.011, phase:.9,  alpha:.11, color:'168,85,247' },
  ];
  function draw() {
    ctx.clearRect(0,0,W,H);
    waves.forEach(w => {
      ctx.beginPath();
      for(let x=0;x<=W;x+=3){
        const y = H/2
          + Math.sin(x*w.freq + t*.8  + w.phase) * w.amp
          + Math.sin(x*w.freq*2 + t*1.1 + w.phase) * w.amp*.4;
        x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.strokeStyle=`rgba(${w.color},${w.alpha})`; ctx.lineWidth=2; ctx.stroke();
    });
    t+=.022; requestAnimationFrame(draw);
  }
  draw();
})();

/* ─── GALLERY LIGHTBOX ─── */
const _galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
let _lbIndex = 0;

function openLightboxAt(idx) {
  _lbIndex = (idx + _galleryItems.length) % _galleryItems.length;
  const item    = _galleryItems[_lbIndex];
  const img     = item.querySelector('img');
  const caption = item.dataset.caption || '';
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-img').alt = img.alt;
  document.getElementById('lightbox-caption').textContent = caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
  // show/hide arrows when only 1 photo
  const hasMult = _galleryItems.length > 1;
  document.getElementById('lightbox-prev').style.display = hasMult ? '' : 'none';
  document.getElementById('lightbox-next').style.display = hasMult ? '' : 'none';
}

function lightboxNav(dir) {
  openLightboxAt(_lbIndex + dir);
}

_galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightboxAt(i));
});

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
});

/* ─── BREATHING EXERCISE ─── */
let breatheActive = false, breatheTimer = null, breathePhaseIdx = 0, breatheSize = 0.4, breatheAnimId = null;
const breathePhases = [
  { label:'Inhale',  sub:'breathe in... 4s',   dur:4000, target:0.95 },
  { label:'Hold',    sub:'hold... 4s',          dur:4000, target:null },
  { label:'Exhale',  sub:'breathe out... 6s',   dur:6000, target:0.35 },
  { label:'Hold',    sub:'hold... 2s',          dur:2000, target:null },
];
function drawBreathe() {
  const canvas=document.getElementById('breathe-canvas'); if(!canvas)return;
  const ctx=canvas.getContext('2d'); const cx=160,cy=160;
  ctx.clearRect(0,0,320,320);
  const glow=ctx.createRadialGradient(cx,cy,breatheSize*120-20,cx,cy,breatheSize*120+45);
  glow.addColorStop(0,`rgba(168,85,247,${breatheSize*.42})`); glow.addColorStop(1,'rgba(168,85,247,0)');
  ctx.beginPath(); ctx.arc(cx,cy,breatheSize*120+45,0,Math.PI*2); ctx.fillStyle=glow; ctx.fill();
  const grad=ctx.createRadialGradient(cx-20,cy-20,0,cx,cy,breatheSize*120);
  grad.addColorStop(0,`rgba(216,180,254,${.55+breatheSize*.3})`);
  grad.addColorStop(.5,`rgba(168,85,247,${.4+breatheSize*.2})`);
  grad.addColorStop(1,'rgba(45,16,101,0.88)');
  ctx.beginPath(); ctx.arc(cx,cy,breatheSize*120,0,Math.PI*2); ctx.fillStyle=grad; ctx.fill();
  [1,2,3].forEach(r=>{ ctx.beginPath(); ctx.arc(cx,cy,breatheSize*120+r*22,0,Math.PI*2); ctx.strokeStyle=`rgba(168,85,247,${.07/r})`; ctx.lineWidth=1; ctx.stroke(); });
}
function animateBreatheTo(target,duration) {
  if(target===null){drawBreathe();return;}
  const start=breatheSize,diff=target-start,st=performance.now();
  function step(now){
    const p=Math.min((now-st)/duration,1);
    const ease=p<.5?2*p*p:-1+(4-2*p)*p;
    breatheSize=start+diff*ease; drawBreathe();
    if(p<1) breatheAnimId=requestAnimationFrame(step);
  }
  if(breatheAnimId) cancelAnimationFrame(breatheAnimId);
  breatheAnimId=requestAnimationFrame(step);
}
function runBreathePhase(){
  if(!breatheActive)return;
  const ph=breathePhases[breathePhaseIdx];
  document.getElementById('breathe-label').textContent=ph.label;
  document.getElementById('breathe-sub').textContent=ph.sub;
  animateBreatheTo(ph.target,ph.dur);
  breatheTimer=setTimeout(()=>{ breathePhaseIdx=(breathePhaseIdx+1)%breathePhases.length; runBreathePhase(); },ph.dur);
}
function toggleBreathe(){
  const btn=document.getElementById('breathe-btn');
  breatheActive=!breatheActive;
  if(breatheActive){ btn.textContent='◼ Pause'; btn.classList.add('active'); breathePhaseIdx=0; runBreathePhase(); }
  else { btn.textContent='✦ Begin'; btn.classList.remove('active'); clearTimeout(breatheTimer);
    document.getElementById('breathe-label').textContent='Paused';
    document.getElementById('breathe-sub').textContent='Press Begin to restart'; }
}
drawBreathe();

/* ─── MOBILE NAV ─── */
function toggleMenu(){ document.getElementById('nav-links').classList.toggle('open'); }
function closeMenu(){ document.getElementById('nav-links').classList.remove('open'); }

// Close nav when tapping anywhere outside — both click & touchstart for iOS Safari
function _closeNavIfOutside(e) {
  const nav = document.querySelector('nav');
  const navLinks = document.getElementById('nav-links');
  if (navLinks && navLinks.classList.contains('open') && nav && !nav.contains(e.target)) {
    navLinks.classList.remove('open');
  }
}
document.addEventListener('click', _closeNavIfOutside);
document.addEventListener('touchstart', _closeNavIfOutside, { passive: true });

/* ─── SCROLL REVEAL ─── */
const io = new IntersectionObserver(entries => {
  entries.forEach((e,i) => { if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),i*80); });
},{ threshold:.1 });
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ─── DYNAMIC FOOTER YEAR ─── */
(function(){ const el = document.getElementById('footer-year'); if(el) el.textContent = new Date().getFullYear(); })();

/* ─── STICKY NAV + SCROLL-TO-TOP ─── */
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').style.background =
    window.scrollY>60 ? 'rgba(8,4,24,0.94)' : 'rgba(8,4,24,0.72)';
  // Show scroll-to-top after 600px
  const topBtn = document.getElementById('scroll-top-btn');
  if (topBtn) topBtn.classList.toggle('visible', window.scrollY > 600);
});

/* ─── CONTACT FORM — Formspree submission ─── */
function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const endpoint = form.dataset.formspree;

  // If no Formspree ID is set yet, show a helpful message
  if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
    // Fallback: open mailto link so message still reaches Mukun
    const name    = form.querySelector('[name="name"]').value;
    const email   = form.querySelector('[name="email"]').value;
    const msg     = form.querySelector('[name="message"]').value;
    const subject = encodeURIComponent('New message from ' + name + ' — Himalayan Healing School');
    const body    = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
    window.open('mailto:vermamukun@gmail.com?subject=' + subject + '&body=' + body);
    form.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
    return;
  }

  // Formspree AJAX submission
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…'; btn.disabled = true;

  fetch(endpoint, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' },
  })
  .then(res => {
    if (res.ok) {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    } else {
      btn.textContent = 'Send Message ✦'; btn.disabled = false;
      alert('Something went wrong. Please try WhatsApp instead 🙏');
    }
  })
  .catch(() => {
    btn.textContent = 'Send Message ✦'; btn.disabled = false;
    alert('Could not send. Please try WhatsApp instead 🙏');
  });
}

/* ═══ NEWSLETTER — WhatsApp subscribe ═══ */
window.handleNewsletter = function(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value.trim();
  if (!email) return;
  const msg = encodeURIComponent('Namaste Mukun! 🙏 Please add me to your updates list.\nMy email: ' + email);
  window.open('https://wa.me/918860929094?text=' + msg, '_blank');
  document.getElementById('newsletter-email').value = '';
  const btn = e.target.querySelector('button');
  const orig = btn.textContent;
  btn.textContent = '✓ Sent to WhatsApp!';
  setTimeout(() => { btn.textContent = orig; }, 3000);
};

/* ═══ FAQ ACCORDION ═══ */
window.toggleFaq = function(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
};

/* ═══ HERO ROTATING TEXT ═══ */
(function() {
  const words = ["Sound", "Breath", "Energy", "Sacred", "Healing", "Frequency"];
  let wi = 0, ci = 0, deleting = false;
  const el = document.getElementById("hero-rotate");
  if (!el) return;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 95);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 55);
    }
  }
  setTimeout(tick, 1200);
})();

/* ═══ SACRED BLOOM — mandala rings + starburst + scatter twinkles ═══ */
(function() {
  const canvas = document.getElementById('spark-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, rafId = null, sparkRunning = false;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  /* ── Particle factory ── */
  function makeParticle(cx, cy) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 2.5;
    const isStar = Math.random() > 0.55;
    const palette = [
      'rgba(245,200,66,',   // gold
      'rgba(253,230,128,',  // pale gold
      'rgba(168,85,247,',   // purple
      'rgba(232,121,249,',  // pink-purple
      'rgba(216,180,254,',  // lilac
      'rgba(255,255,255,',  // white
    ];
    return {
      x: cx + (Math.random()-0.5)*30, y: cy + (Math.random()-0.5)*30,
      vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed - Math.random()*2.5,
      r: Math.random()*4.5 + 1.5,
      life: 1, decay: Math.random()*0.009 + 0.005,
      color: palette[Math.floor(Math.random()*palette.length)],
      isStar,
    };
  }

  /* ── Draw 4-point sparkle star ── */
  function drawStar(x, y, r, alpha, color) {
    ctx.save(); ctx.translate(x, y);
    for (let arm = 0; arm < 2; arm++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.moveTo(-r * 3, 0); ctx.lineTo(r * 3, 0);
      ctx.strokeStyle = color + (alpha * 0.9) + ')';
      ctx.lineWidth = Math.max(0.5, r * 0.55);
      ctx.stroke();
    }
    ctx.restore();
    // bright center dot
    ctx.beginPath(); ctx.arc(x, y, r * 0.6 * alpha, 0, Math.PI*2);
    ctx.fillStyle = color + (alpha) + ')'; ctx.fill();
  }

  /* ── Scatter twinkles: random star flashes across screen ── */
  let twinkles = [];
  function addTwinkles() {
    const count = 22 + Math.floor(Math.random()*12);
    for (let i = 0; i < count; i++) {
      twinkles.push({
        x: Math.random()*W, y: Math.random()*H,
        r: Math.random()*5 + 2,
        life: 1, decay: Math.random()*0.012 + 0.007,
        delay: Math.floor(Math.random()*60),
        color: Math.random()>0.5 ? 'rgba(245,200,66,' : 'rgba(216,180,254,',
      });
    }
  }

  /* ── Main bloom launch ── */
  function launchBloom() {
    if (sparkRunning) return;
    sparkRunning = true;
    if (rafId) cancelAnimationFrame(rafId);

    // Hard-reset canvas visibility without CSS transition interference
    canvas.style.transition = 'none';
    canvas.classList.remove('fade-out');
    canvas.style.opacity = '1';
    canvas.style.display = 'block';
    // Re-enable transition after browser paint
    requestAnimationFrame(() => {
      canvas.style.transition = 'opacity 1.4s ease';
    });

    const cx = W * 0.5, cy = H * 0.5;
    let particles = [], frame = 0;
    twinkles = [];
    addTwinkles();

    /* ring config: [startFrame, color, maxRadius factor, startAlpha, lineWidth] */
    const rings = [
      [0,   '#f5c842', 0.38, 0.85, 2.5],   // gold — immediate
      [10,  '#a855f7', 0.44, 0.7,  2.0],   // purple
      [22,  '#e879f9', 0.50, 0.6,  1.5],   // pink
      [38,  '#fcd34d', 0.30, 0.5,  1.0],   // pale gold inner ring
    ];

    function animate() {
      ctx.clearRect(0, 0, W, H);

      /* ── LAYER 1: Central bloom glow (frames 0–70) ── */
      if (frame < 70) {
        const t     = frame / 70;
        const ease  = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
        const gR    = 80 + ease * 220;
        const gA    = frame < 35 ? frame/35 * 0.55 : (70-frame)/35 * 0.55;
        const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, gR);
        bloom.addColorStop(0,   `rgba(245,200,66,${gA * 0.9})`);
        bloom.addColorStop(0.3, `rgba(168,85,247,${gA * 0.6})`);
        bloom.addColorStop(0.7, `rgba(45,16,101,${gA * 0.3})`);
        bloom.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(cx, cy, gR, 0, Math.PI*2);
        ctx.fillStyle = bloom; ctx.fill();
      }

      /* ── LAYER 2: Sacred expanding rings ── */
      rings.forEach(([start, color, maxFactor, startAlpha, lw]) => {
        if (frame <= start) return;
        const rp = Math.min((frame - start) / 100, 1);
        const radius = rp * Math.min(W, H) * maxFactor;
        const a = Math.max(0, startAlpha * (1 - Math.pow(rp, 0.7)));
        if (a < 0.01) return;
        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI*2);
        ctx.strokeStyle = color;
        ctx.lineWidth = lw * (1 - rp * 0.6);
        ctx.globalAlpha = a;
        ctx.stroke();
        ctx.restore();
      });

      /* ── LAYER 3: Particle burst ── */
      // Emit 120 particles over first 18 frames
      if (frame < 18) {
        const burst = frame < 5 ? 20 : frame < 10 ? 10 : 5;
        for (let i = 0; i < burst; i++) particles.push(makeParticle(cx, cy));
      }
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.055;      // gentle gravity
        p.vx *= 0.987;      // slight drag
        p.life -= p.decay;
        if (p.isStar) {
          drawStar(p.x, p.y, p.r * p.life, p.life, p.color);
        } else {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI*2);
          ctx.fillStyle = p.color + (p.life * 0.88) + ')'; ctx.fill();
          // trail
          ctx.beginPath(); ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx*4.5, p.y - p.vy*4.5);
          ctx.strokeStyle = p.color + (p.life * 0.28) + ')';
          ctx.lineWidth = p.r * 0.45; ctx.stroke();
        }
      });

      /* ── LAYER 4: Scatter twinkles across the page ── */
      twinkles = twinkles.filter(t => t.life > 0);
      twinkles.forEach(t => {
        if (frame < t.delay) return;
        t.life -= t.decay;
        drawStar(t.x, t.y, t.r * t.life, t.life * 0.75, t.color);
      });

      frame++;

      // End condition: rings done + particles gone + twinkles gone
      if (frame > 160 && particles.length === 0 && twinkles.length === 0) {
        canvas.classList.add('fade-out');
        setTimeout(() => {
          canvas.style.display = 'none';
          canvas.style.transition = 'none';
          sparkRunning = false;
        }, 1500);
        return;
      }
      rafId = requestAnimationFrame(animate);
    }
    animate();
  }

  // Fire on load, then every 18 seconds
  window.addEventListener('load', () => {
    setTimeout(launchBloom, 800);
  });
  setInterval(() => {
    sparkRunning = false; // safety reset in case of stale state
    launchBloom();
  }, 8000); // every 8 seconds
})();

/* ═══ TESTIMONIALS CAROUSEL ═══ */
(function() {
  const slides = Array.from(document.querySelectorAll('.testi-slide'));
  const dots   = Array.from(document.querySelectorAll('.testi-dot'));
  if (!slides.length) return;
  let current = 0, timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = ((n % slides.length) + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5500);
  }

  window.testeSlide = (dir) => goTo(current + dir);
  window.testeGoTo  = goTo;
  timer = setInterval(() => goTo(current + 1), 5500);
})();

/* ═══ OM AMBIENT SOUND ═══ */
let omCtx = null, omMaster = null, omOscs = [], omActive = false, omLfo = null;

function toggleOM() {
  const btn = document.getElementById('om-btn');
  if (!omActive) {
    omCtx   = omCtx || new (window.AudioContext || window.webkitAudioContext)();
    omMaster = omCtx.createGain();
    omMaster.gain.setValueAtTime(0, omCtx.currentTime);
    omMaster.connect(omCtx.destination);

    // OM / Himalayan bowl frequencies: 136.1 Hz (Earth) + harmonics
    [[136.1, 0.28], [272.2, 0.14], [408.3, 0.07], [544.4, 0.04]].forEach(([freq, vol]) => {
      const osc = omCtx.createOscillator();
      const g   = omCtx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      g.gain.value = vol;
      osc.connect(g); g.connect(omMaster);
      osc.start(); omOscs.push(osc);
    });

    // Slow amplitude swell: 0→0.7 over 3s
    omMaster.gain.linearRampToValueAtTime(0.7, omCtx.currentTime + 3);
    omActive = true;
    btn.classList.add('active');
    btn.title = 'Stop OM ambient';
  } else {
    omMaster.gain.linearRampToValueAtTime(0, omCtx.currentTime + 2);
    setTimeout(() => { omOscs.forEach(o => o.stop()); omOscs = []; }, 2500);
    omActive = false;
    btn.classList.remove('active');
    btn.title = 'Play OM ambient';
  }
}
