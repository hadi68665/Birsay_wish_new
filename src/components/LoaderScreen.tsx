/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

import kittyLoaderImage from '../assets/images/hello_kitty_loader_1779221878987.png';

interface LoaderScreenProps {
  onComplete: () => void;
}

export default function LoaderScreen({ onComplete }: LoaderScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 800); // Smooth exit delay
          return 100;
        }
        
        // Random fluid progress step
        const step = Math.floor(Math.random() * 5) + 3;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      id="loader_screen_container"
      className="flex flex-col items-center justify-center min-h-screen w-full bg-[#fae3ec] px-6 select-none"
    >
      <div className="max-w-xl w-full flex flex-col items-center text-center">
        {/* Transparent container displaying Hello Kitty Flying directly on the pink background */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 flex items-center justify-center"
        >
          <motion.img
            src={kittyLoaderImage}
            alt="Hello Kitty Flying Airplane"
            referrerPolicy="no-referrer"
            className="w-56 h-56 sm:w-64 sm:h-64 object-contain select-none pointer-events-none filter drop-shadow-[0_4px_8px_rgba(244,63,94,0.12)]"
            animate={{
              y: [0, -10, 0],
              x: [-4, 4, -4],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Cursive Subtitle matching the video screenshot text perfectly */}
        <motion.h1
          id="loader_status_message"
          className="font-cursive text-[#d2167d] text-3.5xl sm:text-4.5xl font-bold tracking-wide mt-2"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Loading your birthday surprise...
        </motion.h1>

        {/* Sleek matching pink progress track */}
        <div className="w-52 h-1 bg-[#d2167d]/10 rounded-full overflow-hidden mt-8 opacity-60">
          <motion.div
            className="h-full bg-[#d2167d]"
            style={{ width: `${progress}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  );
}

