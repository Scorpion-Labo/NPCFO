
// ── SCROLL HIDE/SHOW NAV ──
// Hide when scrolling DOWN, show when scrolling UP
let lastY = 0;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const y = window.scrollY;
  if (!nav) return;
  if (y > lastY && y > 80) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }
  nav.classList.toggle('scrolled', y > 20);
  lastY = y;
}, { passive: true });

// ── MOBILE NAV ──
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
});

// ── ACTIVE NAV LINK ──
// Works for both file:// (local) and http(s):// (hosted)
// Removes ALL pre-set active classes, then sets only the one matching the current page
(function () {
  // Get just the filename, e.g. "team.html" or "index.html"
  var fullHref = window.location.href;
  var currentFile = fullHref.split('/').pop().split('?')[0].split('#')[0];
  if (!currentFile || currentFile === '') currentFile = 'index.html';

  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function (a) {
    // Strip ALL active classes first — no leftovers
    a.classList.remove('active');

    var linkHref = a.getAttribute('href') || '';
    var linkFile = linkHref.split('/').pop().split('?')[0];

    if (linkFile === currentFile) {
      a.classList.add('active');
      // Note: .nav-cta.active is styled in CSS to show green fill
      // other links show green box via .nav-links a.active
    }
  });
})();

// ── FADE-UP SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── ZERO TO LAUNCH POPUP (shows once every 30 days) ──
(function () {
  const POPUP_KEY    = 'npcfo_ztl_shown';
  const THIRTY_DAYS  = 30 * 24 * 60 * 60 * 1000;

  // Don't show on the flyer page itself
  const page = window.location.pathname.split('/').pop();
  if (page === 'Zero_To_Launch_Flyer.html') return;

  const lastShown = localStorage.getItem(POPUP_KEY);
  if (lastShown && (Date.now() - parseInt(lastShown)) < THIRTY_DAYS) return;

  // Delay 1.5s for better UX
  setTimeout(function () {
    var overlay = document.createElement('div');
    overlay.id = 'ztl-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(3px);animation:ztlFadeIn 0.3s ease;';

    overlay.innerHTML = [
      '<style>',
      '@keyframes ztlFadeIn{from{opacity:0}to{opacity:1}}',
      '@keyframes ztlSlideUp{from{transform:translateY(28px);opacity:0}to{transform:translateY(0);opacity:1}}',
      '#ztl-modal{background:#fff;border-radius:16px;max-width:520px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);overflow:hidden;animation:ztlSlideUp 0.35s ease;}',
      '#ztl-hdr{background:linear-gradient(135deg,#0d4f2e,#1a6b3e);padding:1.75rem 2rem 1.5rem;position:relative;}',
      '#ztl-x{position:absolute;top:0.9rem;right:0.9rem;background:rgba(255,255,255,0.15);border:none;color:#fff;width:30px;height:30px;border-radius:50%;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
      '#ztl-x:hover{background:rgba(255,255,255,0.3);}',
      '#ztl-badge{background:#c9a84c;color:#0d4f2e;font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.75rem;border-radius:99px;display:inline-block;margin-bottom:0.75rem;}',
      '#ztl-title{font-family:"Playfair Display",serif;font-size:1.6rem;font-weight:700;color:#fff;line-height:1.2;margin-bottom:0.5rem;}',
      '#ztl-title span{color:#c9a84c;}',
      '#ztl-sub{color:rgba(255,255,255,0.82);font-size:0.88rem;line-height:1.55;}',
      '#ztl-body{padding:1.5rem 2rem;}',
      '#ztl-pts{list-style:none;padding:0;margin:0 0 1.25rem;display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1rem;}',
      '#ztl-pts li{font-size:0.85rem;color:#3d5a47;display:flex;align-items:flex-start;gap:0.4rem;line-height:1.4;}',
      '#ztl-pts li::before{content:"✓";color:#0d4f2e;font-weight:700;flex-shrink:0;}',
      '#ztl-acts{display:flex;gap:0.75rem;flex-wrap:wrap;}',
      '#ztl-primary{flex:1;background:#0d4f2e;color:#fff;padding:0.75rem 1rem;border-radius:8px;font-size:0.9rem;font-weight:700;cursor:pointer;text-decoration:none;text-align:center;display:block;transition:background 0.2s;}',
      '#ztl-primary:hover{background:#1a6b3e;}',
      '#ztl-secondary{flex:1;background:#fff;color:#0d4f2e;padding:0.75rem 1rem;border:2px solid #0d4f2e;border-radius:8px;font-size:0.9rem;font-weight:700;text-decoration:none;text-align:center;display:block;transition:background 0.2s;}',
      '#ztl-secondary:hover{background:#e8f5ee;}',
      '#ztl-skip{text-align:center;margin-top:0.85rem;font-size:0.78rem;color:#6b8a74;cursor:pointer;}',
      '#ztl-skip:hover{color:#0d4f2e;}',
      '</style>',
      '<div id="ztl-modal">',
        '<div id="ztl-hdr">',
          '<button id="ztl-x" aria-label="Close">&#10005;</button>',
          '<div style="font-size:2rem;margin-bottom:0.5rem;">🚀</div>',
          '<span id="ztl-badge">New Service</span>',
          '<div id="ztl-title">Zero To <span>Launch</span></div>',
          '<div id="ztl-sub">Start your small business with peace of mind — from structure and setup to systems and a live website, all in one guided service.</div>',
        '</div>',
        '<div id="ztl-body">',
          '<ul id="ztl-pts">',
            '<li>Business entity formation</li>',
            '<li>EIN &amp; tax registration</li>',
            '<li>Domain &amp; website build</li>',
            '<li>Business email setup</li>',
            '<li>Accounting system setup</li>',
            '<li>Compliance calendar</li>',
          '</ul>',
          '<div id="ztl-acts">',
            '<a href="Zero_To_Launch_Flyer.html" target="_blank" id="ztl-primary">View Full Details &rarr;</a>',
            '<a href="contact.html" id="ztl-secondary">Book a Consultation</a>',
          '</div>',
          '<div id="ztl-skip">No thanks, maybe later</div>',
        '</div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);
    localStorage.setItem(POPUP_KEY, Date.now().toString());

    function closePopup() {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.25s';
      setTimeout(function () { overlay.remove(); }, 250);
    }

    document.getElementById('ztl-x').addEventListener('click', closePopup);
    document.getElementById('ztl-skip').addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closePopup(); });

  }, 1500);
})();
