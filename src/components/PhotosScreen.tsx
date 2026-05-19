/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { AppSettings } from '../types';
import GradientButton from './GradientButton';

// Import our custom-generated high fidelity gorgeous portraits of the birthday girl
import yellowOutfitImg from '../assets/images/girl_yellow_outfit_1779224872984.png';
import blackOutfitImg from '../assets/images/girl_black_outfit_1779224895614.png';
import lavenderOutfitImg from '../assets/images/girl_lavender_outfit_1779224917545.png';
import goldOutfitImg from '../assets/images/girl_gold_outfit_1779224933838.png';
import embroideredOutfitImg from '../assets/images/girl_embroidered_outfit_1779224954851.png';

interface PhotosScreenProps {
  settings: AppSettings;
  onNext: () => void;
}

export default function PhotosScreen({ settings, onNext }: PhotosScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Polaroid deck featuring the 5 newly uploaded beautiful portrait assets of the birthday girl
  const polaroids = [
    {
      id: 'p1',
      imageUrl: yellowOutfitImg,
      caption: 'In that bright yellow dress, your warmth and grace shine brighter than the sun itself. 💛✨',
      color: 'border-yellow-200',
    },
    {
      id: 'p2',
      imageUrl: blackOutfitImg,
      caption: 'A touch of black and silver, and you effortlessly take my breath away. Absolute royalty. 🖤💫',
      color: 'border-neutral-200',
    },
    {
      id: 'p3',
      imageUrl: lavenderOutfitImg,
      caption: 'The way you smile in lavender Grey, soft and magical like a beautiful dream. 💜🌸',
      color: 'border-purple-200',
    },
    {
      id: 'p4',
      imageUrl: goldOutfitImg,
      caption: 'Basking in pure golden hour elegance, looking breathtakingly stunning. 💛👑',
      color: 'border-amber-200',
    },
    {
      id: 'p5',
      imageUrl: embroideredOutfitImg,
      caption: `Traditional look, delicate bangles, and the majestic maang tikka—truly my gorgeous girl. 💖🌺`,
      color: 'border-pink-300',
    },
  ];

  const handleNextCard = () => {
    setActiveIndex((prev) => (prev + 1) % polaroids.length);
  };

  const handlePrevCard = () => {
    setActiveIndex((prev) => (prev - 1 + polaroids.length) % polaroids.length);
  };

  return (
    <div
      id="photos_screen_container"
      className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-tr from-pink-50 to-pink-100 px-6 py-12 relative overflow-hidden select-none"
    >
      {/* Soft romantic backdrop blurs */}
      <div className="absolute top-[10%] left-[20%] w-48 h-48 rounded-full bg-pink-200 blur-3xl opacity-40 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-64 h-64 rounded-full bg-rose-200 blur-3xl opacity-40 animate-pulse pointer-events-none" />

      <div className="max-w-md w-full flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2
            id="photos_screen_header"
            className="font-sans font-extrabold text-3xl text-rose-600 tracking-tight"
          >
            Some Sweet Moments
          </h2>
          <p className="text-sm text-pink-500/80 font-medium mt-1">
            Revisiting some memories representing how precious you are to me...
          </p>
        </motion.div>

        {/* POLAROID FRAME CAROUSEL */}
        <div id="polaroid_deck_container" className="relative w-full max-w-[290px] h-[370px] flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.85, x: 50, rotate: activeIndex % 2 === 0 ? 3 : -3 }}
              animate={{ opacity: 1, scale: 1, x: 0, rotate: activeIndex % 2 === 0 ? -1 : 2 }}
              exit={{ opacity: 0, scale: 0.85, x: -50, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className={`absolute bg-white p-4 pb-6 rounded-xl shadow-2xl border ${polaroids[activeIndex].color} max-w-[270px] w-full flex flex-col items-center`}
            >
              {/* Retro sticker/tape decoration */}
              <div className="absolute -top-3 left-[50%] transform -translate-x-[50%] w-20 h-6 bg-pink-200/50 hover:bg-pink-300/40 backdrop-blur-xs border border-pink-300/20 rotate-1 rounded-sm shadow-xs pointer-events-none" />

              {/* Photo layout */}
              <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border border-pink-100 relative group">
                <img
                  src={polaroids[activeIndex].imageUrl}
                  alt={`Polaroid snap ${activeIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Polaroid bottom caption */}
              <p
                id={`polaroid_caption_${activeIndex}`}
                className="font-sans font-medium text-center text-sm text-pink-700 mt-5 leading-normal select-none italic text-pink-700/90 h-[4.5rem] flex items-center justify-center px-1"
              >
                {polaroids[activeIndex].caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CAROUSEL NAVIGATION CONTROLS */}
        <div id="carousel_dot_navigator" className="flex items-center gap-6 mb-8 z-20">
          <button
            onClick={handlePrevCard}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-rose-500 shadow-sm transition-all active:scale-90 cursor-pointer"
          >
            ◀
          </button>

          <div className="flex gap-2">
            {polaroids.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? 'bg-rose-500 scale-125 w-4' : 'bg-pink-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextCard}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-rose-500 shadow-sm transition-all active:scale-90 cursor-pointer"
          >
            ▶
          </button>
        </div>

        {/* Message Trigger button wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full flex justify-center"
        >
          <GradientButton id="btn_open_message" onClick={onNext} className="shadow-pink-300/40">
            Open My Message ✉️
          </GradientButton>
        </motion.div>
      </div>
    </div>
  );
}
