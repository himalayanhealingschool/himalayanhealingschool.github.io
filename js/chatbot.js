/* ═══════════════════════════════════════════════
   Himalayan Healing School — Sacred Chat Assistant
   Agentic: WhatsApp · Email · Scroll — no backend
═══════════════════════════════════════════════ */

const WA_NUMBER = "918860929094";
const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;
const IG_URL    = "https://www.instagram.com/himalayanhealingschool/";

const WA_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" style="vertical-align:-2px;margin-right:4px"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

const MAIL_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;

const WAVE_SVG = `<svg viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="20">
  <rect x="0"  y="10" width="4" height="8"  rx="2" fill="rgba(245,200,66,0.7)"/>
  <rect x="6"  y="5"  width="4" height="18" rx="2" fill="rgba(245,200,66,0.9)"/>
  <rect x="12" y="0"  width="4" height="28" rx="2" fill="#f5c842"/>
  <rect x="18" y="4"  width="4" height="20" rx="2" fill="rgba(245,200,66,0.95)"/>
  <rect x="24" y="8"  width="4" height="12" rx="2" fill="rgba(245,200,66,0.75)"/>
  <rect x="30" y="11" width="4" height="6"  rx="2" fill="rgba(245,200,66,0.5)"/>
</svg>`;

const AVATAR_SVG = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
  <defs>
    <radialGradient id="ag" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#3b0764"/>
    </radialGradient>
  </defs>
  <circle cx="20" cy="20" r="19.5" fill="url(#ag)" stroke="rgba(245,200,66,0.8)" stroke-width="1.2"/>
  <text x="20" y="27" text-anchor="middle" font-family="serif" font-size="21" fill="rgba(245,200,66,0.95)">ॐ</text>
