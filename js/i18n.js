/* ═══════════════════════════════════════════════
   Himalayan Healing School — Language Toggle
   Supports: EN · CZ · FR · ES · IT
═══════════════════════════════════════════════ */

const LANGS = {
  en: {
    flag: "🇬🇧", label: "EN",
    // NAV
    "nav.about":       "About",
    "nav.offerings":   "Offerings",
    "nav.gallery":     "Gallery",
    "nav.experience":  "Experience",
    "nav.stories":     "Stories",
    "nav.faq":         "FAQ",
    "nav.book":        "Book Now",
    // HERO
    "hero.eyebrow":    "✦ Welcome to a sacred space ✦",
    "hero.title":      "Himalayan<br/>Healing<br/>School",
    "hero.founder":    "Mukun Verma",
    "hero.role1":      "Sound Healer",
    "hero.role2":      "Breathwork",
    "hero.role3":      "Energy Work",
    "hero.role4":      "Yoga",
    "hero.badge1":     "◈ Sound Healing",
    "hero.badge2":     "◎ Breathwork",
    "hero.badge3":     "◈ Meditation",
    "hero.badge4":     "◎ Energy Work",
    "hero.cta1":       "Book a Session",
    "hero.cta2":       "Explore Offerings",
    // ABOUT
    "about.label":     "Your Guide",
    "about.title":     "Teacher &amp; Facilitator<br/>of Sacred Arts",
    // SECTIONS
    "sec.offerings":   "Sacred Offerings",
    "sec.gallery":     "Gallery",
    "sec.breathe":     "Feel the Breath",
    "sec.stories":     "Voices of Transformation",
    "sec.stories.sub": "Healing Stories",
    "sec.cert":        "Train &amp; Graduate",
    "sec.faq":         "Frequently Asked",
    "sec.faq.sub":     "Got Questions?",
    "sec.connect":     "Begin Your Journey",
    "sec.connect.sub": "Book a Session",
    // CTA
    "cta.book":        "Book a Session",
    "cta.follow":      "Follow the Journey →",
  },

  cz: {
    flag: "🇨🇿", label: "CZ",
    "nav.about":       "O Mukun",
    "nav.offerings":   "Nabídka",
    "nav.gallery":     "Galerie",
    "nav.experience":  "Zážitek",
    "nav.stories":     "Příběhy",
    "nav.faq":         "Otázky",
    "nav.book":        "Rezervovat",
    "hero.eyebrow":    "✦ Vítejte ve svatém prostoru ✦",
    "hero.title":      "Himalájská<br/>Léčebná<br/>Škola",
    "hero.founder":    "Mukun Verma",
    "hero.role1":      "Léčitelka zvukem",
    "hero.role2":      "Dýchání",
    "hero.role3":      "Energetická práce",
    "hero.role4":      "Jóga",
    "hero.badge1":     "◈ Zvuková léčba",
    "hero.badge2":     "◎ Dechová práce",
    "hero.badge3":     "◈ Meditace",
    "hero.badge4":     "◎ Energetická práce",
    "hero.cta1":       "Rezervovat sezení",
    "hero.cta2":       "Prozkoumat nabídku",
    "about.label":     "Váš průvodce",
    "about.title":     "Učitelka &amp; Facilitátorka<br/>Posvátných umění",
    "sec.offerings":   "Posvátná nabídka",
    "sec.gallery":     "Galerie",
    "sec.breathe":     "Pocítit dech",
    "sec.stories":     "Hlasy proměny",
    "sec.stories.sub": "Léčebné příběhy",
    "sec.cert":        "Absolvujte u Mukun",
    "sec.faq":         "Časté otázky",
    "sec.faq.sub":     "Máte otázky?",
    "sec.connect":     "Začněte cestu",
    "sec.connect.sub": "Rezervovat sezení",
    "cta.book":        "Rezervovat sezení",
    "cta.follow":      "Sledovat cestu →",
  },

  fr: {
    flag: "🇫🇷", label: "FR",
    "nav.about":       "À Propos",
    "nav.offerings":   "Soins",
    "nav.gallery":     "Galerie",
    "nav.experience":  "Expérience",
    "nav.stories":     "Témoignages",
    "nav.faq":         "FAQ",
    "nav.book":        "Réserver",
    "hero.eyebrow":    "✦ Bienvenue dans un espace sacré ✦",
    "hero.title":      "École de<br/>Guérison<br/>Himalayenne",
    "hero.founder":    "Mukun Verma",
    "hero.role1":      "Thérapeute sonore",
    "hero.role2":      "Respiration",
    "hero.role3":      "Travail énergétique",
    "hero.role4":      "Yoga",
    "hero.badge1":     "◈ Guérison sonore",
    "hero.badge2":     "◎ Breathwork",
    "hero.badge3":     "◈ Méditation",
    "hero.badge4":     "◎ Énergie",
    "hero.cta1":       "Réserver une séance",
    "hero.cta2":       "Découvrir les soins",
    "about.label":     "Votre guide",
    "about.title":     "Enseignante &amp; Facilitatrice<br/>des Arts Sacrés",
    "sec.offerings":   "Soins Sacrés",
    "sec.gallery":     "Galerie",
    "sec.breathe":     "Ressentir la respiration",
    "sec.stories":     "Voix de Transformation",
    "sec.stories.sub": "Histoires de guérison",
    "sec.cert":        "Se certifier avec Mukun",
    "sec.faq":         "Questions fréquentes",
    "sec.faq.sub":     "Des questions ?",
    "sec.connect":     "Commencer le voyage",
    "sec.connect.sub": "Réserver une séance",
    "cta.book":        "Réserver une séance",
    "cta.follow":      "Suivre le voyage →",
  },

  es: {
    flag: "🇪🇸", label: "ES",
    "nav.about":       "Acerca de",
    "nav.offerings":   "Servicios",
    "nav.gallery":     "Galería",
    "nav.experience":  "Experiencia",
    "nav.stories":     "Testimonios",
    "nav.faq":         "Preguntas",
    "nav.book":        "Reservar",
    "hero.eyebrow":    "✦ Bienvenido a un espacio sagrado ✦",
    "hero.title":      "Escuela de<br/>Sanación<br/>Himalaya",
    "hero.founder":    "Mukun Verma",
    "hero.role1":      "Sanadora de sonido",
    "hero.role2":      "Respiración",
    "hero.role3":      "Trabajo energético",
    "hero.role4":      "Yoga",
    "hero.badge1":     "◈ Sanación sonora",
    "hero.badge2":     "◎ Breathwork",
    "hero.badge3":     "◈ Meditación",
    "hero.badge4":     "◎ Energía",
    "hero.cta1":       "Reservar una sesión",
    "hero.cta2":       "Ver servicios",
    "about.label":     "Tu guía",
    "about.title":     "Maestra y Facilitadora<br/>de las Artes Sagradas",
    "sec.offerings":   "Ofrendas Sagradas",
    "sec.gallery":     "Galería",
    "sec.breathe":     "Sentir la respiración",
    "sec.stories":     "Voces de Transformación",
    "sec.stories.sub": "Historias de sanación",
    "sec.cert":        "Certifícate con Mukun",
    "sec.faq":         "Preguntas frecuentes",
    "sec.faq.sub":     "¿Tienes preguntas?",
    "sec.connect":     "Comienza tu viaje",
    "sec.connect.sub": "Reservar una sesión",
    "cta.book":        "Reservar una sesión",
    "cta.follow":      "Seguir el viaje →",
  },

  it: {
    flag: "🇮🇹", label: "IT",
    "nav.about":       "Chi è Mukun",
    "nav.offerings":   "Servizi",
    "nav.gallery":     "Galleria",
    "nav.experience":  "Esperienza",
    "nav.stories":     "Testimonianze",
    "nav.faq":         "FAQ",
    "nav.book":        "Prenota",
    "hero.eyebrow":    "✦ Benvenuto in uno spazio sacro ✦",
    "hero.title":      "Scuola di<br/>Guarigione<br/>Himalayana",
    "hero.founder":    "Mukun Verma",
    "hero.role1":      "Guaritrice del suono",
    "hero.role2":      "Breathwork",
    "hero.role3":      "Lavoro energetico",
    "hero.role4":      "Yoga",
    "hero.badge1":     "◈ Guarigione sonora",
    "hero.badge2":     "◎ Breathwork",
    "hero.badge3":     "◈ Meditazione",
    "hero.badge4":     "◎ Energia",
    "hero.cta1":       "Prenota una sessione",
    "hero.cta2":       "Scopri i servizi",
    "about.label":     "La tua guida",
    "about.title":     "Insegnante &amp; Facilitatrice<br/>delle Arti Sacre",
    "sec.offerings":   "Offerte Sacre",
    "sec.gallery":     "Galleria",
    "sec.breathe":     "Senti il respiro",
    "sec.stories":     "Voci di Trasformazione",
    "sec.stories.sub": "Storie di guarigione",
    "sec.cert":        "Formati con Mukun",
    "sec.faq":         "Domande frequenti",
    "sec.faq.sub":     "Hai domande?",
    "sec.connect":     "Inizia il tuo viaggio",
    "sec.connect.sub": "Prenota una sessione",
    "cta.book":        "Prenota una sessione",
    "cta.follow":      "Segui il viaggio →",
  },
};

