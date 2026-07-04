/**
 * BLINKIT UX/UI CASE STUDY — CINEMATIC ANIMATION ENGINE
 * Designer: Aarsh Singh
 * Stack: GSAP 3 (ScrollTrigger, TextPlugin, ScrollToPlugin)
 */

/* ═══════════════════════════════════════════════════════════
   REGISTER PLUGINS
═══════════════════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

/* ═══════════════════════════════════════════════════════════
   NAV DOT SECTION MAP
═══════════════════════════════════════════════════════════ */
const NAV_SECTIONS = [
  's-hero', 's-survey', 's-three-problems', 's-hmw',
  's-home-before', 's-usability', 's-mistake', 's-metrics', 's-learnings'
];

/* ═══════════════════════════════════════════════════════════
   UTILITY: Custom typewriter (no GSAP plugin needed)
═══════════════════════════════════════════════════════════ */
function typewriter(el, text, msPerChar = 40, cursorEl = null) {
  return new Promise(resolve => {
    el.textContent = '';
    let i = 0;
    const tick = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        if (cursorEl) el.appendChild(cursorEl);
        i++;
        setTimeout(tick, msPerChar);
      } else {
        resolve();
      }
    };
    tick();
  });
}

/* ═══════════════════════════════════════════════════════════
   UTILITY: Count-up animation
═══════════════════════════════════════════════════════════ */
function countUp(el, target, suffix = '', duration = 1.5, isFloat = false) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    snap: isFloat ? 0.1 : 1,
    onUpdate: () => {
      el.textContent = isFloat ? obj.val.toFixed(1) + suffix : Math.round(obj.val) + suffix;
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   LOADER
═══════════════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loader-bar-fill');

  gsap.to(fill, {
    width: '100%',
    duration: 2.2,
    ease: 'power2.inOut',
    onComplete: () => {
      const tl = gsap.timeline({
        onComplete: () => {
          loader.style.display = 'none';
          initAll();
        }
      });
      tl.to(fill,   { opacity: 0, duration: 0.25 })
        .to(loader, { opacity: 0, duration: 0.35, ease: 'power2.in' })
        // Brief black cut (200ms) then hero fades in
        .set('#cinematic-cut', { opacity: 1 })
        .to('#cinematic-cut', { opacity: 0, duration: 0.2, delay: 0.2, ease: 'power2.in' });
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   INIT ALL (called after loader finishes)
═══════════════════════════════════════════════════════════ */
function initAll() {
  // Unlock scroll now that loader is gone
  document.body.style.overflow = '';
  initHero();
  initNavbar();
  initResearch();
  initThreeProblems();
  initProcess();
  initTesting();
  initBiggerPicture();
  initClosing();
  initKeyboard();
  initSources();
  initFullscreen();
  initGlobalReveals();
  initSideProgress();
}

function initGlobalReveals() {
  const reveals = document.querySelectorAll('.reveal-up, .panel-h2, .sbar-row, .quote-card, .pp-card, .ub-item, .metric-card, .lbn-item, .lofi-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-revealed');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
  reveals.forEach(r => observer.observe(r));
}

/* ═══════════════════════════════════════════════════════════
   HERO — S1
═══════════════════════════════════════════════════════════ */
function initHero() {
  const phone    = document.getElementById('hero-phone');
  const headline = document.getElementById('hero-headline');
  const subtitle = document.getElementById('hero-subtitle');
  const meta     = document.getElementById('hero-meta');
  const hint     = document.getElementById('hero-scroll-hint');

  // Build cursor element
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  const headlineText = 'I just wanted\nmilk and bread.';

  const tl = gsap.timeline({ delay: 0.15 });

  // Phone fades in from 0→1 over 1.2s  power2.out
  tl.fromTo(phone,
    { opacity: 0 },
    { opacity: 1, duration: 1.2, ease: 'power2.out' }
  )

  // Eyebrow slides up
  .fromTo('#hero-eyebrow',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.4'
  )

  // After phone fades, type headline (40ms/char)
  .call(() => {
    const typeDuration = (headlineText.length * 40) / 1000;
    typewriter(headline, headlineText, 40, cursor).then(() => {
      // Remove blinking cursor after complete
      setTimeout(() => cursor.remove(), 1800);
    });
  }, [], '+=0.3')

  // Subtitle slides up 0.4s after typing starts
  .fromTo(subtitle,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    `+=${(headlineText.length * 40) / 1000 + 0.5}`
  )

  // Meta
  .fromTo(meta,
    { opacity: 0 },
    { opacity: 1, duration: 0.6 },
    '+=0.2'
  )

  // Scroll hint
  .fromTo(hint,
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    '+=0.4'
  );

  // ─── Scroll-driven hero parallax ───
  // Phone: subtle scale + upward parallax as hero exits
  gsap.to(phone, {
    yPercent: -8,
    scale: 1.05,
    ease: 'none',
    scrollTrigger: {
      trigger: '#s-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });

  // Text: fade + slide up as user scrolls past 8%
  gsap.to('#hero-eyebrow, #hero-headline, #hero-subtitle, #hero-meta', {
    opacity: 0,
    y: -40,
    ease: 'none',
    stagger: 0.04,
    scrollTrigger: {
      trigger: '#s-hero',
      start: '12% top',
      end: '30% top',
      scrub: true,
    }
  });

  // HERO PIN — pinned for 10% of its height worth of scroll
  ScrollTrigger.create({
    trigger: '#s-hero',
    start: 'top top',
    end: '+=350',
    pin: true,
    pinSpacing: true,
  });

  // Cinematic crossfade when hero exits → brief black screen
  ScrollTrigger.create({
    trigger: '#s-survey',
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.fromTo('#cinematic-cut',
        { opacity: 0 },
        { opacity: 1, duration: 0.15,
          onComplete: () => gsap.to('#cinematic-cut', { opacity: 0, duration: 0.15 }) }
      );
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navProgress = document.getElementById('nav-progress');

  ScrollTrigger.create({
    start: '3% top',
    onEnter: () => {
      gsap.to(navbar, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      navbar.classList.add('visible');
    },
    onLeaveBack: () => {
      gsap.to(navbar, { opacity: 0, duration: 0.4 });
      navbar.classList.remove('visible');
    }
  });

  // Global scroll progress
  if (navProgress) {
    window.addEventListener('scroll', () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      navProgress.style.width = scrolled + '%';
    });
  }

  // Active link tracking
  NAV_SECTIONS.forEach((id, i) => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveNavLink(i),
      onEnterBack: () => setActiveNavLink(i),
    });
  });

  function setActiveNavLink(sectionIdx) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`.nav-link[data-sec="${sectionIdx}"]`);
    if (link) link.classList.add('active');
  }
}



/* ═══════════════════════════════════════════════════════════
   SURVEY — S2
═══════════════════════════════════════════════════════════ */
function initResearch() {
  // Left: slide in from left
  gsap.fromTo('#survey-viz',
    { opacity: 0, x: -60 },
    {
      opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-survey', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // Animate chart bars once in view
  ScrollTrigger.create({
    trigger: '#s-survey',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.sbar-fill').forEach((bar, i) => {
        const targetWidth = bar.dataset.pct || '70%';
        gsap.to(bar, {
          width: targetWidth,
          duration: 1.5,
          delay: i * 0.15,
          ease: 'elastic.out(1, 0.75)'
        });
      });
      document.querySelectorAll('.sbar-pct').forEach((pctLabel, i) => {
        const val = parseInt(pctLabel.innerText);
        setTimeout(() => countUp(pctLabel, val, '%', 1.5), i * 150);
      });
    }
  });

  // Quote cards: stagger in from 30px below
  gsap.fromTo(['#qc1', '#qc2', '#qc3'],
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: '#s-survey', start: 'top 70%', toggleActions: 'play none none reverse' }
    }
  );

  // Subtle parallax on survey viz scroll
  gsap.to('#survey-viz', {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: { trigger: '#s-survey', scrub: 0.3 }
  });
}

/* ═══════════════════════════════════════════════════════════
   THREE PROBLEMS — S3 (PINNED)
═══════════════════════════════════════════════════════════ */
function initThreeProblems() {
  // PIN for 15% of scroll distance
  ScrollTrigger.create({
    trigger: '#s-three-problems',
    start: 'top top',
    end: '+=500',
    pin: true,
    pinSpacing: true,
  });

  // Panels slide in from bottom staggered
  gsap.fromTo(['#pp1', '#pp2', '#pp3'],
    { opacity: 0, y: 80 },
    {
      opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.2,
      scrollTrigger: { trigger: '#s-three-problems', start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  // Type labels after panels land
  const tags = [
    { id: 'pp-tag1', text: 'LOST' },
    { id: 'pp-tag2', text: 'FORGOTTEN' },
    { id: 'pp-tag3', text: 'TRAPPED' },
  ];

  ScrollTrigger.create({
    trigger: '#s-three-problems',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      tags.forEach((t, i) => {
        setTimeout(() => {
          const el = document.getElementById(t.id);
          if (el) typewriter(el, t.text, 30);
        }, 1000 + i * 200);
      });
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   PROCESS — S4 to S11
═══════════════════════════════════════════════════════════ */
function initProcess() {
  initHMW();
  initWireframes();
  initHomeScreenBefore();
  initHomeScreenAfter();
  initCategory();
  initCart();
  initProductCards();
  initCheckout();
}

function initHMW() {
  // Sticky wall floats + fades in
  gsap.fromTo('#sticky-wall',
    { opacity: 0, rotate: -3, scale: 0.95 },
    {
      opacity: 1, rotate: 0, scale: 1, duration: 1.1, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-hmw', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // SVG pairs: draw circles and lines sequentially
  const pairs = [
    { group: '#hp1', circles: ['#hp1 circle:nth-of-type(1)', '#hp1 circle:nth-of-type(2)'], line: '#hp1 line', texts: ['#hp1 text:nth-of-type(3)', '#hp1 text:nth-of-type(4)'] },
    { group: '#hp2', circles: ['#hp2 circle:nth-of-type(1)', '#hp2 circle:nth-of-type(2)'], line: '#hp2 line', texts: ['#hp2 text:nth-of-type(3)', '#hp2 text:nth-of-type(4)'] },
    { group: '#hp3', circles: ['#hp3 circle:nth-of-type(1)', '#hp3 circle:nth-of-type(2)'], line: '#hp3 line', texts: ['#hp3 text:nth-of-type(3)', '#hp3 text:nth-of-type(4)'] },
  ];

  ScrollTrigger.create({
    trigger: '#s-hmw',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      pairs.forEach((p, i) => {
        const delay = i * 0.4;

        // Draw first circle
        document.querySelectorAll(`${p.group} circle`).forEach((c, ci) => {
          gsap.to(c, { strokeDashoffset: 0, duration: 0.6, delay: delay + ci * 0.15, ease: 'power2.out' });
        });

        // Draw line
        const lineEl = document.querySelector(`${p.group} line`);
        if (lineEl) gsap.to(lineEl, { strokeDashoffset: 0, duration: 0.4, delay: delay + 0.35, ease: 'power2.out' });

        // Fade in text labels
        document.querySelectorAll(`${p.group} text`).forEach((t, ti) => {
          if (ti >= 2) {
            gsap.to(t, { opacity: 1, duration: 0.4, delay: delay + 0.55 + ti * 0.1 });
          }
        });
      });
    }
  });

  // HMW solutions stagger
  gsap.fromTo('#hmw-solutions',
    { opacity: 0, x: 30 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-hmw', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );
}

function initWireframes() {
  // Paper: wipe from left using clip-path
  gsap.fromTo('#wf-paper',
    { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    {
      clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power2.inOut',
      scrollTrigger: { trigger: '#s-wireframes', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // Digital fades in 0.3s after
  gsap.fromTo('#wf-digital',
    { opacity: 0 },
    {
      opacity: 1, duration: 0.7, delay: 0.3, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-wireframes', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // SVG connector line draws
  ScrollTrigger.create({
    trigger: '#s-wireframes',
    start: 'top 72%',
    once: true,
    onEnter: () => {
      gsap.to('#wf-line',  { strokeDashoffset: 0, duration: 0.6, delay: 1.0, ease: 'power2.out' });
      gsap.to('#wf-arrow', { opacity: 1, duration: 0.3, delay: 1.55 });
    }
  });
}

function initHomeScreenBefore() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#s-home-before',
      start: 'top top',
      end: '+=1000',
      pin: true,
      scrub: 1
    }
  });

  tl.to('#ann1, #ann3', { opacity: 0, duration: 1 })
    .to('#home-after-img', { opacity: 1, duration: 2 }, '-=0.5')
    .to('#ann2, #ann4', { opacity: 1, duration: 1 }, '-=1')
    .to('#arrow-fav, #arrow-cat', { opacity: 1, duration: 0.5 })
    .to('#arrow-fav path, #arrow-cat path', { strokeDashoffset: 0, duration: 1 });
}

function initHomeScreenAfter() {
  // Removed, merged into initHomeScreenBefore
}


function initCategory() {
  // Left side fades in
  gsap.fromTo('.ba-left',
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-category', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // Divider line draws top to bottom
  ScrollTrigger.create({
    trigger: '#s-category',
    start: 'top 72%',
    once: true,
    onEnter: () => {
      gsap.to('#ba-divider-line', { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' });
    }
  });

  // Right side fades in + light sweep + sequential highlighting
  gsap.fromTo('#ba-right',
    { opacity: 0, x: 30 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.3,
      scrollTrigger: { trigger: '#s-category', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  ScrollTrigger.create({
    trigger: '#s-category',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      // Highlight box sequential scanning
      const hBox = document.getElementById('cat-highlight');
      if (hBox) {
        gsap.to(hBox, { opacity: 1, duration: 0.3, delay: 0.5 });
        gsap.to(hBox, { top: 140, duration: 0.4, delay: 1.0, ease: 'power2.inOut' });
        gsap.to(hBox, { top: 180, duration: 0.4, delay: 1.5, ease: 'power2.inOut' });
        gsap.to(hBox, { top: 220, duration: 0.4, delay: 2.0, ease: 'power2.inOut' });
        gsap.to(hBox, { opacity: 0, duration: 0.5, delay: 2.8 });
      }
    }
  });
}

function initCart() {
  // FAB slides up from below with back.out ease + shadow grows
  gsap.fromTo('#cart-phone-col',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-cart', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // FAB specific entrance
  ScrollTrigger.create({
    trigger: '#s-cart',
    start: 'top 68%',
    once: true,
    onEnter: () => {
      const fab = document.getElementById('cart-fab');
      if (fab) {
        gsap.fromTo(fab,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.2)' }
        );
        // Pulse demo when cart description enters
        setTimeout(() => {
          gsap.fromTo(fab, { scale: 1 }, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' });
          const count = document.getElementById('fab-count');
          if (count) {
            gsap.fromTo(count, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' });
          }
        }, 1200);
      }
    }
  });

  // Feature callouts stagger
  ['#cf1','#cf2','#cf3'].forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.15,
        scrollTrigger: { trigger: '#s-cart', start: 'top 72%', toggleActions: 'play none none reverse' }
      }
    );
  });
}

function initProductCards() {
  // Old card slides in from left
  gsap.fromTo('#pc-old',
    { opacity: 0, x: -60 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-product-cards', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // New card slides in from right
  gsap.fromTo('#pc-new',
    { opacity: 0, x: 60 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-product-cards', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // 3D tilt on mouse move (desktop only)
  if (window.innerWidth > 900) {
    document.querySelectorAll('.pc-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const rx = ((e.clientY - cy) / rect.height) * -5;
        const ry = ((e.clientX - cx) / rect.width)  *  5;
        gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.3, ease: 'power1.out', transformPerspective: 600 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
      });
    });
  }

  // Diagonal shine animation for New Card
  ScrollTrigger.create({
    trigger: '#s-product-cards',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      setTimeout(() => {
        gsap.to('#card-shine', { left: '150%', duration: 1.2, ease: 'power2.inOut' });
      }, 500);
    }
  });
}

function initCheckout() {
  // Fold 1: unroll from height 0
  gsap.fromTo('#cof1',
    { opacity: 0, scaleY: 0, transformOrigin: 'top' },
    {
      opacity: 1, scaleY: 1, duration: 1.0, ease: 'power3.out',
      scrollTrigger: { trigger: '#s-checkout', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // Fold 2: delayed
  gsap.fromTo('#cof2',
    { opacity: 0, scaleY: 0, transformOrigin: 'top' },
    {
      opacity: 1, scaleY: 1, duration: 1.0, ease: 'power3.out', delay: 0.4,
      scrollTrigger: { trigger: '#s-checkout', start: 'top 72%', toggleActions: 'play none none reverse' }
    }
  );

  // Progress bar fills as user scrolls through checkout section
  ScrollTrigger.create({
    trigger: '#s-checkout',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: self => {
      const fill = document.getElementById('cr-prog-fill');
      if (fill) fill.style.width = (self.progress * 100) + '%';
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   TESTING — S12 to S14
═══════════════════════════════════════════════════════════ */
function initTesting() {
  // Usability thumbnails stagger
  ['#utt1','#utt2','#utt3','#utt4','#utt5','#utt6'].forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', delay: i * 0.1,
        scrollTrigger: { trigger: '#s-usability', start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // Task list types in line by line
  ScrollTrigger.create({
    trigger: '#s-usability',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      ['#ti1','#ti2','#ti3','#ti4','#ti5'].forEach((id, i) => {
        const el = document.querySelector(id);
        if (!el) return;
        const original = el.textContent;
        el.textContent = '';
        setTimeout(() => typewriter(el, original, 30), i * 300);
      });
      
      // Odometer effect for time and strikethrough reveal
      setTimeout(() => {
        const timeEl = document.getElementById('utr-time');
        const strikeEl = document.getElementById('utr-strike');
        if (timeEl) {
          gsap.fromTo(timeEl, { innerHTML: 0 }, { innerHTML: 68, duration: 2, snap: { innerHTML: 1 }, ease: 'power2.out' });
        }
        if (strikeEl) {
          strikeEl.classList.add('is-revealed');
        }
      }, 1500);
    }
  });

  // ─── THE MISTAKE (pinned) ───
  // Background dims
  ScrollTrigger.create({
    trigger: '#s-mistake',
    start: 'top bottom',
    end: 'top top',
    scrub: true,
    onUpdate: self => {
      document.getElementById('s-mistake').style.filter = `brightness(${0.4 + self.progress * 0.6})`;
    }
  });

  // PIN THE MISTAKE for 15% of scroll distance
  ScrollTrigger.create({
    trigger: '#s-mistake',
    start: 'top top',
    end: '+=600',
    pin: true,
    pinSpacing: true,
  });

  // Mistake phone: VERY slow fade in (slow = uncomfortable)
  gsap.fromTo('#mistake-phone',
    { opacity: 0 },
    {
      opacity: 1, duration: 1.5, ease: 'power1.out',
      scrollTrigger: { trigger: '#s-mistake', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // Quote: each word fades in staggered
  ScrollTrigger.create({
    trigger: '#s-mistake',
    start: 'top 68%',
    once: true,
    onEnter: () => {
      const quoteEl = document.getElementById('mistake-quote');
      if (!quoteEl) return;
      const quoteText = '"It feels like you\'re hiding something. I don\'t trust this."';
      const words = quoteText.split(' ');
      quoteEl.textContent = '';
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        quoteEl.appendChild(span);
        gsap.to(span, { opacity: 1, duration: 0.4, delay: 0.6 + i * 0.08 });
      });
    }
  });

  // Reflection appears last
  gsap.fromTo('#mistake-reflection',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.5,
      scrollTrigger: { trigger: '#s-mistake', start: 'top 65%', toggleActions: 'play none none reverse' }
    }
  );

  // ─── THE FIX ───
  gsap.fromTo('#fix-phone',
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-fix', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );
}

/* ═══════════════════════════════════════════════════════════
   BIGGER PICTURE — S15 to S18
═══════════════════════════════════════════════════════════ */
function initBiggerPicture() {
  initMetrics();
  initDevelopers();
  initUsers();
  initFlow();
}

function initMetrics() {
  const directions = [
    { x: -100, y: -100 }, // mc1: top-left
    { x:  100, y: -100 }, // mc2: top-right
    { x: -100, y:  100 }, // mc3: bottom-left
    { x:  100, y:  100 }, // mc4: bottom-right
  ];
  const cards = ['#mc1','#mc2','#mc3','#mc4'];
  const targets = [23, 68, 28, 78];
  const suffixes = ['%↑', 's', '%↓', ''];
  const floats = [false, false, false, false];

  cards.forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, x: directions[i].x, y: directions[i].y },
      {
        opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.12,
        scrollTrigger: { trigger: '#s-metrics', start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // Count-up numbers
  ScrollTrigger.create({
    trigger: '#s-metrics',
    start: 'top 68%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.mc-num').forEach((el, i) => {
        const t = targets[i];
        const isFloat = t % 1 !== 0;
        countUp(el, t, suffixes[i], 1.5, isFloat);
      });
    }
  });
}

function initDevelopers() {
  const termLines = [
    { id: 'tl0', html: '# Blinkit Design System v2.0', color: 'rgba(255,255,255,0.4)' },
    { id: 'tl1', text: 'colors:', keyword: true },
    { id: 'tl2', text: '  primary:  <kw>#FFD700</kw>  # Blinkit yellow' },
    { id: 'tl3', text: '  positive: <val>#76B900</val>  # Solution green' },
    { id: 'tl4', text: 'components:' , keyword: true },
    { id: 'tl5', text: '  - <val>bottom-nav-bar</val>  # 4 items, persistent' },
  ];

  ScrollTrigger.create({
    trigger: '#s-developers',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      termLines.forEach((line, i) => {
        const el = document.getElementById(line.id);
        if (!el) return;
        setTimeout(() => {
          if (line.html) {
            el.style.color = line.color || '';
            el.textContent = line.html;
          } else if (line.text) {
            // Parse inline markup for yellow highlights
            el.innerHTML = line.text
              .replace(/<kw>/g, '<span class="kw">')
              .replace(/<\/kw>/g, '</span>')
              .replace(/<val>/g, '<span class="val">')
              .replace(/<\/val>/g, '</span>');
          }
        }, i * 220);
      });

      // Cursor blinks
      setTimeout(() => {
        const cursor = document.getElementById('term-cursor');
        if (cursor) gsap.to(cursor, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true });
      }, termLines.length * 220);
    }
  });

  // Dev callouts stagger in
  ['#dc1','#dc2','#dc3'].forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.2,
        scrollTrigger: { trigger: '#s-developers', start: 'top 72%', toggleActions: 'play none none reverse' }
      }
    );
  });
}

function initUsers() {
  // SVG stroke animations
  const svgs = [
    { id: 'ubsvg1', paths: ['circle', 'path'] },
    { id: 'ubsvg2', paths: ['rect', 'line', 'line', 'line'] },
    { id: 'ubsvg3', paths: ['circle', 'path'] },
  ];

  svgs.forEach((svg, si) => {
    const el = document.getElementById(svg.id);
    if (!el) return;
    const strokes = el.querySelectorAll('circle, rect, line, path');
    strokes.forEach((stroke, pi) => {
      gsap.fromTo(stroke,
        { strokeDashoffset: parseFloat(stroke.getAttribute('stroke-dasharray') || '0') },
        {
          strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', delay: si * 0.2 + pi * 0.1,
          scrollTrigger: { trigger: '#s-users', start: 'top 72%', toggleActions: 'play none none reverse' }
        }
      );
    });
  });

  // Items slide in
  ['#ubi1','#ubi2','#ubi3'].forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.2,
        scrollTrigger: { trigger: '#s-users', start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
  });
}

function initFlow() {
  const nodes = ['#fnode1','#fnode2','#fnode3','#fnode4','#fnode5','#fnode6','#fnode7'];
  const lines = ['#fline1','#fline2','#fline3','#fline4','#fline5','#fline6'];

  ScrollTrigger.create({
    trigger: '#s-flow',
    start: 'top 72%',
    once: true,
    onEnter: () => {
      // Reveal each node then draw line, alternating
      const sequence = [
        { node: '#fnode1', line: '#fline1', delay: 0 },
        { node: '#fnode2', line: '#fline2', delay: 0.6 },
        { node: '#fnode3', line: '#fline3', delay: 1.2 },
        { node: '#fnode4', line: '#fline4', delay: 1.8 },
        { node: '#fnode5', line: null,      delay: 2.4 },
        { node: '#fnode6', line: '#fline5', delay: 1.0 },
        { node: '#fnode7', line: '#fline6', delay: 1.6 },
      ];

      sequence.forEach(s => {
        const nodeEl = document.querySelector(s.node);
        if (nodeEl) {
          gsap.to(nodeEl.querySelectorAll('rect, g > rect'), {
            opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: s.delay,
            transformBox: 'fill-box', transformOrigin: 'center'
          });
          gsap.to(nodeEl.querySelectorAll('text'), {
            opacity: 1, duration: 0.3, delay: s.delay + 0.3
          });
        }
        if (s.line) {
          const lineEl = document.querySelector(s.line);
          if (lineEl) gsap.to(lineEl, { strokeDashoffset: 0, duration: 0.4, delay: s.delay + 0.5, ease: 'power2.out' });
        }
      });

      // "You are here" pulse appears
      gsap.to('#you-here', { opacity: 1, duration: 0.5, delay: 3.0 });
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   CLOSING — S19 to S22
═══════════════════════════════════════════════════════════ */
function initClosing() {
  initLearnings();
  initChallenges();
  initStyleGuide();
  initThankYou();
}

function initLearnings() {
  // Deal cards like a deck: staggered, slight rotation
  ['#lc1','#lc2','#lc3','#lc4','#lc5'].forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, y: 100, rotate: -3 },
      {
        opacity: 1, y: 0, rotate: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.18,
        scrollTrigger: { trigger: '#s-learnings', start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
  });
}

function initChallenges() {
  ['#chi1','#chi2','#chi3'].forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.25,
        scrollTrigger: { trigger: '#s-challenges', start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // 😅 emoji wiggle on enter
  ScrollTrigger.create({
    trigger: '#s-challenges',
    start: 'top 65%',
    once: true,
    onEnter: () => {
      setTimeout(() => {
        const emoji = document.getElementById('ch-emoji');
        if (emoji) gsap.fromTo(emoji, { rotate: 0 }, { rotate: 10, duration: 0.1, yoyo: true, repeat: 3, ease: 'power2.inOut',
          onComplete: () => gsap.set(emoji, { rotate: 0 }) });
      }, 700);
    }
  });
}

function initStyleGuide() {
  // Swatches drop in from top
  ['#sw1','#sw2','#sw3','#sw4','#sw5'].forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, y: -30 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.1,
        scrollTrigger: { trigger: '#s-style-guide', start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
    // Shimmer once
    ScrollTrigger.create({
      trigger: '#s-style-guide', start: 'top 68%', once: true,
      onEnter: () => setTimeout(() => document.querySelector(`${id} .sw-circle`)?.classList.add('sw-shimmer'), i * 100 + 600)
    });
  });

  // Typography samples scale in
  ['#tr1','#tr2','#tr3','#tr4'].forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', delay: i * 0.1 + 0.2,
        scrollTrigger: { trigger: '#s-style-guide', start: 'top 72%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // Component chips scale in
  gsap.fromTo('#sg-components > *',
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', stagger: 0.1,
      scrollTrigger: { trigger: '#s-style-guide', start: 'top 70%', toggleActions: 'play none none reverse' }
    }
  );
}

function initThankYou() {
  // Vignette expands from center
  gsap.fromTo('#ty-vignette',
    { opacity: 0 },
    {
      opacity: 1, duration: 1.2, ease: 'power2.out',
      scrollTrigger: { trigger: '#s-thankyou', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // Photo expands with vignette mask feel
  gsap.fromTo('#ty-photo',
    { opacity: 0, scale: 0.7 },
    {
      opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '#s-thankyou', start: 'top 75%', toggleActions: 'play none none reverse' }
    }
  );

  // Contact links stagger from bottom
  ['#tyl1','#tyl2','#tyl3'].forEach((id, i) => {
    gsap.fromTo(id,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.6 + i * 0.15,
        scrollTrigger: { trigger: '#s-thankyou', start: 'top 72%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // Hand wave: one-time elastic wiggle
  ScrollTrigger.create({
    trigger: '#s-thankyou',
    start: 'top 65%',
    once: true,
    onEnter: () => {
      setTimeout(() => {
        const wave = document.getElementById('ty-wave');
        if (wave) {
          gsap.fromTo(wave,
            { rotate: 0 },
            { rotate: 20, duration: 0.12, yoyo: true, repeat: 3,
              ease: 'power1.inOut',
              onComplete: () => gsap.set(wave, { rotate: 0 }) }
          );
        }
      }, 800);
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   KEYBOARD NAVIGATION
═══════════════════════════════════════════════════════════ */
function initKeyboard() {
  const sections = Array.from(document.querySelectorAll('.panel'));

  function getCurrentSection() {
    const scrollY = window.scrollY + window.innerHeight / 2;
    let best = 0;
    sections.forEach((s, i) => {
      if (s.offsetTop <= scrollY) best = i;
    });
    return best;
  }

  function scrollToSection(idx) {
    if (idx < 0 || idx >= sections.length) return;
    gsap.to(window, {
      scrollTo: { y: sections[idx], offsetY: 0 },
      duration: 1.2,
      ease: 'power3.inOut'
    });
  }

  document.addEventListener('keydown', e => {
    // Skip if typing in an input
    if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        scrollToSection(getCurrentSection() + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        scrollToSection(getCurrentSection() - 1);
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'r':
      case 'R':
        gsap.to(window, { scrollTo: 0, duration: 1.5, ease: 'power3.inOut' });
        break;
      case 'c':
      case 'C':
        toggleSources();
        break;
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   FULLSCREEN
═══════════════════════════════════════════════════════════ */
function initFullscreen() {
  const btn = document.getElementById('fullscreen-btn');
  const expand   = document.getElementById('fs-expand');
  const collapse = document.getElementById('fs-collapse');

  btn.addEventListener('click', toggleFullscreen);

  document.addEventListener('fullscreenchange', () => {
    const isFull = !!document.fullscreenElement;
    expand.style.display   = isFull ? 'none'  : 'block';
    collapse.style.display = isFull ? 'block' : 'none';
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

/* ═══════════════════════════════════════════════════════════
   SOURCES DRAWER
═══════════════════════════════════════════════════════════ */
function initSources() {
  const drawer  = document.getElementById('sources-drawer');
  const overlay = document.getElementById('sources-overlay');
  const closeBtn = document.getElementById('sources-close');

  function toggleSources() {
    drawer.classList.toggle('sources-open');
  }
  window.toggleSources = toggleSources;

  overlay.addEventListener('click', toggleSources);
  closeBtn.addEventListener('click', toggleSources);
}

/* ═══════════════════════════════════════════════════════════
   PERFORMANCE: Remove will-change after animations
═══════════════════════════════════════════════════════════ */
ScrollTrigger.addEventListener('refresh', () => {
  // After layout recalculation, clear will-change on settled elements
  document.querySelectorAll('.panel').forEach(p => {
    const style = window.getComputedStyle(p);
    if (style.opacity === '1' && style.transform === 'matrix(1, 0, 0, 1, 0, 0)') {
      p.style.willChange = 'auto';
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   START
═══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  // Set initial hidden states for elements that will animate in
  gsap.set('#hero-eyebrow', { opacity: 0 });
  gsap.set('#hero-subtitle', { opacity: 0 });
  gsap.set('#hero-meta', { opacity: 0 });
  gsap.set('#hero-scroll-hint', { opacity: 0 });
  gsap.set('#hero-phone', { opacity: 0 });
  gsap.set('#navbar', { opacity: 0 });

  // Lock scroll during loading
  document.body.style.overflow = 'hidden';

  initLoader();

  // Unlock scroll after loader done (handled inside initAll via onComplete)
  // But also add a safety unlock
  setTimeout(() => { document.body.style.overflow = ''; }, 3500);
});

// Ensure scroll unlock if something goes wrong
window.addEventListener('load', () => {
  setTimeout(() => { document.body.style.overflow = ''; }, 5000);
});

/* ═══════════════════════════════════════════════════════════
   SCOOTER SCROLL PROGRESS BAR
   — Driven by raw scroll position via requestAnimationFrame
   — Scooter rides RIGHT → LEFT as user scrolls top → bottom
═══════════════════════════════════════════════════════════ */
function initScooterProgress() {
  const bar          = document.getElementById('scooter-progress-bar');
  const traveled     = document.getElementById('road-traveled');
  const rider        = document.getElementById('scooter-rider');
  const scooterImg   = document.getElementById('scooter-img');
  const badge        = document.getElementById('delivered-badge');

  if (!bar || !rider) return;

  // Padding so scooter doesn't clip at edges (px)
  const EDGE_PAD    = 24;
  // Width of the scooter image (approximate, recalculated on load)
  let SCOOTER_W     = 140;

  // Measure scooter width after image loads
  scooterImg.addEventListener('load', () => {
    SCOOTER_W = scooterImg.offsetWidth;
  });
  if (scooterImg.complete) SCOOTER_W = scooterImg.offsetWidth || 140;

  let lastProgress   = -1;
  let isScrolling    = false;
  let scrollTimer    = null;
  let delivered      = false;
  let rafId          = null;

  /**
   * Get scroll progress 0..1
   * Uses the document scroll minus the 100vh "hero" pin so the
   * scooter only counts actual content scroll, not pinned headspace.
   */
  function getProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight);
    if (maxScroll <= 0) return 0;
    return Math.min(1, Math.max(0, scrollTop / maxScroll));
  }

  /**
   * Main render loop — runs every rAF frame
   */
  function render() {
    const progress = getProgress();

    // Only update DOM if progress changed meaningfully
    if (Math.abs(progress - lastProgress) < 0.0005 && lastProgress >= 0) {
      rafId = requestAnimationFrame(render);
      return;
    }
    lastProgress = progress;

    // Use spb-inner for track width, not bar, since bar is now just a positioning wrapper
    const trackWidth  = document.getElementById('spb-inner').offsetWidth;
    // Usable width for scooter center point
    const usable      = trackWidth - SCOOTER_W - EDGE_PAD * 2;

    // At progress=0 → scooter at far RIGHT (right = EDGE_PAD)
    // At progress=1 → scooter at far LEFT  (right = usable + EDGE_PAD)
    const scooterRight = EDGE_PAD + (1 - progress) * usable;
    rider.style.right  = scooterRight + 'px';

    // Yellow filled road: width = how far scooter has traveled from right
    // = (1 - scooterRight/trackWidth) * 100%
    const traveledPct  = ((trackWidth - scooterRight - SCOOTER_W / 2) / trackWidth) * 100;
    traveled.style.width = Math.max(0, traveledPct) + '%';

    // ── Delivered state ──
    if (progress >= 0.98 && !delivered) {
      delivered = true;
      if(badge) badge.classList.add('db-show');
      // Stop wheel bounce — scooter is parked
      scooterImg.classList.remove('scooter-rolling');
      scooterImg.style.animation = 'none';

      // Tiny celebrate: scooter does a brief bounce
      gsap.fromTo(scooterImg,
        { y: 0 },
        { y: -10, duration: 0.18, yoyo: true, repeat: 2, ease: 'power2.out',
          onComplete: () => { scooterImg.style.animation = ''; } }
      );
    } else if (progress < 0.95 && delivered) {
      delivered = false;
      if(badge) badge.classList.remove('db-show');
      scooterImg.style.animation = '';
    }

    rafId = requestAnimationFrame(render);
  }

  // ── Scroll state for rolling animation ──
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true;
      scooterImg.classList.add('scooter-rolling');
    }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      isScrolling = false;
      scooterImg.classList.remove('scooter-rolling');
    }, 200);
  }, { passive: true });

  // ── Show bar when page content is ready ──
  setTimeout(() => {
    bar.classList.add('spb-visible');
    render(); // kick off
  }, 2800); // after loader animation completes
}

// Initialize scooter after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initScooterProgress();
});

/* ═══════════════════════════════════════════════════════════
   SIDE PROGRESS INDICATOR
═══════════════════════════════════════════════════════════ */
function initSideProgress() {
  const container = document.getElementById('side-progress-container');
  const fill = document.getElementById('side-progress-fill');
  if (!container || !fill) return;

  const panels = document.querySelectorAll('.panel');
  const dots = [];

  // Create dots based on panels
  panels.forEach((panel, index) => {
    const dot = document.createElement('div');
    dot.className = 'sp-dot';
    container.appendChild(dot);
    dots.push({ el: dot, panel: panel });
  });

  window.addEventListener('scroll', () => {
    let currentPanelIdx = 0;
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    
    panels.forEach((panel, index) => {
      const rect = panel.getBoundingClientRect();
      const topOffset = rect.top + scrollPos;
      if (scrollPos >= topOffset - window.innerHeight / 2) {
        currentPanelIdx = index;
      }
    });

    dots.forEach((dotObj, i) => {
      if (i === currentPanelIdx) {
        dotObj.el.classList.add('active');
      } else {
        dotObj.el.classList.remove('active');
      }
    });

    // Update fill height
    if (dots.length > 1) {
      const percentage = (currentPanelIdx / (dots.length - 1)) * 100;
      fill.style.height = percentage + '%';
    }
  });
}