</svg>`;

const BOT = {
  name: "Ananya",
  avatar: AVATAR_SVG,
  greeting: "Welcome to Himalayan Healing School 🙏\n\nWhat is your soul seeking right now?",
  typingDelay: 700,
};

/* ── WhatsApp pre-filled messages ── */
const WA = {
  sound:      WA_BASE + encodeURIComponent("Namaste Mukun! 🙏 I'm interested in a Sound Healing session. Could you share more details?"),
  breath:     WA_BASE + encodeURIComponent("Namaste Mukun! 🌊 I'd love to book a Breathwork session. When are you available?"),
  course:     WA_BASE + encodeURIComponent("Namaste Mukun! 📜 I'd like to learn more about your Sound Healing certification courses. Could you help?"),
  booking:    WA_BASE + encodeURIComponent("Namaste Mukun! 🙏 I'd like to book a session with you. What are the next available dates?"),
  pricing:    WA_BASE + encodeURIComponent("Namaste Mukun! 💜 Could you share the pricing for your sessions and courses?"),
  retreat:    WA_BASE + encodeURIComponent("Namaste Mukun! 🏔️ I'm interested in your retreat programmes in Rishikesh. Please share details!"),
  online:     WA_BASE + encodeURIComponent("Namaste Mukun! 💻 I'm interested in online sessions. What's available remotely?"),
  intl:       WA_BASE + encodeURIComponent("Namaste Mukun! 🌍 I'm an international student interested in visiting Rishikesh. Can we talk?"),
  general:    WA_BASE + encodeURIComponent("Namaste Mukun! 🙏 I found you through your website and would love to connect."),
};

const QUICK_REPLIES = [
  "What is sound healing?",
  "Tell me about the courses",
  "How do I book a session?",
  "Where are you located?",
  "Do you teach online?",
];

/* ── action shape: { label, type: 'wa'|'scroll'|'link', target, icon? } ── */
const KB = [
  {
    keys: ["sound healing", "tibetan", "singing bowl", "bowl", "what is sound", "how does sound"],
    reply: `Sound healing is an ancient Himalayan practice that uses the vibrational frequencies of Tibetan Singing Bowls, Crystal Bowls, Gongs, Tuning Forks, and Mantra Chanting to restore harmony in the body and mind.\n\nMukun uses these sacred instruments to:\n🎶 Release stress & tension\n🌊 Balance your chakras & energy\n✨ Deepen meditation & awareness\n💜 Support emotional healing\n\nEach session is unique — the sound finds what you need. 🙏`,
    actions: [
      { label: "Book via WhatsApp",   type: "wa",     target: WA.sound,   icon: "wa" },
      { label: "See Offerings ↓",     type: "scroll", target: "#modalities" },
    ],
  },
  {
    keys: ["breathwork", "breath", "pranayama", "breathing", "conscious breath"],
    reply: `Conscious Breathwork is one of the most powerful healing tools available to us — and it's always with you.\n\nMukun's breathwork sessions combine:\n◎ Ancient pranayama techniques\n◎ Conscious connected breathing\n◎ Breath awareness & release\n\nBenefits reported by students include deep emotional releases, reduced anxiety, increased energy, and profound clarity. 🌊\n\nSessions are available 1:1 or in groups.`,
    actions: [
      { label: "Book via WhatsApp",   type: "wa",     target: WA.breath,  icon: "wa" },
      { label: "Feel the Breath ↓",   type: "scroll", target: "#breathe" },
    ],
  },
  {
    keys: ["course", "certification", "level 1", "level 2", "master", "training", "learn", "study", "program", "curriculum"],
    reply: `Himalayan Healing School offers internationally recognised certification programmes:\n\n📜 Sound Healing Certificate — Level 1\nFoundations of Tibetan & Crystal bowl practice, theory of sound & vibration, practical hands-on sessions.\n\n📜 Sound Healing Certificate — Level 2\nAdvanced techniques, Gongs, Tuning Forks, group facilitation, building your practice.\n\n🏆 Master Sound Healing Certificate\nComprehensive mastery programme held in Rishikesh. Graduates from India, Europe, Asia & beyond.`,
    actions: [
      { label: "Enquire via WhatsApp", type: "wa",     target: WA.course,  icon: "wa" },
      { label: "View Certifications ↓",type: "scroll", target: "#certification" },
    ],
  },
  {
    keys: ["book", "booking", "appointment", "session", "reserve", "schedule", "availability"],
    reply: `To book a session or course with Mukun, the fastest way is WhatsApp — she personally responds to all enquiries! 🙏\n\nMukun offers:\n🎶 1:1 Sound Healing Sessions\n🌬️ 1:1 Breathwork Sessions\n👥 Group Sound Baths\n🎓 Certification Courses\n🌍 International Retreats\n\nOr use the contact form below if you prefer email.`,
    actions: [
      { label: "WhatsApp Mukun Now",  type: "wa",     target: WA.booking, icon: "wa" },
      { label: "Contact Form ↓",      type: "scroll", target: "#connect" },
    ],
  },
  {
    keys: ["price", "cost", "fee", "how much", "rate", "pricing", "charge"],
    reply: `Pricing varies depending on session type, duration, group size, and location.\n\nMukun believes healing should be accessible — feel free to ask about sliding scale options. 💜\n\nFor a quick quote, WhatsApp is the fastest route — she typically responds within a few hours!`,
    actions: [
      { label: "Ask Pricing via WhatsApp", type: "wa",     target: WA.pricing,  icon: "wa" },
      { label: "Send Email ↓",             type: "scroll", target: "#connect" },
    ],
  },
  {
    keys: ["location", "where", "rishikesh", "india", "address", "place", "studio"],
    reply: `Mukun is based in Rishikesh, India — the world capital of yoga and spiritual practice, nestled in the Himalayan foothills on the banks of the sacred Ganga. 🏔️\n\nIn-person sessions & courses happen here, and students travel from all over the world to attend.\n\nMukun also travels internationally for workshops and courses across Europe and Asia.`,
    actions: [
      { label: "Plan Your Visit via WhatsApp", type: "wa",     target: WA.general, icon: "wa" },
    ],
  },
  {
    keys: ["online", "virtual", "zoom", "remote", "distance", "from home"],
    reply: `Yes! Mukun offers online sessions and courses for students who can't travel to Rishikesh. 💻\n\n💻 Online 1:1 sound healing sessions\n💻 Online breathwork sessions\n📚 Online course modules\n\nMany certified graduates completed online components before visiting Rishikesh for in-person practical training.\n\nReach out to discuss what's possible for you!`,
    actions: [
      { label: "Ask About Online Sessions", type: "wa", target: WA.online, icon: "wa" },
    ],
  },
  {
    keys: ["international", "europe", "travel", "abroad", "foreign", "student from"],
    reply: `Himalayan Healing School warmly welcomes international students! 🌍\n\nPast students have come from:\n🇪🇺 Europe (Czech Republic, France, Switzerland, Spain)\n🌏 Asia & beyond\n🇮🇳 Across India\n\nFor international students, Mukun can help with:\n📋 Course scheduling around your travel\n🏡 Accommodation recommendations in Rishikesh\n🎓 Internationally recognised certificates`,
    actions: [
      { label: "Connect as Int'l Student", type: "wa",  target: WA.intl,    icon: "wa" },
      { label: "View Certifications ↓",   type: "scroll", target: "#certification" },
    ],
  },
  {
    keys: ["yoga", "meditation", "mindfulness", "chakra", "energy"],
    reply: `Beyond sound healing and breathwork, Mukun is also a dedicated Yoga Practitioner and Energy Work facilitator.\n\nHer approach weaves together:\n🧘 Hatha & alignment-based yoga\n✦ Chakra balancing & energy work\n◎ Mantra & sacred sound practices\n🌿 Himalayan wisdom traditions\n\nThese practices support each other beautifully — many students find that sound healing deepens their yoga practice. 💜`,
    actions: [
      { label: "Explore Sessions via WhatsApp", type: "wa",     target: WA.general, icon: "wa" },
      { label: "See All Offerings ↓",           type: "scroll", target: "#modalities" },
    ],
  },
  {
    keys: ["prepare", "bring", "wear", "first time", "new to", "never tried", "beginner", "what to expect"],
    reply: `Welcome, first-timer! Here's what to expect: 🙏\n\n✅ Wear comfortable, loose clothing\n✅ Bring a water bottle\n✅ Arrive with an open heart\n✅ Sessions typically last 60–90 minutes\n✅ You'll lie down or sit comfortably\n✅ No experience needed — the sound does the work!\n\nMany people feel deeply relaxed, some experience emotional releases, others drift into a beautiful meditative state. Every journey is unique.`,
    actions: [
      { label: "Book a First Session",  type: "wa",     target: WA.booking, icon: "wa" },
    ],
  },
  {
    keys: ["testimonial", "review", "result", "experience", "story", "feedback", "worked", "benefit"],
    reply: `Here's what students say about their experience with Mukun:\n\n💬 "I feel very confident working with the bowls now. It's been a pleasure to have learned and shared." — Camila, Sound Healing Graduate\n\n💬 "I am still carrying such a wonderful atmosphere. Everything was professional." — @krasadlouhovekosti, Czech Republic\n\n💬 "It created a beautiful and harmonious whole that uplifted both my soul and body." — Workshop Participant\n\nThousands in the community have been touched by Mukun's work. 💜`,
    actions: [
      { label: "Read More Stories ↓",   type: "scroll", target: "#testimonials" },
      { label: "Start Your Journey",    type: "wa",     target: WA.general, icon: "wa" },
    ],
  },
  {
    keys: ["retreat", "immersive", "intensive", "residential"],
    reply: `Himalayan Healing School runs immersive retreat experiences in Rishikesh — combining sound healing, breathwork, yoga, and the transformative energy of the Himalayas. 🏔️\n\nThese retreats are ideal for:\n🌿 Deep personal healing & reset\n🎓 Intensive certification training\n🌍 International students visiting India\n\nDates vary seasonally.`,
    actions: [
      { label: "Enquire About Retreats", type: "wa",     target: WA.retreat, icon: "wa" },
      { label: "Upcoming Sessions ↓",   type: "scroll", target: "#upcoming" },
    ],
  },
  {
    keys: ["instagram", "social", "follow", "community"],
    reply: `Stay connected with Mukun's healing journey! 💜\n\n📷 Instagram: @himalayanhealingschool\n📷 Personal: @mukunverma\n\nMukun shares healing sounds, breathwork tips, student stories, and upcoming events regularly. A warm community of 6K+ members! 🏔️`,
    actions: [
      { label: "Follow on Instagram →", type: "link", target: IG_URL },
      { label: "WhatsApp Mukun",         type: "wa",   target: WA.general, icon: "wa" },
    ],
  },
  {
    keys: ["whatsapp", "contact", "reach", "message", "email", "talk to"],
    reply: `The best ways to reach Mukun:\n\n📱 WhatsApp — fastest, personal response\n📷 Instagram DM: @himalayanhealingschool\n📧 Contact form on this page\n\nMukun personally responds to all enquiries — usually within 24 hours. 🙏`,
    actions: [
      { label: "Open WhatsApp Now",  type: "wa",     target: WA.general,  icon: "wa" },
      { label: "Contact Form ↓",     type: "scroll", target: "#connect" },
    ],
  },
  {
    keys: ["hi", "hello", "namaste", "hey", "hola", "bonjour"],
    reply: `Namaste! 🙏 So wonderful to connect with you.\n\nI'm here to guide you through Mukun's healing offerings. What would you like to explore?\n\n🎶 Sound Healing sessions or courses\n🌬️ Breathwork facilitation\n🎓 Certification programmes\n🏔️ Retreats in Rishikesh`,
  },
  {
    keys: ["thank", "thanks", "helpful", "great", "wonderful", "amazing"],
    reply: `That warms my heart! 💜 Mukun's mission is to make healing accessible and transformative for everyone.\n\nWhenever you're ready to begin your journey, reach out — Mukun would love to hear from you! 🙏\n\nNamaste ✦`,
    actions: [
      { label: "Connect with Mukun",  type: "wa",  target: WA.general, icon: "wa" },
    ],
  },
];

