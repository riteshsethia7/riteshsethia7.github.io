/* =========================================================================
   COZY CAT CAFÉ — script.js
   Loads the menu from data.json, builds the cards, and drives every
   interactive bit: the cats, hover/click delight effects and easter eggs.
   ========================================================================= */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------------------
     Fallback copy of data.json.
     fetch() of a local file is blocked by CORS when index.html is opened
     directly as file:// (no dev server), so if the fetch fails we fall
     back to this identical data instead of leaving the menu empty.
     ----------------------------------------------------------------------- */
  const FALLBACK_DATA = {
    title: 'App Café',
    subtitle: 'Cute apps made with ❤️',
    apps: [
      { name: 'StampIt', logo: 'assets/logos/stampit.png', playstore: 'https://play.google.com/store/apps/details?id=com.brokenheartware.stampit&hl=en&gl=us' },
      { name: 'Gobblet Gobblers', logo: 'assets/logos/gobblet-gobblers.png', playstore: 'https://play.google.com/store/apps/details?id=com.broken_heartware.gobblet_gobbler&hl=en&gl=us' },
      { name: 'PathBlock – Quoridor Strategy', logo: 'assets/logos/quoridor.png', playstore: 'https://play.google.com/store/apps/details?id=com.ritbro.quoridor&hl=en&gl=us' },
      { name: 'TambolaHousie Number Generator', logo: 'assets/logos/tambola.png', playstore: 'https://play.google.com/store/apps/details?id=com.broken_heartware.tmabola&hl=en&gl=us' },
      { name: 'Guess the Flag World Quiz Rush', logo: 'assets/logos/flag-quiz.png', playstore: 'https://play.google.com/store/apps/details?id=com.ritbro.flag_master_quiz&hl=en&gl=us' }
    ]
  };

  const fxLayer = document.getElementById('fx-layer');

  /* =======================================================================
     DATA LOADING + CARD BUILDING
     ======================================================================= */
  async function loadMenuData() {
    try {
      const res = await fetch('data.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('bad response');
      return await res.json();
    } catch (err) {
      return FALLBACK_DATA;
    }
  }

  function buildCards(data) {
    const titleEl = document.getElementById('site-title');
    const subtitleEl = document.getElementById('site-subtitle');
    if (data.title) { titleEl.textContent = data.title; document.title = data.title + ' — Cute Apps Made With Love'; }
    if (data.subtitle) subtitleEl.textContent = data.subtitle;

    const list = document.getElementById('card-list');
    const template = document.getElementById('card-template');
    const apps = Array.isArray(data.apps) ? data.apps : [];

    apps.forEach((app) => {
      const node = template.content.cloneNode(true);
      const li = node.querySelector('.card');
      const logo = node.querySelector('.card-logo');
      const name = node.querySelector('.card-name');
      const paw = node.querySelector('.paw-btn');

      logo.src = app.logo;
      logo.alt = '';
      name.textContent = app.name;
      paw.href = app.playstore;
      paw.setAttribute('aria-label', `Open ${app.name} on Google Play`);

      // whole-card click: sparkle burst of delight, then open the Play Store
      // (the paw button's own click handler stops propagation, so this
      // never double-fires when the paw itself is clicked)
      li.addEventListener('click', (e) => {
        spawnSparkles(e.clientX, e.clientY);
        window.open(app.playstore, '_blank', 'noopener,noreferrer');
      });
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          spawnSparkles(...cardCenter(li));
          window.open(app.playstore, '_blank', 'noopener,noreferrer');
        }
      });

      // paw button: heart burst, then it navigates to the Play Store as normal
      paw.addEventListener('click', (e) => {
        e.stopPropagation();
        spawnHearts(e.clientX, e.clientY);
      });

      list.appendChild(node);
    });
  }

  function cardCenter(li) {
    const r = li.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  }

  /* =======================================================================
     FX LAYER — hearts, sparkles, paw rain, floating petals
     ======================================================================= */
  function spawnFx(el, x, y) {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    fxLayer.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
    // safety net in case animationend never fires (e.g. reduced motion)
    setTimeout(() => el.remove(), 2500);
  }

  function spawnHearts(x, y) {
    if (prefersReducedMotion) return;
    const count = 6;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('span');
      heart.className = 'fx-heart';
      heart.textContent = '💗';
      const angle = (Math.random() - 0.5) * 90;
      heart.style.setProperty('--dx', `${Math.sin(angle * Math.PI / 180) * 50}px`);
      heart.style.setProperty('--dr', `${(Math.random() - 0.5) * 40}deg`);
      heart.style.animationDelay = `${i * 40}ms`;
      spawnFx(heart, x + (Math.random() - 0.5) * 20 - 8, y - 10);
    }
  }

  function spawnSparkles(x, y) {
    if (prefersReducedMotion) return;
    const count = 5;
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'fx-sparkle';
      sparkle.textContent = '✨';
      const angle = Math.random() * Math.PI * 2;
      const dist = 24 + Math.random() * 24;
      sparkle.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      sparkle.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      sparkle.style.animationDelay = `${i * 30}ms`;
      spawnFx(sparkle, x - 6, y - 6);
    }
  }

  function spawnPawRain(durationMs = 3000) {
    if (prefersReducedMotion) return;
    const end = Date.now() + durationMs;
    (function drop() {
      if (Date.now() > end) return;
      const paw = document.createElement('span');
      paw.className = 'fx-paw';
      paw.textContent = '🐾';
      paw.style.fontSize = `${16 + Math.random() * 14}px`;
      paw.style.left = `${Math.random() * window.innerWidth}px`;
      paw.style.animationDuration = `${1.6 + Math.random()}s`;
      fxLayer.appendChild(paw);
      paw.addEventListener('animationend', () => paw.remove());
      setTimeout(drop, 90);
    })();
  }

  function spawnPetal() {
    if (prefersReducedMotion) return;
    const petal = document.createElement('span');
    petal.className = 'fx-petal';
    petal.style.left = `${Math.random() * window.innerWidth}px`;
    petal.style.animationDuration = `${9 + Math.random() * 6}s`;
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    fxLayer.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove());
  }

  function startPetalDrift() {
    if (prefersReducedMotion) return;
    setInterval(spawnPetal, 3200);
  }

  /* =======================================================================
     MOCHI — sleeping cat at the bottom of the phone. Click to wake her up.
     ======================================================================= */
  function setupMochi() {
    const mount = document.getElementById('mochi-mount');
    const mochi = document.getElementById('mochi');
    let waking = false;

    function wake() {
      if (waking) return;
      waking = true;
      mochi.classList.add('awake');
      setTimeout(() => {
        mochi.classList.remove('awake');
        waking = false;
      }, 2200);
    }

    mount.addEventListener('click', wake);
    mount.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); wake(); }
    });
  }

  /* =======================================================================
     LATTE — walks along the bottom edge, pauses to look around,
     and chases the cursor for a few seconds when you press "C".
     ======================================================================= */
  function setupLatte() {
    const svg = document.getElementById('latte');
    const wrap = document.getElementById('latte-wrap');
    const CAT_WIDTH = 96;

    let x = -CAT_WIDTH;
    let dir = 1;
    const speed = 0.045; // px per ms
    let mode = 'walking'; // walking | paused | chasing
    let pauseUntil = 0;
    let chaseUntil = 0;
    let mouseX = window.innerWidth / 2;
    let lastTs = null;

    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; });

    function maybeStartPause(now) {
      if (mode === 'walking' && Math.random() < 0.0035) {
        mode = 'paused';
        svg.classList.add('paused');
        pauseUntil = now + 1200 + Math.random() * 1800;
      }
    }

    function frame(ts) {
      if (lastTs === null) lastTs = ts;
      const dt = Math.min(ts - lastTs, 50);
      lastTs = ts;
      const now = ts;
      const maxX = window.innerWidth;

      if (mode === 'chasing') {
        if (now > chaseUntil) {
          mode = 'walking';
        } else {
          const target = mouseX - CAT_WIDTH / 2;
          dir = target > x ? 1 : -1;
          x += dir * speed * 1.8 * dt;
        }
      } else if (mode === 'paused') {
        if (now > pauseUntil) {
          mode = 'walking';
          svg.classList.remove('paused');
        }
      } else {
        maybeStartPause(now);
        x += dir * speed * dt;
        if (x > maxX) { dir = -1; x = maxX; }
        if (x < -CAT_WIDTH) { dir = 1; x = -CAT_WIDTH; }
      }

      wrap.style.transform = `translateX(${x}px) scaleX(${dir})`;
      requestAnimationFrame(frame);
    }

    if (prefersReducedMotion) {
      // keep Latte visible but still, resting near the middle of the screen
      x = window.innerWidth / 2 - CAT_WIDTH / 2;
      wrap.style.transform = `translateX(${x}px)`;
      svg.classList.add('paused');
    } else {
      requestAnimationFrame(frame);
    }

    // Easter egg: press "C" to have Latte chase your cursor briefly
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'c' && !prefersReducedMotion) {
        mode = 'chasing';
        svg.classList.remove('paused');
        chaseUntil = performance.now() + 3200;
      }
    });
  }

  /* =======================================================================
     EASTER EGG — click the title five times for a shower of paw prints
     ======================================================================= */
  function setupTitleEasterEgg() {
    const title = document.getElementById('site-title');
    let clicks = 0;
    let resetTimer = null;

    title.addEventListener('click', () => {
      clicks += 1;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { clicks = 0; }, 1500);
      if (clicks >= 5) {
        clicks = 0;
        spawnPawRain(3000);
      }
    });
  }

  /* =======================================================================
     INIT
     ======================================================================= */
  // each feature is independent — one throwing (e.g. a device-specific quirk)
  // should never silently prevent the rest of the page from working
  function safely(fn) {
    try { fn(); } catch (err) { console.error(err); }
  }

  async function init() {
    const data = await loadMenuData();
    buildCards(data);
    safely(setupMochi);
    safely(setupLatte);
    safely(setupTitleEasterEgg);
    safely(startPetalDrift);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
