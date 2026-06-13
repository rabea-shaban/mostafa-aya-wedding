import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

export default function MouseGlow() {
  const { x, y } = useMousePosition(0.06);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[60]"
      aria-hidden
    >
      {/* Main glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 30%, transparent 70%)',
          left: x - 250,
          top: y - 250,
        }}
      />

      {/* Inner glow */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)',
          left: x - 100,
          top: y - 100,
        }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-gold-400/40 pointer-events-none"
        style={{ left: x - 4, top: y - 4 }}
      />
    </motion.div>
  );
}
