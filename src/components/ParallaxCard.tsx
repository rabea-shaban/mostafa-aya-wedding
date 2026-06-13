import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxCard({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
