(() => {
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('.menu');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuIcons = menu ? Array.from(menu.querySelectorAll('i')) : [];
  const desktopBreakpoint = 950;

  const updateHeader = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const setMenuOpen = (open) => {
    if (!menu || !mobileNav) return;
    mobileNav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (menuIcons[0]) menuIcons[0].style.transform = open ? 'translateY(4px) rotate(45deg)' : '';
    if (menuIcons[1]) menuIcons[1].style.transform = open ? 'translateY(-3px) rotate(-45deg)' : '';
  };

  if (menu && mobileNav) {
    menu.addEventListener('click', () => setMenuOpen(menu.getAttribute('aria-expanded') !== 'true'));
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('click', event => {
      if (!header?.contains(event.target)) setMenuOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menu.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > desktopBreakpoint) setMenuOpen(false);
    }, { passive: true });
  }

  const revealTargets = document.querySelectorAll('.intro,.machine-head,.product-stage,.machine-bottom,.details-image,.details-copy,.ritual-media,.ritual-copy,.range-head,.range article,.statement-image,.statement-copy,.journal-main,.journal-side article,.contact-grid');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealTargets.forEach(el => { el.classList.add('reveal'); reveal.observe(el); });
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  const progress = document.querySelector('.scroll-progress');
  const updateScrollProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  updateScrollProgress();

  if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', event => {
      mx = event.clientX; my = event.clientY;
      if (dot && ring) {
        dot.style.opacity = 1; ring.style.opacity = 1;
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      }
    }, { passive: true });
    function cursor() {
      if (ring) {
        rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      }
      requestAnimationFrame(cursor);
    }
    if (ring) cursor();
    document.querySelectorAll('a,button,.gallery-item,.process-card,.product-stage,.details-image,.ritual-media').forEach(el => {
      el.addEventListener('mouseenter', () => ring?.classList.add('active'));
      el.addEventListener('mouseleave', () => ring?.classList.remove('active'));
    });
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', event => {
        const rect = el.getBoundingClientRect();
        el.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.12}px,${(event.clientY - rect.top - rect.height / 2) * 0.12}px)`;
      });
      el.addEventListener('mouseleave', () => el.style.transform = '');
    });
  }

  const initReviewSlider = () => {
    const track = document.getElementById('reviewTrack');
    const nextBtn = document.getElementById('nextReviewBtn');
    if (!track || !nextBtn) return;
    let scrollAmount = 0;
    const getStep = () => {
      const card = track.querySelector('.review-card');
      if (!card) return track.clientWidth;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      return card.getBoundingClientRect().width + gap;
    };
    const moveNext = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      if (maxScroll <= 1) { track.style.transform = 'translateX(0)'; scrollAmount = 0; return; }
      scrollAmount = scrollAmount + getStep() > maxScroll + 1 ? 0 : scrollAmount + getStep();
      track.style.transform = `translateX(-${scrollAmount}px)`;
    };
    nextBtn.addEventListener('click', moveNext);
    window.addEventListener('resize', () => {
      scrollAmount = 0;
      track.style.transform = 'translateX(0)';
    }, { passive: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initReviewSlider, { once: true });
  else initReviewSlider();
})();