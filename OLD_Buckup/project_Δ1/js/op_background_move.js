// ==========================================================
// Laser Fiber + Cursor-following Sugoroku Quiz Orbs (merged)
// PATCH: Orb text is randomized on each page load
// PATCH: Background clears to black (no permanent trails)
// ==========================================================
(() => {
  const canvas = document.getElementById('fiber');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  // ---- Config ----
  const TRAIL_MODE = false; // true = mild trails, false = always clear
  const BG_RGB = [2, 4, 12];

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- DPR-aware resize ----------
  let w = 0, h = 0, dpr = 1;
  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = Math.max(1, window.innerWidth);
    h = Math.max(1, window.innerHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ---------- Pointer ----------
  const pointer = { x: w * 0.5, y: h * 0.5, tx: w * 0.5, ty: h * 0.5, active: false };
  const onMove = (x, y) => { pointer.tx = x; pointer.ty = y; pointer.active = true; };
  window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchstart', (e) => { const t = e.touches && e.touches[0]; if (t) onMove(t.clientX, t.clientY); }, { passive: true });
  window.addEventListener('touchmove', (e) => { const t = e.touches && e.touches[0]; if (t) onMove(t.clientX, t.clientY); }, { passive: true });

  // ---------- Utilities ----------
  const rand = (min, max) => min + Math.random() * (max - min);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // ---------- Orb Text Pool (random each page load) ----------
  // User-provided tokens + safe additions (Ultraman / mountains related)
  const TEXT_POOL = [
    // Programming / code
    'HTML', 'CSS', 'JavaScript', 'PHP', 'let', 'var', 'damp()', 'count()', 'function', 'if',
    // Capitals / places
    'Tokyo', 'New Delhi', 'London', 'Paris', 'Kuala Lumpur', 'District of Columbia', 'Canberra',
    // Ultraman related terms
    'Ultra Man', 'Kaiju', 'Color Timer', 'Specium Ray', 'Land of Light', 'Nebula M78',
    // Mountains related terms
    'Mountains', 'mountain', 'peak', 'summit', 'ridge', 'trail', 'alpine', 'hike', 'ascent', 'elevation', 'volcano', 'crater'
  ];

  // Shuffle once per page load so each refresh feels different but stable per orb
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const shuffledPool = shuffle(TEXT_POOL.slice());
  let poolIndex = 0;
  function pickText() {
    const t = shuffledPool[poolIndex % shuffledPool.length];
    poolIndex++;
    return t;
  }

  // ==========================================================
  // Part A) Fiber nodes + floating code + lasers
  // ==========================================================
  const NODES = reduceMotion ? 28 : 45;
  const MAX_DIST = 230;

  const nodes = Array.from({ length: NODES }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    phase: Math.random() * Math.PI * 2,
  }));

  const codeSnippets = [
    'const x = 10;',
    'let count = 0;',
    'function hello(){',
    " console.log('Hello');",
    '}',
    'for(let i=0;i<5;i++){}',
    'if(a > b) return;',
    'const sum = (a,b)=>a+b;'
  ];

  const floatingCodes = Array.from({ length: reduceMotion ? 6 : 12 }, () => ({
    text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
    x: Math.random() * w,
    y: Math.random() * h,
    speed: 0.3 + Math.random() * 0.5,
    alpha: 0.25 + Math.random() * 0.5,
  }));

  const lasers = [];
  function spawnLaser() {
    lasers.push({
      x: Math.random() * w,
      y: Math.random() * h,
      angle: Math.random() * Math.PI * 2,
      life: 0,
    });
  }
  const laserIntervalMs = reduceMotion ? 700 : 400;
  const laserTimer = setInterval(spawnLaser, laserIntervalMs);

  function stepFiberAndLasers(dt) {
    for (const n of nodes) {
      n.x += n.vx * dt * 60;
      n.y += n.vy * dt * 60;
      n.phase += 0.02 * dt * 60;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    for (const l of lasers) l.life += 0.05 * dt * 60;
    for (let i = lasers.length - 1; i >= 0; i--) {
      if (lasers[i].life > 3) lasers.splice(i, 1);
    }

    for (const c of floatingCodes) {
      c.y -= c.speed * dt * 60;
      if (c.y < -20) {
        c.y = h + 20;
        c.x = Math.random() * w;
      }
    }
  }

  function drawFiber() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          const glow = 0.4 + 0.6 * Math.sin((a.phase + b.phase) / 2);
          const finalAlpha = alpha * glow * 0.65;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(0,255,255,${finalAlpha})`);
          grad.addColorStop(1, `rgba(0,120,255,${finalAlpha * 0.7})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const r = 2.5 + 1.2 * Math.sin(n.phase);
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
      g.addColorStop(0, 'rgba(0,255,255,0.9)');
      g.addColorStop(0.4, 'rgba(0,180,255,0.6)');
      g.addColorStop(1, 'rgba(0,40,80,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ccfaff';
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFloatingCodes() {
    ctx.save();
    ctx.font = '16px monospace';
    for (const c of floatingCodes) {
      ctx.globalAlpha = c.alpha;
      ctx.fillStyle = '#00eaff';
      ctx.fillText(c.text, c.x, c.y);
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawLasers() {
    ctx.save();
    ctx.lineWidth = 2;
    for (const l of lasers) {
      const length = 200 + Math.sin(l.life) * 80;
      const x2 = l.x + Math.cos(l.angle) * length;
      const y2 = l.y + Math.sin(l.angle) * length;
      const alpha = Math.max(0, 1 - l.life / 3);
      ctx.strokeStyle = `rgba(0,255,180,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ==========================================================
  // Part B) Orbs (Sugoroku + icons) with randomized text
  // ==========================================================
  const palette = {
    cyan:   { core: [  0, 255, 234], edge: [  0, 120, 255] },
    yellow: { core: [252, 255,  76], edge: [255, 170,   0] },
    purple: { core: [190, 120, 255], edge: [118,  75, 162] },
    mint:   { core: [  0, 255, 180], edge: [  0, 160, 255] },
  };

  const CATS = [
    { key: 'code',    colors: palette.cyan },
    { key: 'capital', colors: palette.mint },
    { key: 'ultra',   colors: palette.purple },
    { key: 'mount',   colors: palette.yellow },
    { key: 'board',   colors: palette.cyan },
  ];

  function drawRoundedRect(x, y, ww, hh, rr) {
    const r = Math.min(rr, ww * 0.5, hh * 0.5);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + ww, y, x + ww, y + hh, r);
    ctx.arcTo(x + ww, y + hh, x, y + hh, r);
    ctx.arcTo(x, y + hh, x, y, r);
    ctx.arcTo(x, y, x + ww, y, r);
    ctx.closePath();
  }

  function drawDice(px, py, size, alpha = 0.85) {
    ctx.save();
    ctx.translate(px, py);
    ctx.globalAlpha = alpha;
    drawRoundedRect(-size/2, -size/2, size, size, size*0.18);
    ctx.fillStyle = 'rgba(252,255,76,0.18)';
    ctx.strokeStyle = 'rgba(252,255,76,0.55)';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    const pip = (x, y) => { ctx.beginPath(); ctx.arc(x, y, size*0.07, 0, Math.PI*2); ctx.fill(); };
    ctx.fillStyle = 'rgba(0,255,234,0.75)';
    const o = size * 0.2;
    pip(-o, -o); pip(o, o); pip(0, 0);
    ctx.restore();
  }

  function drawBoardRing(R, alpha = 0.55) {
    const n = 10;
    ctx.save();
    ctx.globalAlpha = alpha;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const x = Math.cos(a) * R * 0.92;
      const y = Math.sin(a) * R * 0.92;
      const s = R * 0.16;
      drawRoundedRect(x - s/2, y - s/2, s, s, s*0.25);
      ctx.fillStyle = (i % 2 === 0) ? 'rgba(252,255,76,0.12)' : 'rgba(0,255,234,0.10)';
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawCodeIcon(R) {
    ctx.save();
    ctx.globalAlpha = 0.65;
    ctx.strokeStyle = 'rgba(0,255,234,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-R*0.25, -R*0.08); ctx.lineTo(-R*0.38, 0); ctx.lineTo(-R*0.25, R*0.08);
    ctx.moveTo(R*0.25, -R*0.08); ctx.lineTo(R*0.38, 0); ctx.lineTo(R*0.25, R*0.08);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-R*0.08, R*0.14); ctx.lineTo(R*0.08, -R*0.14);
    ctx.stroke();
    ctx.restore();
  }

  function drawCapitalIcon(R) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = 'rgba(0,255,180,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, R*0.22, 0, Math.PI*2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, R*0.22, -Math.PI/2, Math.PI/2);
    ctx.arc(0, 0, R*0.22, Math.PI/2, -Math.PI/2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(252,255,76,0.40)';
    ctx.beginPath();
    ctx.arc(R*0.18, -R*0.15, R*0.07, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(252,255,76,0.55)';
    ctx.stroke();
    ctx.restore();
  }

  function drawUltraIcon(R) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    const grad = ctx.createLinearGradient(-R*0.3, -R*0.3, R*0.3, R*0.3);
    grad.addColorStop(0, 'rgba(190,120,255,0.55)');
    grad.addColorStop(1, 'rgba(0,255,234,0.35)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    const rays = 10;
    for (let i = 0; i < rays; i++) {
      const a = (i / rays) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * R*0.10, Math.sin(a) * R*0.10);
      ctx.lineTo(Math.cos(a) * R*0.28, Math.sin(a) * R*0.28);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.arc(0, 0, R*0.10, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function drawMountainIcon(R) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = 'rgba(252,255,76,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-R*0.30, R*0.18);
    ctx.lineTo(-R*0.08, -R*0.18);
    ctx.lineTo(R*0.08, R*0.18);
    ctx.moveTo(-R*0.02, R*0.18);
    ctx.lineTo(R*0.22, -R*0.10);
    ctx.lineTo(R*0.34, R*0.18);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.beginPath();
    ctx.moveTo(-R*0.12, -R*0.06); ctx.lineTo(-R*0.08, -R*0.18); ctx.lineTo(-R*0.04, -R*0.08);
    ctx.moveTo(R*0.20, -R*0.02); ctx.lineTo(R*0.22, -R*0.10); ctx.lineTo(R*0.26, -R*0.03);
    ctx.stroke();
    ctx.restore();
  }

  function drawLabel(text, R) {
    ctx.save();
    ctx.globalAlpha = 0.32;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = `bold ${Math.max(10, Math.floor(R*0.15))}px 'Kiwi Maru', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Allow simple line breaks for long tokens (optional)
    const lines = String(text).split('\n');
    const lh = Math.max(12, Math.floor(R*0.18));
    const y0 = -(lines.length - 1) * lh * 0.5;
    for (let i = 0; i < lines.length; i++) ctx.fillText(lines[i], 0, y0 + i * lh);
    ctx.restore();
  }

  class Orb {
    constructor(i) {
      this.i = i;
      this.cat = CATS[i % CATS.length];
      this.text = pickText();
      this.reset(true);
    }
    reset(initial = false) {
      const { core, edge } = this.cat.colors;
      this.core = core;
      this.edge = edge;
      this.r = rand(70, 170);
      this.x = initial ? rand(0, w) : rand(-this.r, w + this.r);
      this.y = initial ? rand(0, h) : rand(-this.r, h + this.r);
      this.vx = rand(-0.35, 0.35);
      this.vy = rand(-0.35, 0.35);
      this.phase = rand(0, Math.PI * 2);
    }
    step(dt) {
      this.phase += dt * 0.6;
      const drift = 0.12;
      this.vx += (Math.sin(this.phase + this.i) * drift) * dt;
      this.vy += (Math.cos(this.phase * 0.9 + this.i) * drift) * dt;

      const dx = pointer.x - this.x;
      const dy = pointer.y - this.y;
      const dist = Math.hypot(dx, dy) || 1;
      const influence = 560;
      const t = 1 - clamp(dist / influence, 0, 1);
      const strength = (reduceMotion ? 0.035 : 0.085) * (t ** 1.6);
      this.vx += (dx / dist) * strength * dt * 60;
      this.vy += (dy / dist) * strength * dt * 60;

      const maxV = reduceMotion ? 0.6 : 1.4;
      const v = Math.hypot(this.vx, this.vy) || 1;
      if (v > maxV) { this.vx = (this.vx / v) * maxV; this.vy = (this.vy / v) * maxV; }
      this.vx *= 0.985;
      this.vy *= 0.985;

      this.x += this.vx * dt * 60;
      this.y += this.vy * dt * 60;

      const m = this.r * 1.2;
      if (this.x < -m) this.x = w + m;
      if (this.x > w + m) this.x = -m;
      if (this.y < -m) this.y = h + m;
      if (this.y > h + m) this.y = -m;
    }
    draw() {
      const pulse = 1 + Math.sin(this.phase) * 0.06;
      const R = this.r * pulse;

      const g = ctx.createRadialGradient(this.x - R * 0.18, this.y - R * 0.18, R * 0.05, this.x, this.y, R);
      const a1 = reduceMotion ? 0.24 : 0.34;
      const a2 = reduceMotion ? 0.00 : 0.02;
      g.addColorStop(0.0, `rgba(${this.core[0]},${this.core[1]},${this.core[2]},${a1})`);
      g.addColorStop(0.55, `rgba(${this.edge[0]},${this.edge[1]},${this.edge[2]},${a1 * 0.55})`);
      g.addColorStop(1.0, `rgba(${this.edge[0]},${this.edge[1]},${this.edge[2]},${a2})`);

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(this.x, this.y, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(this.x, this.y);

      // sugoroku board ring
      drawBoardRing(R, 0.24);

      // icon by category (style stays)
      switch (this.cat.key) {
        case 'code':    drawCodeIcon(R); break;
        case 'capital': drawCapitalIcon(R); break;
        case 'ultra':   drawUltraIcon(R); break;
        case 'mount':   drawMountainIcon(R); break;
        case 'board':
          ctx.globalAlpha = 0.5;
          ctx.strokeStyle = 'rgba(252,255,76,0.35)';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 8]);
          ctx.beginPath();
          ctx.arc(0, 0, R*0.45, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          break;
      }

      // randomized text (the only thing the user asked to change)
      drawLabel(this.text, R);

      ctx.restore();
    }
  }

  const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  const ORB_COUNT = reduceMotion ? (isMobile ? 6 : 9) : (isMobile ? 10 : 16);
  const orbs = Array.from({ length: ORB_COUNT }, (_, i) => new Orb(i));

  const cursorOrb = {
    x: pointer.x, y: pointer.y, r: 22,
    draw() {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
      g.addColorStop(0, 'rgba(252,255,76,0.55)');
      g.addColorStop(0.35, 'rgba(0,255,234,0.22)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
      ctx.fill();
      drawDice(this.x + 34, this.y - 26, 28, 0.75);
    }
  };

  // ==========================================================
  // Master loop
  // ==========================================================
  let last = performance.now();
  let running = true;

  function clearBackground() {
    ctx.globalCompositeOperation = 'source-over';
    if (TRAIL_MODE) {
      const fade = reduceMotion ? 0.28 : 0.20;
      ctx.fillStyle = `rgba(${BG_RGB[0]}, ${BG_RGB[1]}, ${BG_RGB[2]}, ${fade})`;
    } else {
      ctx.fillStyle = `rgba(${BG_RGB[0]}, ${BG_RGB[1]}, ${BG_RGB[2]}, 1)`;
    }
    ctx.fillRect(0, 0, w, h);
  }

  function tick(now) {
    if (!running) return;
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;

    const follow = reduceMotion ? 0.18 : 0.12;
    pointer.x += (pointer.tx - pointer.x) * (1 - Math.pow(1 - follow, dt * 60));
    pointer.y += (pointer.ty - pointer.y) * (1 - Math.pow(1 - follow, dt * 60));

    clearBackground();

    stepFiberAndLasers(dt);
    for (const o of orbs) o.step(dt);

    ctx.globalCompositeOperation = 'source-over';
    drawFiber();

    ctx.globalCompositeOperation = 'lighter';
    drawLasers();

    ctx.globalCompositeOperation = 'source-over';
    if (!reduceMotion) drawFloatingCodes();

    ctx.globalCompositeOperation = 'lighter';
    for (const o of orbs) o.draw();

    cursorOrb.x += (pointer.x - cursorOrb.x) * 0.35;
    cursorOrb.y += (pointer.y - cursorOrb.y) * 0.35;
    if (pointer.active) cursorOrb.draw();

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
    } else {
      running = true;
      last = performance.now();
      requestAnimationFrame(tick);
    }
  });

  clearBackground();
  requestAnimationFrame(tick);

  window.addEventListener('beforeunload', () => clearInterval(laserTimer));
})();
