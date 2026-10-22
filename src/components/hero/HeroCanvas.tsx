"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };
type Pulse = { horizontal: boolean; line: number; pos: number; speed: number; len: number };

const GRID = 120;

/**
 * Canvas du hero : particules connectées, lignes techniques parcourues
 * par des « signaux », et halo lumineux qui suit le curseur.
 * Pause hors écran / onglet caché, image statique si reduced-motion.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let raf = 0;
    let running = true;

    // Couleurs lues depuis les variables du thème (mises à jour au changement de thème)
    const colors = { dot: "247,244,236", line: "120,201,156", grid: "247,244,236" };
    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors.dot = s.getPropertyValue("--canvas-dot").trim() || colors.dot;
      colors.line = s.getPropertyValue("--canvas-line").trim() || colors.line;
      colors.grid = s.getPropertyValue("--canvas-grid").trim() || colors.grid;
    };
    readColors();
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduce) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? 28 : 64;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.2 + 0.4,
      }));
      pulses = Array.from({ length: w < 768 ? 3 : 6 }, () => newPulse());
    };

    const newPulse = (): Pulse => {
      const horizontal = Math.random() > 0.5;
      const lines = Math.floor((horizontal ? h : w) / GRID);
      return {
        horizontal,
        line: (Math.floor(Math.random() * Math.max(lines, 1)) + 1) * GRID,
        pos: -200,
        speed: 1.2 + Math.random() * 2.2,
        len: 120 + Math.random() * 120,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Grille technique
      ctx.strokeStyle = `rgba(${colors.grid},0.045)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = GRID; x < w; x += GRID) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
      for (let y = GRID; y < h; y += GRID) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
      ctx.stroke();

      // Signaux le long des lignes
      for (const p of pulses) {
        const max = p.horizontal ? w : h;
        if (!reduce) p.pos += p.speed;
        if (p.pos - p.len > max) Object.assign(p, newPulse());
        const [x1, y1, x2, y2] = p.horizontal
          ? [p.pos - p.len, p.line, p.pos, p.line]
          : [p.line, p.pos - p.len, p.line, p.pos];
        ctx.strokeStyle = `rgba(${colors.line},0.4)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1 + 0.5, y1 + 0.5);
        ctx.lineTo(x2 + 0.5, y2 + 0.5);
        ctx.stroke();
      }

      // Halo curseur
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      // Particules + connexions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 180) {
            p.x -= (dx / d) * 0.25;
            p.y -= (dy / d) * 0.25;
          }
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${colors.line},${0.16 * (1 - d / 130)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${colors.dot},0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (running) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -1000) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };

    const io = new IntersectionObserver(([entry]) => (running = entry.isIntersecting));
    const onVisibility = () => (running = !document.hidden);

    resize();
    if (reduce) draw();
    else {
      loop();
      io.observe(canvas);
      window.addEventListener("pointermove", onMove);
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
