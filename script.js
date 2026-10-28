// ===== LANGUAGE TOGGLE =====
function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  try { localStorage.setItem('zorgvoorzeldzaam-lang', lang); } catch (e) {}
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    const on = btn.dataset.lang === lang;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', on);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let saved = 'en';
  try { saved = localStorage.getItem('zorgvoorzeldzaam-lang') || 'en'; } catch (e) {}
  setLanguage(saved);
  document.querySelectorAll('.lang-switch button').forEach(btn =>
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }));
  }
});

// ===== NAVBAR SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== HIDE PAST EVENTS =====
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('upcoming-events');
  if (!list) return;
  const now = new Date();
  list.querySelectorAll('[data-end]').forEach(card => {
    if (new Date(card.dataset.end) < now) card.remove();
  });
  if (!list.querySelector('.event-card')) list.classList.add('is-empty');
});
