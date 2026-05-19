/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { AppSettings } from '../types';
import GradientButton from './GradientButton';

interface CakeScreenProps {
  settings: AppSettings;
  onNext: () => void;
}

export default function CakeScreen({ settings, onNext }: CakeScreenProps) {
  const [isCut, setIsCut] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [swipeProgress, setSwipeProgress] = useState(0); // 0 to 100
  const [slashLine, setSlashLine] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pinterest Peach Cat Birthday Cake GIF
  const cakeGifUrl = 'https://i.pinimg.com/originals/1e/b8/4f/1eb84f77247b6ae36da7ebc3015f6231.gif';

  // Handle generalized swipe tracking anywhere on the screen in any direction (Euclidean distance)
  const handleGestureStart = (clientX: number, clientY: number) => {
    if (isCut) return;
    setTouchStart({ x: clientX, y: clientY });
  };

  const handleGestureMove = (clientX: number, clientY: number) => {
    if (isCut || !touchStart) return;

    const deltaX = clientX - touchStart.x;
    const deltaY = clientY - touchStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const progress = Math.min((distance / 120) * 100, 100);
    setSwipeProgress(progress);

    // Dynamic swipe slash trail path mapping
    setSlashLine({
      start: { x: touchStart.x, y: touchStart.y },
      end: { x: clientX, y: clientY },
    });

    if (progress >= 100) {
      triggerCakeCut();
    }
  };

  const handleGestureEnd = () => {
    if (isCut) return;
    setTouchStart(null);
    setSwipeProgress(0);
    setSlashLine(null);
  };

  const triggerCakeCut = () => {
    setIsCut(true);
    setTouchStart(null);
    setSwipeProgress(0);
    setSlashLine(null);

    // Play sweet pop cut sound effects natively through Web Audio synthesize wave
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio swish synthesizer bypassed under browser limits', e);
    }

    // Launch beautiful high density sequence of colorful heart, pink & gold confetti!
    const duration = 3.0 * 1000;
    const end = Date.now() + duration;

    // Direct celebratory burst
    confetti({
      particleCount: 180,
      spread: 95,
      origin: { y: 0.55 },
      colors: ['#ec4899', '#f43f5e', '#fb7185', '#fda4af', '#fffbeb', '#fef3c7'],
    });

    // Staggered continuous multi-corner burst
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 45,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ['#ec4899', '#f43f5e', '#fb7185'],
      });
      confetti({
        particleCount: 4,
        angle: 135,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ['#ec4899', '#f43f5e', '#fb7185'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div
      ref={containerRef}
      id="cake_screen_container"
      onMouseDown={(e) => handleGestureStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleGestureMove(e.clientX, e.clientY)}
      onMouseUp={handleGestureEnd}
      onMouseLeave={handleGestureEnd}
      onTouchStart={(e) => handleGestureStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleGestureMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleGestureEnd}
      className="flex flex-col items-center justify-between min-h-screen w-full bg-[#fcedf2] px-6 py-12 relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* Dynamic Glowing Swipe Slash Trail */}
      {slashLine && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-50">
          <line
            x1={slashLine.start.x}
            y1={slashLine.start.y}
            x2={slashLine.end.x}
            y2={slashLine.end.y}
            stroke="rgba(244, 63, 94, 0.85)"
            strokeWidth="5"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse"
          />
          {/* Sparkly end node */}
          <circle
            cx={slashLine.end.x}
            cy={slashLine.end.y}
            r="8"
            fill="#fff"
            className="animate-ping"
          />
        </svg>
      )}

      {/* Decorative background falling items when cut completed */}
      {isCut && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl pointer-events-none"
              style={{
                top: `${Math.random() * -10}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, Math.random() * 60 - 30],
                rotate: [0, 360],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            >
              {['🌸', '💖', '🎉', '🌟', '✨', '🎈'][i % 6]}
            </motion.div>
          ))}
        </div>
      )}

      {/* TOP HEADER STATUS TEXT */}
      <div className="max-w-md w-full text-center mt-6 z-10">
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="cake_screen_title"
            className="font-sans font-extrabold text-[#d2547a] text-2xl sm:text-3.5xl tracking-tight leading-tight uppercase"
          >
            {isCut ? 'Happy Birthday, My Girl! 💖' : 'Swipe anywhere to cut the cake!'}
          </h2>
          <p className="text-xs text-[#d2547a]/70 font-bold uppercase tracking-wider mt-1.5 px-4">
            {isCut 
              ? 'Yaaaaay! She sliced the cake beautifully! Let us start the fun! 🎉' 
              : 'Slide your finger or drag your cursor anywhere across the screen.'}
          </p>
        </motion.div>
      </div>

      {/* CORE AVATAR GIF CONTAINER (NO BOX, DIRECT TRANSPARENT STYLE) */}
      <div className="flex-1 flex items-center justify-center z-10 w-full my-4">
        <motion.div
          id="cake_box_card"
          className={`relative p-2 flex flex-col items-center justify-center max-w-[320px] w-full ${
            !isCut ? 'hover:scale-102 transition-transform duration-300' : ''
          }`}
          animate={isCut ? { scale: [1, 1.06, 1], rotate: [0, 2, -2, 0] } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Animated decorative sparks orbiting around the Character */}
          {isCut && (
            <div className="absolute -inset-2 pointer-events-none">
              <span className="text-xl animate-bounce absolute -top-4 left-4">💖</span>
              <span className="text-xl animate-pulse absolute -bottom-4 right-6">🎁</span>
              <span className="text-2xl animate-ping absolute top-12 -right-4">🌟</span>
              <span className="text-xl animate-bounce absolute bottom-12 -left-3">🌸</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key="pinterest_cake"
              src={cakeGifUrl}
              alt="Mochi Peach Cat Surprise Cake"
              referrerPolicy="no-referrer"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ mixBlendMode: 'multiply' }}
              className="w-56 h-56 sm:w-64 sm:h-64 object-contain select-none pointer-events-none mix-blend-multiply contrast-[1.12] brightness-[1.04]"
            />
          </AnimatePresence>

          {/* Slicing Progress Bar shown under the gif only while dragging */}
          {!isCut && swipeProgress > 0 && (
            <div className="w-full max-w-[220px] mt-4 h-1.5 bg-pink-100/80 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-75"
                style={{ width: `${swipeProgress}%` }}
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* BOTTOM ACTION BUTTON PANEL */}
      <div className="max-w-md w-full flex justify-center mb-6 z-10">
        {isCut ? (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-full flex justify-center px-4"
          >
            <GradientButton id="btn_see_photos" onClick={onNext} className="shadow-pink-300/40 w-full max-w-[240px]">
              Open Memories 📸
            </GradientButton>
          </motion.div>
        ) : (
          <div className="h-10 flex items-center justify-center">
            {/* Soft pulsing swiping guide message */}
            <motion.p
              animate={{ opacity: [0.35, 0.8, 0.35] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="font-sans font-bold text-xs uppercase tracking-widest text-[#d2547a]/60 text-center"
            >
              Swipe Anywhere To Slice ➔
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
}
