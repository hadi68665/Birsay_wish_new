/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface CountdownScreenProps {
  onComplete: () => void;
}

export default function CountdownScreen({ onComplete }: CountdownScreenProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      const timer = setTimeout(() => {
        onComplete();
      }, 300); // Small delay to transition smoothly
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count, onComplete]);

  return (
    <div
      id="countdown_screen_container"
      className="flex flex-col items-center justify-center min-h-screen w-full bg-pink-100 overflow-hidden relative select-none"
    >
      {/* Soft romantic backdrop particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-pink-300 blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-rose-300 blur-2xl animate-pulse" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          id={`countdown_number_${count}`}
          initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 1.8, opacity: 0, rotate: 15 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          className="font-display font-black text-rose-500 text-[10rem] sm:text-[14rem] md:text-[18rem] filter drop-shadow-[0_10px_10px_rgba(244,63,94,0.15)] flex items-center justify-center"
        >
          {count > 0 ? count : '✨'}
        </motion.div>
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        className="font-sans font-medium text-rose-400 absolute bottom-12 uppercase tracking-widest text-sm"
      >
        Prepare For Your Surprise...
      </motion.p>
    </div>
  );
}
