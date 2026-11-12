(() => {
  const values = document.querySelectorAll('.case-stat strong[data-count]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const format = (value, decimals) => value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const finish = (el) => {
    const decimals = Number(el.dataset.countDecimals || 0);
    el.textContent = `${el.dataset.countPrefix || ''}${format(Number(el.dataset.countEnd), decimals)}${el.dataset.countSuffix || ''}`;
  };
  if (reduced || !('IntersectionObserver' in window)) {
    values.forEach(finish);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);
      const target = Number(el.dataset.countEnd);
      const decimals = Number(el.dataset.countDecimals || 0);
      const prefix = el.dataset.countPrefix || '';
      const suffix = el.dataset.countSuffix || '';
      const start = performance.now();
      const duration = 1350;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = `${prefix}${format(target * eased, decimals)}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
        else finish(el);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.45 });
  values.forEach((el) => observer.observe(el));
})();
