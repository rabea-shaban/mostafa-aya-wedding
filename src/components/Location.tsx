import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ExternalLink, Clock, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';
import { WEDDING } from '../data/wedding';

const venueDetails = [
  { icon: MapPin, text: 'داخل منتجع الكابيتانو' },
  { icon: MapPin, text: 'بجوار مركز شباب العدوة' },
  { icon: MapPin, text: 'مدينة العدوة - محافظة المنيا' },
  { icon: Clock, text: 'الساعة ٨:٠٠ مساءً' },
];

const particlePositions = [
  { top: '10%', left: '5%', delay: 0, size: 3 },
  { top: '85%', left: '8%', delay: 0.8, size: 2 },
  { top: '15%', left: '92%', delay: 1.6, size: 2.5 },
  { top: '75%', left: '90%', delay: 0.4, size: 3 },
  { top: '50%', left: '3%', delay: 2.2, size: 2 },
  { top: '40%', left: '96%', delay: 1, size: 2.5 },
  { top: '5%', left: '50%', delay: 2.8, size: 2 },
  { top: '95%', left: '45%', delay: 1.4, size: 3 },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Location() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-36 overflow-hidden"
    >
      {/* Ambient glow background */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gold-400/6 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-gold-300/4 blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gold-400/3 blur-[100px]" />
      </motion.div>

      {/* Floating gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particlePositions.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold-400/30"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
            }}
            animate={{
              y: [0, -12 - i * 2, 0],
              x: [0, i % 2 === 0 ? 6 : -6, 0],
              opacity: [0.15, 0.6, 0.15],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + (i % 3) * 1.5,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold-400/30" />
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400/50" />
            <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold-400/30" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gold-gradient mb-3 sm:mb-4">
            مكان الاحتفال
          </h2>
          <p className="text-ivory/40 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            يسعدنا استقبالكم ومشاركتكم فرحتنا في هذا اليوم المميز
          </p>
        </motion.div>

        {/* Venue Card */}
        <motion.div style={{ y: cardY, opacity: cardOpacity }}>
          <TiltCard maxTilt={8}>
            <div className="relative group">
              {/* Animated golden border glow */}
              <motion.div
                className="absolute -inset-[2px] rounded-3xl sm:rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #aa771c)',
                  filter: 'blur(6px)',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* Animated gradient border */}
              <motion.div
                className="absolute -inset-px rounded-3xl sm:rounded-4xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(191, 149, 63, 0.5), rgba(252, 246, 186, 0.3), rgba(170, 119, 28, 0.5))',
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Card body */}
              <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden bg-gradient-to-b from-navy-900/95 to-navy-950/98 backdrop-blur-2xl border border-gold-400/10 gold-shadow">
                {/* Top decorative strip */}
                <div className="h-1 sm:h-1.5 gold-gradient-solid w-full" />

                {/* Map area */}
                <div className="relative h-[200px] sm:h-[280px] md:h-[360px] bg-gradient-to-br from-navy-800/60 via-navy-700/40 to-navy-900/60 overflow-hidden">
                  {/* Animated map glow */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(191, 149, 63, 0.22), transparent 70%)',
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <div className="relative mx-auto mb-3 sm:mb-4">
                          <motion.div
                            className="absolute -inset-4 rounded-full bg-gold-400/10 blur-md"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <MapPin className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gold-400" />
                        </div>
                      </motion.div>
                      <p className="text-ivory/60 text-sm sm:text-base md:text-lg font-bold">قاعة رويال</p>
                      <p className="text-ivory/30 text-xs sm:text-sm">منتجع الكابيتانو</p>
                    </div>
                  </div>

                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-4">
                    <svg viewBox="0 0 100 100" className="size-full">
                      <defs>
                        <pattern id="venueGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#bf953f" strokeWidth="0.2" />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#venueGrid)" />
                    </svg>
                  </div>

                  {/* Corner ornaments */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-20">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="sm:w-7 sm:h-7">
                      <path d="M0 0 L24 0 L24 2 L2 2 L2 24 L0 24 Z" fill="#bf953f" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 opacity-20 rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="sm:w-7 sm:h-7">
                      <path d="M0 0 L24 0 L24 2 L2 2 L2 24 L0 24 Z" fill="#bf953f" />
                    </svg>
                  </div>

                  {/* Expanding rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/15"
                      style={{ width: 80 + i * 60, height: 80 + i * 60 }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.05, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
                    />
                  ))}
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 md:p-10">
                  <motion.div
                    className="text-center mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold gold-gradient mb-1">
                      💒 قاعة رويال
                    </h3>
                    <div className="w-16 h-0.5 gold-gradient-solid mx-auto mt-3 rounded-full" />
                  </motion.div>

                  <div className="space-y-3 sm:space-y-4 max-w-md mx-auto mb-8 sm:mb-10">
                    {venueDetails.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-center gap-3 sm:gap-4 text-ivory/70 text-sm sm:text-base md:text-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease }}
                      >
                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full glass flex items-center justify-center shrink-0">
                          <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400" />
                        </span>
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Google Maps Button */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5, ease }}
                  >
                    <motion.a
                      href={WEDDING.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full gold-gradient-solid text-navy-950 font-bold text-sm sm:text-lg overflow-hidden transition-all duration-500 focus-visible:outline-2 focus-visible:outline-gold-400"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 50px rgba(191, 149, 63, 0.45), 0 0 100px rgba(191, 149, 63, 0.18)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      <MapPin className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                      <span className="relative z-10">فتح الموقع على الخريطة</span>
                      <ExternalLink className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
