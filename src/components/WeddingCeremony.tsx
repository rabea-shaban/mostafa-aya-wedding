import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Flower2 } from 'lucide-react';
import { WEDDING } from '../data/wedding';
import ParallaxCard from './ParallaxCard';
import TiltCard from './TiltCard';

export default function WeddingCeremony() {
  const details = [
    { icon: Calendar, text: WEDDING.ceremony.dateLabel, sub: false },
    { icon: Clock, text: WEDDING.ceremony.timeLabel, sub: false },
    { icon: MapPin, text: WEDDING.ceremony.venue, sub: false },
    { icon: MapPin, text: WEDDING.ceremony.address, sub: true },
  ];

  return (
    <section id="ceremony" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-400/[0.02] via-transparent to-gold-400/[0.02]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <ParallaxCard>
          <TiltCard>
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl sm:rounded-4xl bg-gradient-to-r from-gold-400/20 via-gold-300/40 to-gold-400/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700" />

            <div className="glass-strong rounded-3xl sm:rounded-4xl p-6 sm:p-10 md:p-14 relative overflow-hidden border border-gold-400/15 gold-shadow">
              <div className="light-ray" />

              <div className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 opacity-8">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
                  <path d="M30 50 Q50 20 70 50 Q50 80 30 50" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
                </svg>
              </div>

              <div className="relative z-10">
                {/* Flowers */}
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
                      animate={{ y: [-3, 3, -3], rotate: [-4, 4, -4] }}
                      transition={{ duration: 5 + i * 0.5, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                    >
                      <Flower2 className="w-5 h-5 sm:w-7 sm:h-7 text-gold-400/40" />
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
                  {WEDDING.ceremony.title}
                </motion.h2>

                {/* Details */}
                <div className="space-y-3 sm:space-y-4 max-w-md mx-auto">
                  {details.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center justify-center gap-2.5 sm:gap-3 ${
                        item.sub ? 'text-ivory/40 text-sm sm:text-base md:text-lg' : 'text-ivory/70 text-base sm:text-lg md:text-xl'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${item.sub ? 'text-gold-400/20' : 'text-gold-400'}`} />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Dots */}
                <motion.div
                  className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-400/40"
                      animate={{ scale: [1, 2, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          </TiltCard>
        </ParallaxCard>
      </div>
    </section>
  );
}
