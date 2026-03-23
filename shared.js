
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
