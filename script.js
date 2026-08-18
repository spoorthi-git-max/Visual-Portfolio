const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const form = document.querySelector('#contactForm');
const status = document.querySelector('#formStatus');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.dataset.theme = 'dark';
}

themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
});

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

navItems.forEach(item => {
  item.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.toggle(
        'active', link.getAttribute('href') === `#${entry.target.id}`
      ));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = 'Thank you! Your message has been validated successfully.';
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
