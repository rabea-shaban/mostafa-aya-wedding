import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { WEDDING } from '../data/wedding';
import TiltCard from './TiltCard';

const items = [
  { key: 'days' as const, label: 'يوم' },
  { key: 'hours' as const, label: 'ساعة' },
  { key: 'minutes' as const, label: 'دقيقة' },
  { key: 'seconds' as const, label: 'ثانية' },
];

export default function Countdown() {
  const t = useCountdown(WEDDING.date);

  return (
    <section id="countdown" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-400/[0.03] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gold-400/30" />
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400/60" />
            <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-gold-400/30" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gold-gradient mb-2 sm:mb-3">
            العد التنازلي
          </h2>
          <p className="text-ivory/40 text-sm sm:text-base md:text-lg">الأيام تفصلنا عن الفرحة الكبيرة</p>
        </motion.div>

        <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap">
          {items.map(({ key, label }, i) => (
            <TiltCard key={key} maxTilt={8}>
              <motion.div
                className="glass-strong rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-8 min-w-[72px] sm:min-w-[100px] md:min-w-[130px] text-center relative group cursor-default gold-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-gold-400/[0.04] to-transparent"
                  animate={{ opacity: [0, 0.08, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gold-gradient leading-none tabular-nums mb-1 sm:mb-1.5"
                    key={`v-${t[key]}`}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {String(t[key]).padStart(2, '0')}
                  </motion.div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gold-400/50">{label}</div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
