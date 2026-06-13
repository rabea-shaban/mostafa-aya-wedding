import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { WEDDING } from '../data/wedding';

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const idx = selected !== null ? WEDDING.gallery.findIndex((g) => g.id === selected) : -1;

  const open = useCallback((id: number) => setSelected(id), []);
  const close = useCallback(() => setSelected(null), []);
  const next = useCallback(() => {
    if (idx < WEDDING.gallery.length - 1) setSelected(WEDDING.gallery[idx + 1].id);
  }, [idx]);
  const prev = useCallback(() => {
    if (idx > 0) setSelected(WEDDING.gallery[idx - 1].id);
  }, [idx]);

  useEffect(() => {
    if (selected === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') prev();
      if (e.key === 'ArrowLeft') next();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected, close, prev, next]);

  // Generate masonry spans - alternate between tall and wide
  const spans = WEDDING.gallery.map((_, i) => {
    const mod = i % 7;
    if (mod === 0) return 'md:row-span-2';
    if (mod === 1) return 'md:col-span-2';
    if (mod === 4) return 'md:col-span-2';
    if (mod === 5) return 'md:row-span-2';
    return '';
  });

  return (
    <section id="gallery" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-400/[0.02] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gold-gradient mb-2 sm:mb-3">
            معرض الصور
          </h2>
          <p className="text-ivory/40 text-sm sm:text-base md:text-lg">لحظات لا تنسى</p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px]">
          {WEDDING.gallery.map((img, i) => (
            <motion.button
              key={img.id}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group text-left ${spans[i]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => open(img.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              <img
                src={img.src}
                alt={img.alt}
                className="size-full object-cover transition-all duration-600 group-hover:scale-110"
                loading="lazy"
              />

              {/* Frame border */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold-400/25 rounded-xl sm:rounded-2xl transition-all duration-400 z-20" />

              {/* Zoom indicator */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                <div className="glass rounded-full p-1.5 sm:p-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gold-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && idx >= 0 && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            {/* Close */}
            <button
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center text-ivory/70 hover:text-ivory hover:border-gold-400/40 transition-all"
              onClick={close}
              aria-label="إغلاق"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Prev */}
            {idx > 0 && (
              <button
                className="absolute right-3 sm:right-6 md:right-10 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center text-ivory/70 hover:text-ivory hover:border-gold-400/40 transition-all"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="السابق"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Next */}
            {idx < WEDDING.gallery.length - 1 && (
              <button
                className="absolute left-3 sm:left-6 md:left-10 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center text-ivory/70 hover:text-ivory hover:border-gold-400/40 transition-all"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="التالي"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Image */}
            <motion.div
              className="max-w-[90vw] max-h-[85vh] mx-4"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={WEDDING.gallery[idx].src}
                alt={WEDDING.gallery[idx].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                <span className="text-ivory/50 text-xs sm:text-sm tabular-nums">
                  {idx + 1} / {WEDDING.gallery.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
