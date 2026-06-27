import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-14 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gold-400/[0.03] to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Sparkles */}
        <motion.div
          className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.15, 0.7, 0.15],
                scale: [0.7, 1.4, 0.7],
                y: [0, -4, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-400/30" />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-gold-400/40" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="shrink-0"
          >
            <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.3" />
              <circle cx="20" cy="20" r="12" fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.2" />
              <path d="M20 8 L22 16 L30 18 L24 24 L26 32 L20 28 L14 32 L16 24 L10 18 L18 16 Z" fill="#D4AF37" opacity="0.12" />
            </svg>
          </motion.div>

          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-400/20 to-gold-400/40" />
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl font-bold gold-gradient mb-3 sm:mb-4 leading-relaxed"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            &ldquo;بحضوركم تكتمل فرحتنا<br className="sm:hidden" /> وتزداد سعادتنا&rdquo;
          </motion.p>
          <div className="flex justify-center mb-6 sm:mb-8">
            <img 
              src="/monogram.png" 
              alt="شعار م & أ" 
              className="h-8 sm:h-9 object-contain select-none"
              style={{
                filter: 'sepia(1) saturate(5) hue-rotate(-10deg) brightness(0.95) opacity(0.3)'
              }}
            />
          </div>
        </motion.div>

        {/* Floating hearts */}
        <div className="flex justify-center gap-4 mb-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -6 - i * 2, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gold-400/30" />
            </motion.div>
          ))}
        </div>

        {/* Gift Credit */}
        <motion.div
          className="text-gold-400/60 text-xs sm:text-sm font-medium mt-4 mb-4 font-cairo select-none"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          تم عمل وإهداء هذا الموقع بواسطة أخو العريس المهندس ربيع شعبان
        </motion.div>

        {/* Signature */}
        <motion.div
          className="flex items-center justify-center gap-1.5 sm:gap-2 text-ivory/25 text-[10px] sm:text-xs select-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span>صمم بحب</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400/30" />
          </motion.div>
          <span>لأحب الناس</span>
        </motion.div>

        {/* Dots */}
        <motion.div
          className="flex justify-center gap-2 sm:gap-3 mt-5 sm:mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-400/20"
              animate={{ scale: [1, 1.6, 1], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
