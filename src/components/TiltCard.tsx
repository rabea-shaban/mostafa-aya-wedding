import { motion } from 'framer-motion';
import { useMouseElement } from '../hooks/useMousePosition';

interface Props {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({ children, className = '', maxTilt = 10 }: Props) {
  const { ref, tilt } = useMouseElement<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: 1000 }}
      animate={{
        rotateX: tilt.rx * (maxTilt / 12),
        rotateY: tilt.ry * (maxTilt / 12),
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
