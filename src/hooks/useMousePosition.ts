import { useState, useEffect, useRef } from 'react';

interface MousePos { x: number; y: number; }

export function useMousePosition(smoothFactor = 0.08) {
  const [pos, setPos] = useState<MousePos>({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const fn = useRef<() => void>(undefined);

  fn.current = function tick() {
    setPos((prev) => ({
      x: prev.x + (target.current.x - prev.x) * smoothFactor,
      y: prev.y + (target.current.y - prev.y) * smoothFactor,
    }));
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    function onMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(() => fn.current?.());
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return pos;
}

export function useMouseElement<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const $el = ref.current;
    if (!$el) return;

    function onMove(e: MouseEvent) {
      const rect = $el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      setTilt({
        rx: (py - 0.5) * -12,
        ry: (px - 0.5) * 12,
      });
    }

    function onLeave() {
      setTilt({ rx: 0, ry: 0 });
    }

    const parent = $el.closest('section') || $el.parentElement;
    parent?.addEventListener('mousemove', onMove);
    parent?.addEventListener('mouseleave', onLeave);

    return () => {
      parent?.removeEventListener('mousemove', onMove);
      parent?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return { ref, tilt };
}
