'use client';

import { motion } from 'framer-motion';
import { FiAward, FiStar, FiHeart } from 'react-icons/fi';

const achievements = [
  {
    icon: FiAward,
    title: 'Coli Tiap Hari',
    desc: 'Meraih peringkat pertama pada kompetisi coli terajin.',
  },
  {
    icon: FiStar,
    title: 'King Jomok',
    desc: 'Meraih sebagai orang terjomok favorite semua orang.',
  },
  {
    icon: FiHeart,
    title: 'Menang Togel',
    desc: 'Orang paling hoki kalau soal Togel.',
  },
];

export default function AchievementsSection() {
  return (
    <section className="w-full max-w-2xl space-y-8 pt-10">
      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-indigo-200 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Pencapaian Terbaru
      </motion.h2>

      <ul className="space-y-6">
        {achievements.map(({ icon: Icon, title, desc }, i) => (
          <motion.li
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <span className="flex-shrink-0 p-3 rounded-full bg-indigo-500/20 text-indigo-300 ring-2 ring-indigo-400/30">
              <Icon size={24} />
            </span>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-gray-100 mb-1">{title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
} 