import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import { WEDDING } from '../data/wedding';

const timeline = WEDDING.timeline;
const ease = [0.16, 1, 0.3, 1] as const;

export default function EventTimeline() {
  return (
    <section id="timeline" className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-400/[0.02] via-transparent to-gold-400/[0.02]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gold-gradient mb-2">
            جدول المناسبة
          </h2>
          <p className="text-ivory/35 text-sm sm:text-base">تفاصيل حفل زفافنا المبهج</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line: centered on desktop, aligned to right on mobile */}
          <motion.div
            className="absolute right-5 sm:right-6 md:right-1/2 md:translate-x-px top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, rgba(191, 149, 63, 0.4), rgba(191, 149, 63, 0.15), transparent)',
            }}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
          />

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  className="relative flex items-center md:justify-center gap-4 md:gap-0 group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.1 }}
                >
                  {/* Left Side (Odd Card) - Desktop only */}
                  <div className="flex-1 hidden md:block text-left">
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                      >
                        <TiltCard maxTilt={4}>
                          <div className="glass-strong rounded-xl px-4 py-3 relative gold-shadow transition-all duration-300 border border-gold-400/5 hover:border-gold-400/25 hover:shadow-[0_0_20px_rgba(191,149,63,0.15)]">
                            <div className="relative z-10 flex items-center gap-2">
                              <span className="text-base shrink-0 opacity-70">{item.icon}</span>
                              <div className="text-right">
                                <div className="text-gold-400/45 text-xs leading-none mb-0.5">{item.time}</div>
                                <h3 className="text-ivory text-sm md:text-base font-bold">{item.title}</h3>
                              </div>
                            </div>
                            {/* Connector */}
                            <div className="absolute top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-l from-gold-400/30 to-transparent" style={{ right: '-2rem' }} />
                          </div>
                        </TiltCard>
                      </motion.div>
                    )}
                  </div>

                  {/* Dot - centered on desktop, aligned to right on mobile */}
                  <div className="relative z-10 shrink-0 md:mx-6 mr-1.5 sm:mr-2">
                    <motion.div
                      className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full glass-gold flex items-center justify-center text-xs font-bold border border-gold-400/35 gold-shadow"
                      whileHover={{ scale: 1.2, borderColor: 'rgba(191,149,63,0.6)' }}
                      transition={{ duration: 0.2 }}
                    >
                      {i + 1}
                    </motion.div>
                    {/* Dot Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(191,149,63,0.3), transparent 70%)',
                        filter: 'blur(4px)',
                        zIndex: -1,
                      }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    />
                  </div>

                  {/* Right Side (Even Card on Desktop) OR Mobile Card */}
                  <div className="flex-1 text-right">
                    {/* Desktop Card (Even) */}
                    <div className="hidden md:block">
                      {isEven && (
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-30px' }}
                          transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                        >
                          <TiltCard maxTilt={4}>
                            <div className="glass-strong rounded-xl px-4 py-3 relative gold-shadow transition-all duration-300 border border-gold-400/5 hover:border-gold-400/25 hover:shadow-[0_0_20px_rgba(191,149,63,0.15)]">
                              <div className="relative z-10 flex items-center gap-2 justify-end">
                                <div className="text-right">
                                  <div className="text-gold-400/45 text-xs leading-none mb-0.5">{item.time}</div>
                                  <h3 className="text-ivory text-sm md:text-base font-bold">{item.title}</h3>
                                </div>
                                <span className="text-base shrink-0 opacity-70">{item.icon}</span>
                              </div>
                              {/* Connector */}
                              <div className="absolute top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-gold-400/30 to-transparent" style={{ left: '-2rem' }} />
                            </div>
                          </TiltCard>
                        </motion.div>
                      )}
                    </div>

                    {/* Mobile Card (Always visible on mobile) */}
                    <div className="md:hidden block">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease }}
                      >
                        <TiltCard maxTilt={3}>
                          <div className="glass-strong rounded-xl px-4 py-3 relative gold-shadow border border-gold-400/10">
                            <div className="relative z-10 flex items-center gap-2.5 justify-start">
                              <span className="text-base shrink-0 opacity-80">{item.icon}</span>
                              <div className="text-right">
                                <div className="text-gold-400/50 text-[10px] sm:text-xs leading-none mb-1">{item.time}</div>
                                <h3 className="text-ivory text-xs sm:text-sm font-bold">{item.title}</h3>
                              </div>
                            </div>
                          </div>
                        </TiltCard>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
