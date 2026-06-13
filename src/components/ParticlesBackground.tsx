import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  life: number; maxLife: number;
}

export default function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cvs = canvas;
    const cctx = ctx;
    let animId = 0;
    let particles: Particle[] = [];
    let w = 0; let h = 0;

    function resize() {
      w = cvs.width = window.innerWidth;
      h = cvs.height = window.innerHeight;
    }

    function create(): Particle {
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.8 + 0.4, alpha: Math.random() * 0.4 + 0.1,
        life: 0, maxLife: Math.random() * 300 + 200,
      };
    }

    function init() {
      particles = [];
      const count = Math.min(80, (w * h) / 15000);
      for (let i = 0; i < count; i++) particles.push(create());
    }

    function tick() {
      cctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life > p.maxLife || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
          particles[i] = create(); continue;
        }
        const a = p.alpha * (1 - p.life / p.maxLife);
        cctx.beginPath();
        cctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        cctx.fillStyle = `rgba(212,175,55,${a})`;
        cctx.fill();
        cctx.beginPath();
        cctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        cctx.fillStyle = `rgba(212,175,55,${a * 0.15})`;
        cctx.fill();
      }
      animId = requestAnimationFrame(tick);
    }

    resize(); init(); tick();
    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0 size-full" />;
}
