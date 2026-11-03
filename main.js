(() => {
  // nav: solid on scroll, current page, mobile toggle
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const here = location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('li a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('current');
  });
  const btn = nav.querySelector('.menu-btn'), list = nav.querySelector('ul');
  if (btn) btn.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    nav.classList.add('is-solid');
    btn.setAttribute('aria-expanded', open);
  });

  // reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el);
  });

  // lightbox for any image marked data-zoom (or inside a .zoomable container)
  const lb = document.getElementById('lb');
  if (lb) {
    const lbImg = lb.querySelector('img');
    document.querySelectorAll('[data-zoom], .zoomable img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
        lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
      });
    });
    const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };
    lb.addEventListener('click', closeLb);
    addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }

  // today's hours (Arizona has no DST, UTC-7 all year)
  const az = new Date(Date.now() - 7 * 3600 * 1000);
  const row = document.querySelector('.hours li[data-d="' + az.getUTCDay() + '"]');
  if (row) row.classList.add('today');

  // open / closed badge
  const badge = document.getElementById('openNow');
  if (badge) {
    const d = az.getUTCDay(), m = az.getUTCHours() * 60 + az.getUTCMinutes();
    const win = d === 0 ? [11 * 60, 19 * 60] : d === 1 ? null : [10 * 60 + 30, 20 * 60];
    const open = win && m >= win[0] && m < win[1];
    badge.textContent = open ? 'Open now' : (d === 1 ? 'Closed Mondays' : 'Closed now');
    badge.classList.add(open ? 'is-open' : 'is-closed');
  }

  // count-up numbers
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = el => {
      const end = +el.dataset.count, dec = +(el.dataset.dec || 0), t0 = performance.now(), dur = 1400;
      const tick = now => {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = (end * e).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
      };
      reduce ? el.textContent = end.toFixed(dec) : requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); }
    }), { threshold: 0.5 });
    counters.forEach(c => cio.observe(c));
  }

  document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());
})();
