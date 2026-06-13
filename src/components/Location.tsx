import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import { WEDDING } from '../data/wedding';
import ParallaxCard from './ParallaxCard';
import TiltCard from './TiltCard';

export default function Location() {
  return (
    <section id="location" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-gold-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gold-gradient mb-2 sm:mb-3">
            موقع الحفل
          </h2>
          <p className="text-ivory/40 text-sm sm:text-base md:text-lg">مكان انعقاد المناسبة</p>
        </motion.div>

        <ParallaxCard>
          <TiltCard>
          <div className="glass-strong rounded-2xl sm:rounded-3xl overflow-hidden border border-gold-400/10 gold-shadow">
            {/* Map placeholder */}
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] bg-navy-700/30 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <MapPin className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gold-400/60 mx-auto mb-2 sm:mb-3" />
                  </motion.div>
                  <p className="text-ivory/50 text-xs sm:text-sm md:text-base">{WEDDING.ceremony.venue}</p>
                  <p className="text-ivory/30 text-[10px] sm:text-xs md:text-sm">{WEDDING.ceremony.address}</p>
                </div>
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-5">
                <svg viewBox="0 0 100 100" className="size-full">
                  <defs>
                    <pattern id="mgrid" width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#D4AF37" strokeWidth="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#mgrid)" />
                </svg>
              </div>

              {/* Animated ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-gold-400/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Info */}
            <div className="p-5 sm:p-6 md:p-8 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold gold-gradient mb-1 sm:mb-2">
                {WEDDING.ceremony.venue}
              </h3>
              <p className="text-ivory/40 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">{WEDDING.ceremony.address}</p>

              <motion.a
                href={WEDDING.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-gold-400/20 to-gold-300/10 border border-gold-400/25 text-gold-300 text-sm sm:text-lg font-medium relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] focus-visible:outline-2 focus-visible:outline-gold-400"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-400/10 via-gold-300/15 to-gold-400/10"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <MapPin className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">فتح الموقع على الخريطة</span>
                <ExternalLink className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
            </div>
          </div>
          </TiltCard>
        </ParallaxCard>
      </div>
    </section>
  );
}
