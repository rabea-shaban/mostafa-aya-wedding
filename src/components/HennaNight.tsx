import { motion } from 'framer-motion';
import { Moon, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { WEDDING } from '../data/wedding';
import TiltCard from './TiltCard';
import ParallaxCard from './ParallaxCard';

export default function HennaNight() {
  const details = [
    { icon: Calendar, text: WEDDING.henna.dateLabel },
    { icon: Clock, text: WEDDING.henna.timeLabel },
    { icon: MapPin, text: WEDDING.henna.location },
  ];

  return (
    <section id="henna" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gold-400/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-gold-300/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <ParallaxCard>
          <TiltCard>
            <div className="glass-strong rounded-3xl sm:rounded-4xl p-6 sm:p-10 md:p-14 relative overflow-hidden border border-gold-400/10 gold-shadow">
            <div className="light-ray" />

            <div className="relative z-10">
              {/* Icons */}
              <motion.div
                className="flex justify-center gap-3 sm:gap-4 mb-5 sm:mb-7"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3] }}
                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  >
                    <Moon className="w-5 h-5 sm:w-7 sm:h-7 text-gold-400/50" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gold-gradient text-center mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {WEDDING.henna.title}
              </motion.h2>

              {/* Details */}
              <div className="space-y-3 sm:space-y-4 max-w-md mx-auto">
                {details.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-center gap-2.5 sm:gap-3 text-ivory/70 text-base sm:text-lg md:text-xl"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 shrink-0" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <motion.div
                className="my-6 sm:my-8 h-px bg-gradient-to-r from-transparent via-gold-400/25 to-transparent max-w-xs mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />

              {/* Footer */}
              <motion.div
                className="flex justify-center gap-2 sm:gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-400/30" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                className="text-center text-gold-400/30 text-xs sm:text-sm mt-5 sm:mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                مع تحيات عائلة العروسين
              </motion.p>
            </div>
          </div>
        </TiltCard>
        </ParallaxCard>
      </div>
    </section>
  );
}
