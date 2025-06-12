'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingProps {
  onFinish: () => void;
}

const phrases = ["Hai Afa", "Halo sobat", "Halo nigga"] as const;
const TYPE_DURATION = 1100; // durasi mengetik (ms)
const HOLD_DURATION = 1000; // durasi menahan teks sebelum lanjut (ms)

export default function LoadingScreen({ onFinish }: LoadingProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Generate posisi bintang secara deterministik untuk menghindari hydration error
  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      left: (i * 23.7 + 17) % 100, // %
      top: (i * 41.3 + 13) % 100,
      size: (i % 4) + 1, // 1-5px
      delay: (i % 8), // s
      duration: (i % 3) + 2, // 2-5s
    }));
  }, []);

  // Generate floating particles deterministik
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: (i * 19.3 + 11) % 100,
      top: (i * 31.7 + 7) % 100,
      delay: (i % 10),
      duration: (i % 15) + 15, // 15-30s
    }));
  }, []);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let charIdx = 0;

    // Reset teks hanya untuk frase pertama, untuk frase selanjutnya langsung mulai
    if (phraseIndex === 0) {
      setDisplayText('');
    }

    // hitung interval per karakter agar total ~3 detik untuk tiap frase
    const interval = TYPE_DURATION / currentPhrase.length;

    // Delay kecil untuk frase selanjutnya (bukan frase pertama)
    const startDelay = phraseIndex > 0 ? 200 : 0;

    const startTimer = setTimeout(() => {
      // Clear teks sebelumnya dengan animasi fade untuk frase selanjutnya
      if (phraseIndex > 0) {
        setDisplayText('');
      }

      setIsTyping(true);

      const charTimer = setInterval(() => {
        charIdx++;
        setDisplayText(currentPhrase.slice(0, charIdx));
        if (charIdx === currentPhrase.length) {
          clearInterval(charTimer);
          setIsTyping(false);
        }
      }, interval);

      // setelah selesai, lanjut frase berikutnya
      const phraseTimer = setTimeout(() => {
        if (phraseIndex < phrases.length - 1) {
          setPhraseIndex((idx) => idx + 1);
        } else {
          onFinish();
        }
      }, TYPE_DURATION + HOLD_DURATION);

      return () => {
        clearInterval(charTimer);
        clearTimeout(phraseTimer);
      };
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
    };
  }, [phraseIndex, onFinish]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phraseIndex}
        className="loading-bg relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-violet-900/50 animate-pulse-slow" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              animate={{
                y: [-20, -100],
                x: [0, Math.sin(i) * 30],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Enhanced star field */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {stars.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-white to-blue-200"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main content container */}
        <motion.div
          className="relative z-10 text-center px-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Text container with glass morphism effect */}
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <motion.p 
              key={phraseIndex}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                textShadow: [
                  "0 0 20px rgba(147, 197, 253, 0.5)",
                  "0 0 40px rgba(147, 197, 253, 0.8)",
                  "0 0 20px rgba(147, 197, 253, 0.5)"
                ]
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                opacity: { duration: 0.3 },
                y: { duration: 0.3 },
                textShadow: { duration: 2, repeat: Infinity }
              }}
            >
              {displayText}
              <motion.span 
                className="text-blue-300"
                animate={{ opacity: isTyping ? [0, 1, 0] : 0.7 }}
                transition={{ duration: 0.8, repeat: isTyping ? Infinity : 0 }}
              >
                |
              </motion.span>
            </motion.p>
          </div>

          {/* Progress indicator */}
          <motion.div 
            className="mt-8 flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {phrases.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= phraseIndex 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                    : 'bg-white/20'
                }`}
                animate={index === phraseIndex ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-300/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-300/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <style jsx global>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
} 