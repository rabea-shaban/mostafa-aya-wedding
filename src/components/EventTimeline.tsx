import { motion } from 'framer-motion';
import { WEDDING } from '../data/wedding';
import TiltCard from './TiltCard';

const ease = [0.16, 1, 0.3, 1] as const;

export default function EventTimeline() {
  return (
    <section id="timeline" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-400/[0.02] via-transparent to-gold-400/[0.02]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gold-gradient mb-2 sm:mb-3">
            جدول المناسبة
          </h2>
          <p className="text-ivory/40 text-sm sm:text-base md:text-lg">تفاصيل حفل زفافنا</p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="hidden md:block absolute right-1/2 translate-x-px top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, rgba(212,175,55,0.4), rgba(212,175,55,0.15), transparent)',
            }}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
          />

          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {WEDDING.timeline.map((item, i) => (
              <motion.div
                key={i}
                className="relative flex items-center gap-3 sm:gap-4 md:gap-8 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease }}
              >
                {/* Content */}
                <div className="flex-1 md:pl-8 text-right">
                  <TiltCard maxTilt={6}>
                    <div className="glass-strong rounded-xl sm:rounded-2xl p-3.5 sm:p-5 md:p-6 relative overflow-hidden gold-shadow transition-all duration-500 group-hover:border-gold-400/30 border border-gold-400/5">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-l from-gold-400/[0.04] to-transparent"
                        animate={{ opacity: [0, 0.06, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                      />

                      <div className="relative z-10">
                        <span className="text-gold-400/50 text-xs sm:text-sm md:text-base block mb-0.5 sm:mb-1">
                          {item.time}
                        </span>
                        <h3 className="text-ivory text-sm sm:text-base md:text-lg lg:text-xl font-bold flex items-center gap-2">
                          <motion.span
                            className="text-base sm:text-lg md:text-xl"
                            animate={{ scale: [1, 1.15, 1], rotate: [0, -3, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                          >
                            {item.icon}
                          </motion.span>
                          <span>{item.title}</span>
                        </h3>
                      </div>
                    </div>
                  </TiltCard>
                </div>

                {/* Dot */}
                <div className="relative z-10 shrink-0">
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-gold flex items-center justify-center text-sm sm:text-lg border border-gold-400/30 gold-shadow"
                    whileHover={{ scale: 1.2, borderColor: 'rgba(212,175,55,0.5)' }}
                    animate={{ boxShadow: ['0 0 10px rgba(212,175,55,0.1)', '0 0 25px rgba(212,175,55,0.25)', '0 0 10px rgba(212,175,55,0.1)'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  >
                    {item.icon}
                  </motion.div>
                </div>

                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
