// ======= Utilidades =======
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// ======= Tema (claro/escuro) =======
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function setTheme(mode){
  if(mode === 'light') root.classList.add('light');
  else root.classList.remove('light');
  localStorage.setItem('theme', mode);
  themeToggle.setAttribute('aria-pressed', String(mode === 'light'));
}

function initTheme(){
  const stored = localStorage.getItem('theme');
  if(stored) return setTheme(stored);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(prefersLight ? 'light' : 'dark');
}

initTheme();

themeToggle.addEventListener('click', () => {
  const isLight = root.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.setAttribute('aria-pressed', String(isLight));
});

// ======= Pesquisa =======
const searchInput = document.getElementById('search');
const cards = $$('#cards .card');

function normaliza(txt){
  return txt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

function filtra(){
  const q = normaliza(searchInput.value);
  cards.forEach(card => {
    const title = normaliza(card.querySelector('h2').textContent || '');
    const desc = normaliza(card.querySelector('p').textContent || '');
    const num = card.dataset.sdg || '';
    const hay = `${num} ${title} ${desc}`.includes(q);
    card.style.display = hay ? '' : 'none';
  });
}

searchInput.addEventListener('input', filtra);

// ======= Voltar ao topo =======
const btnTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if(window.scrollY > 300) btnTop.classList.add('show');
  else btnTop.classList.remove('show');
});
btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
