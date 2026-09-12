const toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const navLinks = [...document.querySelectorAll('.sidebar nav a')];
function setMenu(open) {
  sidebar.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (matchMedia('(max-width: 768px)').matches) sidebar.inert = !open;
  else sidebar.inert = false;
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', event => {
  if (!sidebar.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false); toggle.focus();
  }
});
window.addEventListener('resize', () => setMenu(false));
setMenu(false);
let pending = false;
function highlightSection() {
  const threshold = window.innerHeight * 0.35;
  let current = navLinks[0];
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.getBoundingClientRect().top <= threshold) current = link;
  });
  navLinks.forEach(link => {
    const active = link === current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  pending = false;
}
window.addEventListener('scroll', () => {
  if (!pending) { pending = true; requestAnimationFrame(highlightSection); }
}, { passive: true });
highlightSection();