let currentLang = "en";

function applyLang(code) {
  currentLang = code;
  const t = LANGS[code];
  if (!t) return;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Update all lang trigger buttons (desktop + mobile bar)
  const btnHTML = `${t.flag} <span>${t.label}</span> <svg viewBox="0 0 10 6" width="9" height="6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  document.querySelectorAll(".lang-trigger-btn").forEach(btn => { btn.innerHTML = btnHTML; });

  // Close all dropdowns
  document.querySelectorAll("#lang-menu, #lang-menu-mobile").forEach(m => m.classList.remove("open"));

  try { localStorage.setItem("hhs-lang", code); } catch(e) {}
}

function buildLangToggle() {
  const nav = document.querySelector(".nav-links");
  if (!nav) return;

  const optionsHTML = Object.entries(LANGS).map(([code, l]) =>
    `<li><button onclick="applyLang('${code}')">${l.flag} ${l.label}</button></li>`
  ).join("");

  // ── Desktop dropdown (inside nav-links) ──
  const desktopWrapper = document.createElement("li");
  desktopWrapper.className = "lang-dropdown-wrap lang-desktop";
  desktopWrapper.innerHTML = `
    <button class="lang-trigger-btn" id="lang-trigger" onclick="toggleLangMenu(event,'lang-menu')">
      🇬🇧 <span>EN</span>
      <svg viewBox="0 0 10 6" width="9" height="6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
    <ul id="lang-menu">${optionsHTML}</ul>`;
  nav.appendChild(desktopWrapper);

  // ── Mobile bar dropdown (already in HTML, just populate the <ul>) ──
  const mobileMenu = document.getElementById("lang-menu-mobile");
  if (mobileMenu) mobileMenu.innerHTML = optionsHTML;

  // Close on outside click
  document.addEventListener("click", (e) => {
    const mobileBar = document.getElementById("lang-mobile-bar");
    if (!desktopWrapper.contains(e.target)) document.getElementById("lang-menu")?.classList.remove("open");
    if (mobileBar && !mobileBar.contains(e.target)) document.getElementById("lang-menu-mobile")?.classList.remove("open");
  });
}

window.toggleLangMenu = function(e, menuId) {
  e.stopPropagation();
  document.getElementById(menuId)?.classList.toggle("open");
};

document.addEventListener("DOMContentLoaded", () => {
  buildLangToggle();
  try {
    const saved = localStorage.getItem("hhs-lang");
    if (saved && LANGS[saved]) applyLang(saved);
  } catch(e) {}
});