const FALLBACK = `I'm not sure I have that specific answer, but Mukun will! 🙏\n\nFor personalised guidance, reach out directly — she responds within 24 hours.`;
const FALLBACK_ACTIONS = [
  { label: "WhatsApp Mukun",    type: "wa",     target: WA.general,  icon: "wa" },
  { label: "Contact Form ↓",   type: "scroll", target: "#connect" },
];

/* ═══ DOM BUILD ═══ */
function buildChat() {
  const el = document.createElement("div");
  el.id = "hhs-chat";
  el.innerHTML = `
    <div id="chat-bubble" onclick="toggleChat()" title="Ask Ananya">
      <span class="chat-bubble-icon">${WAVE_SVG}</span>
      <span class="chat-bubble-pulse"></span>
      <span id="chat-notif">1</span>
    </div>
    <div id="chat-panel">
      <div id="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">${BOT.avatar}</div>
          <div>
            <div class="chat-bot-name">Himalayan Healing School</div>
            <div class="chat-bot-status"><span class="status-dot"></span>${BOT.name} — Healing Guide</div>
          </div>
        </div>
        <button class="chat-close" onclick="toggleChat()">✕</button>
      </div>
      <div id="chat-messages"></div>
      <div id="chat-quick-replies"></div>
      <a id="chat-wa-strip" href="${WA.general}" target="_blank" rel="noopener">
        ${WA_SVG} Chat on WhatsApp
      </a>
      <div id="chat-input-row">
        <input id="chat-input" type="text" placeholder="Ask about sound healing…" autocomplete="off" />
        <button id="chat-send" onclick="sendMessage()">➤</button>
      </div>
    </div>
  `;
  document.body.appendChild(el);

  document.getElementById("chat-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  setTimeout(() => addBotMessage(BOT.greeting, buildQuickReplies), 800);
}

/* ═══ TOGGLE ═══ */
let chatOpen = false;
window.toggleChat = function () {
  chatOpen = !chatOpen;
  document.getElementById("chat-panel").classList.toggle("open", chatOpen);
  document.getElementById("chat-notif").style.display = "none";
  if (chatOpen) setTimeout(() => document.getElementById("chat-input").focus(), 300);
};

/* ═══ MESSAGES ═══ */
function addBotMessage(text, cb) {
  const msgs = document.getElementById("chat-messages");

  const typing = document.createElement("div");
  typing.className = "chat-msg bot typing";
  typing.innerHTML = `<div class="chat-avatar-sm">${BOT.avatar}</div><div class="msg-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const msg = document.createElement("div");
    msg.className = "chat-msg bot";
    msg.innerHTML = `<div class="chat-avatar-sm">${BOT.avatar}</div><div class="msg-bubble">${text.replace(/\n/g, "<br/>")}</div>`;
    msgs.appendChild(msg);
    msgs.scrollTop = msgs.scrollHeight;
    if (cb) cb();
  }, BOT.typingDelay);
}

function addUserMessage(text) {
  const msgs = document.getElementById("chat-messages");
  const msg = document.createElement("div");
  msg.className = "chat-msg user";
  msg.innerHTML = `<div class="msg-bubble">${text}</div>`;
  msgs.appendChild(msg);
  msgs.scrollTop = msgs.scrollHeight;
}

/* ── Multi-action buttons ── */
function addActionButtons(actions) {
  if (!actions || !actions.length) return;
  const msgs = document.getElementById("chat-messages");
  const wrap = document.createElement("div");
  wrap.className = "chat-action-row";

  actions.forEach(a => {
    const btn = document.createElement("a");
    btn.className = "chat-action-btn" + (a.icon === "wa" ? " wa-btn" : "");
    if (a.type === "scroll") {
      btn.href = "#";
      btn.onclick = (e) => {
        e.preventDefault();
        const target = document.querySelector(a.target);
        if (target) target.scrollIntoView({ behavior: "smooth" });
        toggleChat();
      };
    } else if (a.type === "wa") {
      btn.href = a.target;
      btn.target = "_blank";
      btn.rel = "noopener";
    } else if (a.type === "link") {
      btn.href = a.target;
      btn.target = "_blank";
      btn.rel = "noopener";
    }
    btn.innerHTML = (a.icon === "wa" ? WA_SVG : a.icon === "mail" ? MAIL_SVG : "") + a.label;
    wrap.appendChild(btn);
  });

  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

/* ═══ QUICK REPLIES ═══ */
function buildQuickReplies() {
  const qr = document.getElementById("chat-quick-replies");
  qr.innerHTML = "";
  QUICK_REPLIES.forEach((q) => {
    const btn = document.createElement("button");
    btn.className = "qr-btn";
    btn.textContent = q;
    btn.onclick = () => {
      qr.innerHTML = "";
      handleInput(q);
    };
    qr.appendChild(btn);
  });
}

/* ═══ SEND ═══ */
window.sendMessage = function () {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  document.getElementById("chat-quick-replies").innerHTML = "";
  handleInput(text);
};

function handleInput(text) {
  addUserMessage(text);
  const lower = text.toLowerCase();
  let matched = null;
  for (const entry of KB) {
    if (entry.keys.some((k) => lower.includes(k))) {
      matched = entry;
      break;
    }
  }
  const reply   = matched ? matched.reply   : FALLBACK;
  const actions = matched ? matched.actions : FALLBACK_ACTIONS;
  addBotMessage(reply, () => addActionButtons(actions));
}

/* ═══ INIT ═══ */
document.addEventListener("DOMContentLoaded", buildChat);
