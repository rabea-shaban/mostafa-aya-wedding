import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { WEDDING } from '../data/wedding';

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease } },
};

function SparkleDot({ delay = 0, style }: { delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold-400/60"
      style={style}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
        y: [0, -15, 0],
      }}
      transition={{ duration: 2.5, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

export default function Hero() {
  const t = useCountdown(WEDDING.date);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useSpring(useTransform(scrollY, [0, 800], [1, 1.08]), { stiffness: 40, damping: 30 });
  const titleY = useTransform(scrollY, [0, 500], [0, -80]);

  const counts = [
    { label: 'يوم', val: t.days },
    { label: 'ساعة', val: t.hours },
    { label: 'دقيقة', val: t.minutes },
    { label: 'ثانية', val: t.seconds },
  ];

  return (
    <motion.section
      id="hero"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 via-60% to-navy-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.12),transparent_70%)]" />
        <motion.div
          className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gold-400/5 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-gold-300/5 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </motion.div>

      {/* Light beams */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[15, 25, 35, 45, 55, 65].map((pct, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px h-[200%] bg-gradient-to-b from-transparent via-gold-400/10 to-transparent"
            style={{ left: `${pct}%`, transform: `rotate(${-18 + i * 7}deg)`, transformOrigin: 'top' }}
            animate={{ y: ['-50%', '50%'], opacity: [0, 0.35, 0] }}
            transition={{ duration: 8 + i * 1.2, repeat: Infinity, delay: i * 0.7, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[
          [15, 20], [25, 75], [40, 10], [55, 85], [70, 30], [85, 60],
          [10, 50], [30, 90], [50, 5], [65, 70], [80, 15], [90, 45],
        ].map(([t, l], i) => (
          <SparkleDot
            key={i}
            delay={i * 0.4}
            style={{ top: `${t}%`, left: `${l}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Ornament */}
        <motion.div className="flex items-center justify-center gap-3 mb-6 sm:mb-8" variants={fadeUp}>
          <motion.div
            className="w-8 sm:w-16 h-px bg-gradient-to-l from-gold-400/40 to-transparent"
            animate={{ scaleX: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-gold-400/20 flex items-center justify-center gold-border-glow p-2 sm:p-3 overflow-hidden">
              <img
                src="/monogram.png"
                alt="شعار م & أ"
                className="w-full h-full object-contain select-none"
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(191, 149, 63, 0.5))'
                }}
              />
            </div>
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold-400/80"
                style={{
                  top: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
                  left: `${50 + 42 * Math.cos((deg * Math.PI) / 180)}%`,
                }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </motion.div>
          <motion.div
            className="w-8 sm:w-16 h-px bg-gradient-to-r from-gold-400/40 to-transparent"
            animate={{ scaleX: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </motion.div>

        {/* Bismillah */}
        <motion.p className="text-gold-400/50 text-sm sm:text-base md:text-lg tracking-[0.2em] mb-3 sm:mb-4" variants={fadeUp}>
          — بسم الله الرحمن الرحيم —
        </motion.p>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display gold-gradient leading-none mb-4 sm:mb-6 select-none font-bold"
          variants={zoomIn}
          style={{ y: titleY }}
        >
          حفل زفاف
        </motion.h1>

        <motion.div
          className="w-16 sm:w-24 h-px gold-gradient-solid mx-auto mb-6 sm:mb-8 rounded-full"
          variants={fadeUp}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Names replaced by monogram */}
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          variants={fadeUp}
        >
          <div className="w-36 h-48 sm:w-56 sm:h-72">
            <img 
              src="/monogram.png" 
              alt="شعار م & أ" 
              className="w-full h-full object-contain select-none"
              style={{
                filter: 'sepia(1) saturate(6) hue-rotate(-10deg) brightness(0.95) drop-shadow(0 0 12px rgba(191, 149, 63, 0.45))'
              }}
            />
          </div>
        </motion.div>

        <motion.p className="text-gold-300/60 text-base sm:text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-3" variants={fadeUp}>
          يتشرفان بدعوتكم لحضور حفل زفافهما بإذن الله
        </motion.p>

        <motion.p className="text-ivory/40 text-sm sm:text-base mb-8 sm:mb-10" variants={fadeUp}>
          {WEDDING.dateLabel} — {WEDDING.timeLabel}
        </motion.p>

        {/* Countdown */}
        <motion.div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-10" variants={fadeUp}>
          {counts.map((c) => (
            <motion.div
              key={c.label}
              className="glass rounded-xl sm:rounded-2xl px-2.5 py-2.5 sm:px-5 sm:py-4 min-w-[56px] sm:min-w-[88px] gold-border-glow cursor-default"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 15px rgba(212,175,55,0.15)', '0 0 35px rgba(212,175,55,0.3)', '0 0 15px rgba(212,175,55,0.15)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="text-xl sm:text-2xl md:text-4xl font-bold gold-gradient leading-none tabular-nums"
                key={`v-${c.val}`}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {String(c.val).padStart(2, '0')}
              </motion.div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gold-400/50 mt-1 sm:mt-1.5">{c.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full gold-gradient-solid text-navy-950 font-bold text-base sm:text-lg overflow-hidden transition-all duration-500 focus-visible:outline-2 focus-visible:outline-gold-400"
          variants={fadeUp}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 0 50px rgba(212,175,55,0.4), 0 0 100px rgba(212,175,55,0.15)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <span className="relative z-10">استكشف تفاصيل المناسبة</span>
          <ChevronDown className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-gold-400/20 flex justify-center pt-1.5 sm:pt-2">
          <motion.div
            className="w-1 h-1.5 sm:h-2 rounded-full bg-gold-400/50"
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
