import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import ParticlesBackground from './components/ParticlesBackground';
import FloatingElements from './components/FloatingElements';
import MouseGlow from './components/MouseGlow';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import HennaNight from './components/HennaNight';
import WeddingCeremony from './components/WeddingCeremony';
import EventTimeline from './components/EventTimeline';
import Location from './components/Location';
import Footer from './components/Footer';
import RSVP from './components/RSVP';
import AudioPlayer from './components/AudioPlayer';
import { Heart, X } from 'lucide-react';

const navItems = [
  { id: 'countdown', label: 'العد التنازلي' },
  { id: 'henna', label: 'ليلة الحنة' },
  { id: 'ceremony', label: 'حفل الزفاف' },
  { id: 'timeline', label: 'جدول المناسبة' },
  { id: 'location', label: 'الموقع' },
  { id: 'rsvp', label: 'تأكيد الحضور' },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-[3px] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 z-[100] origin-right"
      style={{ scaleX }}
    />
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 100); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id: string) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong border-b border-gold-400/10' : ''
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <button
            className="h-8 sm:h-9 flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo('hero')}
            aria-label="الرئيسية"
          >
            <img 
              src="/monogram.png" 
              alt="شعار م & أ" 
              className="h-full object-contain select-none"
              style={{
                filter: 'sepia(1) saturate(5) hue-rotate(-10deg) brightness(0.95)'
              }}
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 text-xs text-ivory/50 hover:text-gold-300 transition-colors rounded-lg hover:bg-gold-400/5"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
          >
            <motion.span className="block w-5 h-px bg-ivory/60" animate={open ? { rotate: 45, y: 2.5 } : { rotate: 0, y: 0 }} />
            <motion.span className="block w-5 h-px bg-ivory/60" animate={open ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="block w-5 h-px bg-ivory/60" animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-navy-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                className="text-xl text-ivory/70 hover:text-gold-300 transition-colors"
                onClick={() => scrollTo(item.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              className="mt-4 text-gold-400/50 text-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              إغلاق
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [showGiftPopup, setShowGiftPopup] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('gift_popup_shown');
    if (!hasSeen) {
      const showTimer = setTimeout(() => {
        setShowGiftPopup(true);
        sessionStorage.setItem('gift_popup_shown', 'true');
      }, 1500);

      const hideTimer = setTimeout(() => {
        setShowGiftPopup(false);
      }, 7500);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" dir="rtl">
      <ScrollProgress />
      <NavBar />
      <ParticlesBackground />
      <FloatingElements />
      <MouseGlow />
      <AudioPlayer />

      <main className="relative z-10">
        <Hero />
        <Countdown />
        <HennaNight />
        <WeddingCeremony />
        <EventTimeline />
        <Location />
        <RSVP />
      </main>

      <Footer />

      {/* Gift Popup Modal */}
      <AnimatePresence>
        {showGiftPopup && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/40 backdrop-blur-sm pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-strong rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center relative border border-gold-400/25 gold-shadow pointer-events-auto"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }}
              exit={{ scale: 0.8, opacity: 0, y: 30, transition: { duration: 0.3 } }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowGiftPopup(false)}
                className="absolute top-4 right-4 text-gold-400/50 hover:text-gold-300 cursor-pointer p-1"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Heart Icon */}
              <motion.div
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-400 mx-auto mb-4 border border-gold-400/20"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart className="w-6 h-6 fill-gold-400/10" />
              </motion.div>

              {/* Text */}
              <h3 className="text-xl sm:text-2xl font-bold font-display gold-gradient mb-3 leading-relaxed">
                إهداء خاص
              </h3>
              <p className="text-ivory text-sm sm:text-base leading-relaxed font-cairo">
                تم عمل وإهداء هذا الموقع بواسطة أخو العريس المهندس ربيع شعبان
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
