import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { WEDDING } from '../data/wedding';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isManuallyPaused = useRef(false);

  // Auto-hide tooltip after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Try to play immediately on mount, and bind backup interaction listeners
  useEffect(() => {
    if (isPlaying || isManuallyPaused.current) return;

    let playAttempted = false;

    function tryPlay() {
      const audio = audioRef.current;
      if (audio && !isPlaying && !playAttempted && !isManuallyPaused.current) {
        playAttempted = true;
        
        // 1. Try playing unmuted first (standard autoplay)
        audio.muted = false;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setShowTooltip(false);
          })
          .catch((err) => {
            console.log("Unmuted autoplay blocked, trying muted autoplay:", err);
            
            // 2. Fallback: play immediately as muted (browsers allow this 100% of the time)
            audio.muted = true;
            audio.play()
              .then(() => {
                setIsPlaying(true);
                // Bind interaction listeners to unmute automatically
                window.addEventListener('click', unmuteAudio);
                window.addEventListener('touchstart', unmuteAudio);
                window.addEventListener('scroll', unmuteAudio);
              })
              .catch((muteErr) => {
                console.log("Muted autoplay also blocked:", muteErr);
                playAttempted = false;
                
                // 3. Worst-case fallback: play on first interaction
                window.addEventListener('click', playOnInteraction);
                window.addEventListener('touchstart', playOnInteraction);
                window.addEventListener('scroll', playOnInteraction);
              });
          });
      }
    }

    function unmuteAudio() {
      const audio = audioRef.current;
      if (audio) {
        audio.muted = false;
        setShowTooltip(false);
      }
      cleanup();
    }

    // Fallback play trigger
    function playOnInteraction() {
      const audio = audioRef.current;
      if (audio && !isManuallyPaused.current) {
        audio.muted = false;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setShowTooltip(false);
          })
          .catch((err) => console.log("Play on interaction failed:", err));
      }
      cleanup();
    }

    function cleanup() {
      window.removeEventListener('click', unmuteAudio);
      window.removeEventListener('touchstart', unmuteAudio);
      window.removeEventListener('scroll', unmuteAudio);
      window.removeEventListener('click', playOnInteraction);
      window.removeEventListener('touchstart', playOnInteraction);
      window.removeEventListener('scroll', playOnInteraction);
    }

    // Try immediately on load
    if (audioRef.current) {
      tryPlay();
    }

    return () => {
      cleanup();
    };
  }, [isPlaying]);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      isManuallyPaused.current = true;
    } else {
      isManuallyPaused.current = false;
      audioRef.current.muted = false; // Always unmute when manually played
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback failed:", err));
      setShowTooltip(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 dir-rtl font-cairo">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="glass rounded-xl px-3 py-1.5 text-xs text-gold-300 border border-gold-400/20 gold-shadow shadow-lg hidden sm:block whitespace-nowrap"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            🎵 اضغط لتشغيل الموسيقى الخلفية
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music waves */}
      <div className="flex items-end gap-0.5 h-4 px-2 glass rounded-full border border-gold-400/10 cursor-pointer" onClick={togglePlay}>
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="w-0.5 rounded-full bg-gold-400/80 origin-bottom"
            style={{
              height: '4px',
              animation: isPlaying
                ? `soundwave 0.8s ease-in-out infinite alternate`
                : 'none',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Main floating button */}
      <motion.button
        onClick={togglePlay}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-strong flex items-center justify-center text-gold-400 border border-gold-400/25 gold-shadow hover:border-gold-400/50 hover:text-gold-300 relative group cursor-pointer focus:outline-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={isPlaying ? { boxShadow: ['0 0 15px rgba(212,175,55,0.2)', '0 0 35px rgba(212,175,55,0.4)', '0 0 15px rgba(212,175,55,0.2)'] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="موسيقى الخلفية"
      >
        {/* Animated glowing border ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute -inset-[2px] rounded-full border border-gold-400/30"
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400/50" />
          )}
        </motion.div>

        {/* Decorative micro icon */}
        <div className="absolute -top-1 -left-1 glass rounded-full w-5 h-5 flex items-center justify-center border border-gold-400/10 scale-75 group-hover:scale-90 transition-transform">
          <Music className="w-2.5 h-2.5 text-gold-400" />
        </div>
      </motion.button>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={WEDDING.audioUrl}
        loop
        preload="auto"
      />
    </div>
  );
}
