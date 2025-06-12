'use client';

import { useEffect } from 'react';

export default function ConfettiEffect() {
  useEffect(() => {
    import('canvas-confetti').then((module) => {
      const confetti = module.default;
      // Confetti shot beberapa kali untuk efek meriah
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.4 },
      });
    });
  }, []);

  return null; // Tidak perlu render elemen apa pun
} 