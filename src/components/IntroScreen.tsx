/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React from 'react';
import { AppSettings } from '../types';
import GradientButton from './GradientButton';

// Use same generated high-fidelity Hello Kitty image for visual consistency
import kittySplashImage from '../assets/images/hello_kitty_loader_1779221878987.png';

interface IntroScreenProps {
  settings: AppSettings;
  onNext: () => void;
}

export default function IntroScreen({ settings, onNext }: IntroScreenProps) {
  return (
    <div
      id="intro_screen_container"
      className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-50 to-pink-100 px-6 py-12 relative overflow-hidden select-none"
    >
      {/* Decorative Floating Hearts in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 pointer-events-none text-xl sm:text-2xl"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      <div className="max-w-md w-full flex flex-col items-center text-center relative z-10">
        {/* Animated Avatar Box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative mb-6 bg-white p-6 rounded-full shadow-lg border border-pink-100 max-w-[200px]"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 opacity-20 filter blur-md animate-pulse" />
          <img
            src={kittySplashImage}
            alt="Hello Kitty Intro Splash"
            referrerPolicy="no-referrer"
            className="w-36 h-36 object-contain"
          />
        </motion.div>

        {/* Dynamic Personal Header text */}
        <motion.h1
          id="intro_main_headline"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans font-extrabold text-3xl sm:text-4xl text-rose-600 tracking-tight leading-snug mb-4 filter drop-shadow-sm px-2"
        >
          {settings.partnerName} was born {settings.age} years ago today!
        </motion.h1>

        {/* Playful greeting */}
        <motion.p
          id="intro_subtext"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-sans text-pink-600/80 font-medium text-base mb-8 max-w-[320px]"
        >
          Yes, she arrived to bring endless warmth and magic into the world. Here's a tiny, special surprise for her... ✨
        </motion.p>

        {/* Actions Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="w-full flex justify-center"
        >
          <GradientButton id="btn_start_surprise" onClick={onNext} className="shadow-pink-300/40">
            Start the surprise 🎁
          </GradientButton>
        </motion.div>
      </div>
    </div>
  );
}
