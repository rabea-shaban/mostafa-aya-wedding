import { memo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

interface Element {
  Icon: typeof Heart;
  x: string; y: string;
  size: number; delay: number; duration: number;
}

const el: Element[] = [
  { Icon: Heart, x: '5%', y: '15%', size: 18, delay: 0, duration: 7 },
  { Icon: Sparkles, x: '90%', y: '25%', size: 16, delay: 0.8, duration: 8 },
  { Icon: Star, x: '15%', y: '75%', size: 14, delay: 1.6, duration: 6.5 },
  { Icon: Heart, x: '80%', y: '70%', size: 20, delay: 0.4, duration: 7.5 },
  { Icon: Sparkles, x: '45%', y: '10%', size: 15, delay: 2, duration: 9 },
  { Icon: Heart, x: '70%', y: '85%', size: 14, delay: 1.2, duration: 6 },
  { Icon: Sparkles, x: '25%', y: '88%', size: 12, delay: 2.5, duration: 7 },
  { Icon: Star, x: '92%', y: '50%', size: 13, delay: 0.6, duration: 8.5 },
  { Icon: Heart, x: '50%', y: '92%', size: 16, delay: 3, duration: 7 },
  { Icon: Sparkles, x: '8%', y: '45%', size: 11, delay: 1.8, duration: 6 },
];

function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {el.map((e, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: e.x, top: e.y }}
          animate={{
            y: [0, -25 - i * 3, 5, -10, 0],
            x: [0, 10 + i * 2, -8, 5, 0],
            opacity: [0.2, 0.6, 0.2, 0.4, 0.2],
            scale: [1, 1.15, 0.95, 1.05, 1],
          }}
          transition={{
            duration: e.duration, repeat: Infinity, delay: e.delay, ease: 'easeInOut',
          }}
        >
          <e.Icon size={e.size} className="text-gold-400/20" />
        </motion.div>
      ))}
    </div>
  );
}

export default memo(FloatingElements);
