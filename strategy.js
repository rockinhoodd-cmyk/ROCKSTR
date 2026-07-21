/* $ROCKSTR — strategy page interactions */

// ---------- Nav ----------
const nav = document.querySelector('.nav-wrap');
const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 20);
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

const menu = document.querySelector('.menu-button');
const links = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// ---------- Rock asset fallback (SVG shows if assets/rob-rock.png is missing) ----------
document.querySelectorAll('.rock-img').forEach(img => {
  img.addEventListener('error', () => img.closest('.rock-disc, .rock-mini').classList.add('no-rock-asset'));
});

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -35px' });
document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// ---------- CA copy (hidden until a real address is set) ----------
const caCode = document.querySelector('#caAddress');
const copyBtn = document.querySelector('#copyCa');
if (caCode && copyBtn && !caCode.textContent.includes('TBA')) {
  copyBtn.hidden = false;
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(caCode.textContent.trim());
      copyBtn.textContent = 'COPIED ✓';
      setTimeout(() => (copyBtn.textContent = 'COPY'), 1600);
    } catch (e) { /* clipboard unavailable */ }
  });
}

// ---------- Hero loop: dot travels the ring, stations light up in order ----------
const loopRing = document.querySelector('.loop-ring');
const loopDot = document.querySelector('#loopDot');
const loopNodes = [...document.querySelectorAll('.loop-node')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (loopRing && loopDot && !reducedMotion) {
  const LOOP_SECONDS = 15;
  let start = performance.now();
  const tick = (now) => {
    const progress = ((now - start) / (LOOP_SECONDS * 1000)) % 1;
    const angle = progress * Math.PI * 2 - Math.PI / 2; // start at the top (TRADE)
    const r = loopRing.offsetWidth / 2;
    loopDot.style.left = (r + Math.cos(angle) * r) + 'px';
    loopDot.style.top = (r + Math.sin(angle) * r) + 'px';
    const step = Math.floor(((progress + 0.06) % 1) * 5); // light slightly ahead of arrival
    loopNodes.forEach(n => n.classList.toggle('active', Number(n.dataset.step) === step));
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
} else if (loopNodes.length) {
  loopNodes[0].classList.add('active');
}

// ---------- Machine simulation ----------
const simButton = document.querySelector('#simButton');
const simPhase = document.querySelector('#simPhase');
const simPool = document.querySelector('#simPool');
const simBar = document.querySelector('#simBar');
const simLedger = document.querySelector('#simLedger');
const simRock = document.querySelector('#simRock');

const SIM = { floor: 0.0008, thresholdMult: 2, relistMult: 1.5 };
const fmtEth = v => v.toFixed(4) + ' ETH';
const wait = ms => new Promise(res => setTimeout(res, ms));

function log(text, tag, lime = false) {
  const empty = simLedger.querySelector('.ledger-empty');
  if (empty) empty.remove();
  const line = document.createElement('div');
  line.className = 'ledger-line' + (lime ? ' lime' : '');
  line.innerHTML = `<b>${text}</b><span>${tag}</span>`;
  simLedger.prepend(line);
  while (simLedger.children.length > 6) simLedger.lastChild.remove();
}

if (simButton) {
  simButton.addEventListener('click', async () => {
    const threshold = SIM.floor * SIM.thresholdMult;
    simButton.classList.add('running');
    simButton.textContent = 'LOOP RUNNING…';

    // 1–2: fees accumulate
    simPhase.textContent = 'ACCUMULATING';
    let pool = 0;
    while (pool < threshold) {
      await wait(reducedMotion ? 40 : 320);
      pool = Math.min(threshold, pool + 0.0002 + Math.random() * 0.0002);
      simPool.textContent = `${pool.toFixed(4)} / ${threshold.toFixed(4)} ETH`;
      simBar.style.width = (pool / threshold * 100) + '%';
      log(`+${fmtEth(0.0002)} fee → pool`, 'TRADE');
    }

    // 3: acquisition
    await wait(500);
    simPhase.textContent = 'ACQUIRING';
    const rockId = Math.floor(Math.random() * 333) + 1;
    simRock.classList.add('acquired');
    log(`Rock #${rockId} acquired @ ${fmtEth(SIM.floor)}`, 'FLOOR BUY', true);
    pool -= SIM.floor;
    simPool.textContent = `${pool.toFixed(4)} / ${threshold.toFixed(4)} ETH`;
    simBar.style.width = (pool / threshold * 100) + '%';

    // 4: relist
    await wait(1100);
    simPhase.textContent = 'LISTED';
    const listPrice = SIM.floor * SIM.relistMult;
    log(`Rock #${rockId} listed @ ${fmtEth(listPrice)} (1.5×)`, 'RELIST');

    // 5: sale + burn
    await wait(1400);
    simPhase.textContent = 'BURNING';
    log(`Rock #${rockId} sold — 100% to buyback`, 'SALE', true);
    await wait(700);
    const burned = Math.floor(80000 + Math.random() * 90000);
    log(`${burned.toLocaleString('en-US')} $ROCKSTR burned 🔥`, 'BURN', true);

    // reset
    await wait(900);
    simRock.classList.remove('acquired');
    simPhase.textContent = 'ACCUMULATING';
    simButton.classList.remove('running');
    simButton.textContent = 'RUN THE LOOP AGAIN';
  });
}
