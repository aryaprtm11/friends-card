"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail } from "react-icons/fi";
import ConfettiEffect from "@/components/Confetti";
import AchievementsSection from "@/components/Achievements";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [stage, setStage] = useState<'loading' | 'envelope' | 'content'>(
    'loading'
  );

  const handleLoadingFinish = () => setStage('envelope');
  const handleOpenEnvelope = () => setStage('content');

  return (
    <AnimatePresence mode="wait">
      {stage === 'loading' && (
        <LoadingScreen key="loading" onFinish={handleLoadingFinish} />
      )}
      {stage === 'envelope' && (
        <Envelope key="envelope" onOpen={handleOpenEnvelope} />
      )}
      {stage === 'content' && <MainContent key="content" />}
    </AnimatePresence>
  );
}

function Envelope({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 text-center space-y-8 cursor-pointer select-none overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #581c87 100%)',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      onClick={onOpen}
    >
      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-violet-900/20" />
      
      {/* Floating particles in background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${(i * 23 + 17) % 100}%`,
              top: `${(i * 37 + 13) % 100}%`,
            }}
            animate={{
              y: [-20, -80],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: (i % 3) + 3,
              delay: (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <motion.div
        className="relative z-10 space-y-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Enhanced Envelope */}
        <motion.div
          className="relative w-80 h-56 mx-auto"
          initial={{ y: 0, rotateY: 0 }}
          animate={{ 
            y: [0, -8, 0],
            rotateY: [0, 2, -2, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6, 
            ease: "easeInOut" 
          }}
          whileHover={{ 
            scale: 1.05,
            y: -10,
            transition: { duration: 0.3 }
          }}
        >
          {/* Shadow effect */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-8 bg-black/20 rounded-full blur-xl" />
          
          {/* Main envelope body */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl ring-1 ring-white/20" />
          
          {/* Inner glow effect */}
          <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20" />

          {/* Enhanced Flap with seal */}
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-t-xl shadow-inner"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 95%)" }}
          />
          
          {/* Wax seal effect */}
          <motion.div
            className="absolute top-24 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg ring-2 ring-red-400/50"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-400 to-red-600" />
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              ♡
            </div>
          </motion.div>

          {/* Decorative corner elements */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br-lg" />

          {/* Enhanced mail icon */}
          <div className="absolute inset-0 flex items-center justify-center pt-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiMail size={100} className="text-white drop-shadow-2xl" />
            </motion.div>
          </div>

          {/* Magical sparkles */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${25 + (i * 13) % 50}%`,
                top: `${25 + (i * 17) % 50}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Enhanced instruction text */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.p 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(167, 139, 250, 0.3)",
                "0 0 30px rgba(167, 139, 250, 0.6)",
                "0 0 20px rgba(167, 139, 250, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ada Pesan Untuk Sobatku
          </motion.p>
          
          <motion.p 
            className="text-indigo-300/80 text-lg"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Klik amplop untuk membuka pesan spesial (tenang aja isinya bukan bokep kok) ✨
          </motion.p>
          
          {/* Click indicator */}
          <motion.div
            className="flex items-center justify-center mt-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75" />
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-150" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative elements in corners */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border border-indigo-400/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 border border-purple-400/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

function MainContent() {
  return (
    <motion.main
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 py-12 text-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Elemen latar */}
      <div className="absolute -top-24 -left-32 w-[24rem] h-[24rem] bg-purple-600 opacity-30 blur-3xl rounded-full animate-pulse -z-10" />
      <div className="absolute -bottom-24 -right-32 w-[24rem] h-[24rem] bg-indigo-600 opacity-20 blur-3xl rounded-full animate-pulse -z-10" />

      {/* Foto sahabat */}
      <Image
        src="/foto.jpg"
        alt="Foto sahabatku"
        width={200}
        height={200}
        className="rounded-full ring-4 ring-indigo-400 shadow-xl"
        priority
      />

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        I&apos;m so proud of you, brother!
      </h1>

      {/* Pesan */}
      <p className="max-w-xl text-lg md:text-xl leading-relaxed text-gray-300">
        I just want to say thank you for being my brother, please never be a stranger.
        Always be the you I&apos;ve always known, never change!
      </p>

      {/* Pencapaian */}
      <AchievementsSection />

      {/* Konfeti */}
      <ConfettiEffect />
    </motion.main>
  );
}
