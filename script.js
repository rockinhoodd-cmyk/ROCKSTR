const materials = [
  ["Base",120,"#777b75"],["Silver",60,"#d6dad8"],["Copper",50,"#b96132"],["Onyx",35,"#171a18"],["Ice",25,"#c8efff"],
  ["Emerald",15,"#0f8b58"],["Sapphire",12,"#245ad7"],["Ruby",8,"#c22538"],["Amethyst",5,"#8c4dc6"],["Gold",3,"#e5b52b"]
];

const grid = document.querySelector('#materialsGrid');
materials.forEach(([name,count,color], index) => {
  const card = document.createElement('article');
  card.className = `material-card scroll-reveal delay-${index % 4}`;
  card.innerHTML = `<span class="count">${count} EXIST</span><div class="material-swatch" style="--material:${color}"></div><h3>${name}</h3><p>${((count/333)*100).toFixed(1)}% of the collection</p>`;
  grid.appendChild(card);
});

const menu = document.querySelector('.menu-button');
const links = document.querySelector('.nav-links');
menu.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

// Header state on scroll
const nav = document.querySelector('.nav-wrap');
const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 20);
updateNav();
window.addEventListener('scroll', updateNav, { passive:true });

// Scroll-triggered section/card entrances
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.14, rootMargin:'0px 0px -35px' });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// Gentle hero parallax (desktop / pointer devices only)
const heroVisual = document.querySelector('.hero-visual');
const heroRock = document.querySelector('.hero-visual img');
if (heroVisual && heroRock && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    heroRock.style.translate = `${x * 11}px ${y * 9}px`;
  });
  heroVisual.addEventListener('pointerleave', () => { heroRock.style.translate = ''; });
}

// Animated number counters
const counters = document.querySelectorAll('.hero-stats strong');
const counterTargets = [333,10,138];
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    counters.forEach((counter,index) => {
      const target = counterTargets[index];
      const suffix = index === 2 ? '+' : '';
      const start = performance.now();
      const duration = 1100;
      const tick = now => {
        const progress = Math.min((now-start)/duration,1);
        const eased = 1-Math.pow(1-progress,3);
        counter.textContent = `${Math.round(target*eased)}${suffix}`;
        if(progress<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    counterObserver.disconnect();
  });
},{threshold:.6});
const stats = document.querySelector('.hero-stats');
if(stats) counterObserver.observe(stats);

// Small interactive mining concept demo
const mineButton = document.querySelector('#mineDemoButton');
const progress = document.querySelector('.mine-progress');
const status = document.querySelector('.mine-info p:nth-of-type(2) strong');
if (mineButton && progress && status) {
  mineButton.addEventListener('click', () => {
    mineButton.classList.remove('complete');
    mineButton.classList.add('mining');
    mineButton.textContent = 'MINING...';
    status.textContent = 'ACTIVE';
    progress.classList.remove('run');
    progress.classList.add('show');
    void progress.offsetWidth;
    progress.classList.add('run');
    setTimeout(() => {
      mineButton.classList.remove('mining');
      mineButton.classList.add('complete');
      mineButton.textContent = 'EXPEDITION COMPLETE ✓';
      status.textContent = 'COMPLETE';
    }, 3050);
  });
}
