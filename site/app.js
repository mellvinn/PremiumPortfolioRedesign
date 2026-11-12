(() => {
  document.documentElement.classList.add("js");
  const S = window.SITE || {};
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cinema = document.querySelector(".cinema");
  const canvas = cinema?.querySelector(".cinema-canvas");
  const frames = S.frames || {};

  if (cinema && canvas && frames.total > 0) {
    cinema.classList.add("has-frames");
    const ctx = canvas.getContext("2d");
    const mobile = matchMedia("(max-width: 760px)").matches;
    const pattern = mobile ? frames.mobile : frames.desktop;
    const stage = cinema.querySelector(".cinema-stage");
    const screenDesktop = cinema.querySelector(".screen-insert--desktop");
    const screenTablet = cinema.querySelector(".screen-insert--tablet");
    const sourceW = mobile ? 1706 : 2048;
    const sourceH = mobile ? 960 : 1152;
    const screenPaths = mobile ? [
      { start: [[320, 174], [1192, 174], [1192, 622], [320, 622]], end: [[235, 88], [1250, 88], [1250, 680], [235, 680]] },
      { start: [[878, 450], [1440, 474], [1410, 790], [855, 765]], end: [[830, 382], [1510, 420], [1480, 824], [790, 790]] },
    ] : [
      { start: [[388, 194], [1411, 207], [1411, 744], [388, 744]], end: [[154, 84], [1404, 91], [1404, 731], [154, 731]] },
      { start: [[1092, 522], [1696, 564], [1657, 951], [1083, 910]], end: [[1008, 452], [1710, 497], [1662, 984], [950, 932]] },
    ];
    const loaded = new Array(frames.total);
    const moments = [...cinema.querySelectorAll(".moment")];
    let current = 0;
    let drawn = -1;

    const frameUrl = (i) => pattern.replace("{n}", String(i + 1).padStart(4, "0"));
    const load = (i) => {
      if (loaded[i]) return loaded[i];
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = () => { if (drawn < 0 || Math.round(current) === i) draw(i); };
      loaded[i] = img;
      return img;
    };
    const ready = (i) => loaded[i]?.complete && loaded[i]?.naturalWidth;
    const positionInsert = (el, path, p) => {
      if (!el || !stage) return;
      const scale = Math.max(stage.clientWidth / sourceW, stage.clientHeight / sourceH);
      const offsetX = (stage.clientWidth - sourceW * scale) / 2;
      const offsetY = (stage.clientHeight - sourceH * scale) / 2;
      const points = path.start.map((point, i) => [
        offsetX + (point[0] + (path.end[i][0] - point[0]) * p) * scale,
        offsetY + (point[1] + (path.end[i][1] - point[1]) * p) * scale,
      ]);
      const xs = points.map((point) => point[0]);
      const ys = points.map((point) => point[1]);
      const left = Math.min(...xs), top = Math.min(...ys);
      const width = Math.max(...xs) - left, height = Math.max(...ys) - top;
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.clipPath = `polygon(${points.map(([x, y]) => `${((x-left)/width)*100}% ${((y-top)/height)*100}%`).join(",")})`;
    };
    const positionScreens = (p) => {
      positionInsert(screenDesktop, screenPaths[0], p);
      positionInsert(screenTablet, screenPaths[1], p);
    };
    const nearest = (i) => {
      for (let d = 0; d < frames.total; d++) {
        if (ready(i - d)) return i - d;
        if (ready(i + d)) return i + d;
      }
      return -1;
    };
    const draw = (i) => {
      const j = nearest(i);
      if (j < 0 || j === drawn) return;
      const img = loaded[j];
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      drawn = j;
    };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawn = -1;
      draw(Math.round(current));
      positionScreens(current / Math.max(1, frames.total - 1));
    };
    const progress = () => {
      const rect = cinema.getBoundingClientRect();
      return Math.min(1, Math.max(0, -rect.top / (cinema.offsetHeight - innerHeight || 1)));
    };
    const paint = () => {
      const target = progress() * (frames.total - 1);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.05) current = target;
      const frame = Math.round(current);
      load(frame);
      draw(frame);
      const p = current / Math.max(1, frames.total - 1);
      positionScreens(p);
      moments.forEach((m) => {
        const start = Number(m.dataset.start || 0);
        const end = Number(m.dataset.end || 1);
        m.classList.toggle("active", p >= start && (p < end || (end >= 1 && p >= 1)));
      });
      cinema.classList.toggle("has-moved", p > 0.02);
      requestAnimationFrame(paint);
    };
    load(0);
    positionScreens(0);
    const queue = [];
    for (const step of [8, 4, 2, 1]) for (let i = 0; i < frames.total; i += step) if (!queue.includes(i)) queue.push(i);
    let pointer = 0;
    const preloadBatch = () => {
      for (let n = 0; n < 6 && pointer < queue.length; n++) load(queue[pointer++]);
      if (pointer < queue.length) setTimeout(preloadBatch, 45);
    };
    preloadBatch();
    addEventListener("resize", resize);
    resize();
    if (!reduceMotion) requestAnimationFrame(paint);
  } else if (cinema) {
    const moments = [...cinema.querySelectorAll(".moment")];
    const progress = () => {
      const rect = cinema.getBoundingClientRect();
      return Math.min(1, Math.max(0, -rect.top / (cinema.offsetHeight - innerHeight || 1)));
    };
    const paint = () => {
      const p = progress();
      moments.forEach((moment) => {
        const start = Number(moment.dataset.start || 0);
        const end = Number(moment.dataset.end || 1);
        moment.classList.toggle("active", p >= start && (p < end || (end >= 1 && p >= 1)));
      });
      cinema.classList.toggle("has-moved", p > 0.02);
      requestAnimationFrame(paint);
    };
    if (reduceMotion) {
      moments.forEach((moment, i) => moment.classList.toggle("active", i === 0));
    } else {
      requestAnimationFrame(paint);
    }
  }

  const header = document.querySelector(".topbar");
  const astronaut = document.querySelector(".astronaut-fall");
  const moveAstronaut = () => {
    if (!astronaut) return;
    const started = scrollY > 8;
    astronaut.classList.toggle("is-visible", started);
    if (reduceMotion || !started) return;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
    const y = -innerHeight * 0.08 + progress * (innerHeight + astronaut.offsetHeight * 0.5);
    const spin = progress * 540 - 18;
    astronaut.style.transform = `translate3d(-50%, ${y}px, 0) rotate(${spin}deg)`;
  };
  const onScroll = () => {
    header?.classList.toggle("scrolled", scrollY > 28);
    moveAstronaut();
  };
  addEventListener("resize", moveAstronaut, { passive: true });
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!reduceMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    document.querySelectorAll(".moment:not(:first-of-type)").forEach((el) => el.hidden = true);
  }

  const introCounters = [...document.querySelectorAll(".intro-facts [data-count]")];
  const formatCount = (value, decimals) => new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  const finishCount = (el) => {
    const decimals = Number(el.dataset.countDecimals || 0);
    el.textContent = `${el.dataset.countPrefix || ""}${formatCount(Number(el.dataset.countEnd), decimals)}${el.dataset.countSuffix || ""}`;
  };
  if (reduceMotion || !("IntersectionObserver" in window)) {
    introCounters.forEach(finishCount);
  } else if (introCounters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target);
        const el = entry.target;
        const target = Number(el.dataset.countEnd);
        const decimals = Number(el.dataset.countDecimals || 0);
        const prefix = el.dataset.countPrefix || "";
        const suffix = el.dataset.countSuffix || "";
        const started = performance.now();
        const duration = 1400;
        const tick = (now) => {
          const progress = Math.min(1, (now - started) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${prefix}${formatCount(target * eased, decimals)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
          else finishCount(el);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.65 });
    introCounters.forEach((el) => countObserver.observe(el));
  }

  document.querySelectorAll("[data-year]").forEach((el) => el.textContent = new Date().getFullYear());
  if (S.artworkReady) {
    document.querySelectorAll("[data-art]").forEach((img) => {
      img.addEventListener("error", () => img.remove(), { once: true });
      img.addEventListener("load", () => img.classList.add("art-ready"), { once: true });
      img.src = img.dataset.src;
    });
  } else {
    document.querySelectorAll("[data-art]").forEach((img) => img.remove());
  }


})();
