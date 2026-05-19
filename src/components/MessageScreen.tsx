/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { AppSettings } from '../types';
import GradientButton from './GradientButton';

interface MessageScreenProps {
  settings: AppSettings;
  onReset: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

export default function MessageScreen({ settings, onReset }: MessageScreenProps) {
  const [replyText, setReplyText] = useState('');
  const [savedReply, setSavedReply] = useState('');
  const [showHearts, setShowHearts] = useState(true);
  const [heartsList, setHeartsList] = useState<FloatingHeart[]>([]);

  // Load existing reply if present
  useEffect(() => {
    const stored = localStorage.getItem('birthday_reply');
    if (stored) {
      setSavedReply(stored);
    }

    // Generate floating hearts layout coords
    const list: FloatingHeart[] = Array.from({ length: 15 }).map((_, index) => ({
      id: index,
      x: Math.random() * 90 + 5, // percentage left
      size: Math.random() * 20 + 12, // size in px
      delay: Math.random() * 5, // delayed starts
      duration: Math.random() * 4 + 4, // speed
    }));
    setHeartsList(list);
  }, []);

  const handleSaveReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    localStorage.setItem('birthday_reply', replyText);
    setSavedReply(replyText);
    setReplyText('');

    // Trigger sweet feedback burst
    setShowHearts(false);
    setTimeout(() => {
      setShowHearts(true);
    }, 100);
  };

  const handleClearReply = () => {
    localStorage.removeItem('birthday_reply');
    setSavedReply('');
  };

  return (
    <div
      id="message_screen_container"
      className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-tr from-pink-50 to-pink-100 px-4 py-12 relative overflow-hidden select-none"
    >
      {/* CONTINUOUS FLOATING RISING HEARTS BACKGROUND */}
      <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none z-0 overflow-hidden">
        {showHearts &&
          heartsList.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-pink-400 opacity-30 select-none"
              style={{
                left: `${heart.x}%`,
                bottom: '-20px',
                fontSize: `${heart.size}px`,
              }}
              animate={{
                y: [0, -1000],
                x: [0, Math.sin(heart.id) * 40],
                rotate: [0, 360],
                opacity: [0, 0.4, 0.4, 0],
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              ❤️
            </motion.div>
          ))}
      </div>

      <div className="max-w-md w-full flex flex-col items-center relative z-10">
        {/* Special Letter Container */}
        <motion.div
          id="letter_outer_box"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-pink-100 w-full mb-6 relative overflow-hidden"
        >
          {/* Heart Stamp design on letter */}
          <div className="absolute top-4 right-4 bg-rose-100 text-rose-500 w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-xs shadow-xs border border-rose-200">
            ♥️
          </div>

          <h2
            id="message_letters_title"
            className="font-sans font-extrabold text-2xl text-rose-600 tracking-tight mb-4 border-b border-pink-100 pb-2 flex items-center gap-1.5"
          >
            A Special Message ✉️
          </h2>

          {/* Letter Body text - highly elegant scrollable or styled container */}
          <div
            id="letter_body_parchment"
            className="font-sans text-pink-800/90 text-sm leading-relaxed text-left space-y-4 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar whitespace-pre-wrap font-medium"
          >
            {settings.messageText}
          </div>

          <div className="mt-6 pt-3 border-t border-pink-100 text-right">
            <p className="font-sans text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">
              With all my heart,
            </p>
            <p className="font-sans font-bold text-base text-rose-500">
              Forever Yours ❤️
            </p>
          </div>
        </motion.div>

        {/* FEEDBACK REPLY BOX - PERFECT ROMANTIC REVELATION */}
        <motion.div
          id="reply_feedback_box"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-pink-100 text-center"
        >
          {!savedReply ? (
            <form onSubmit={handleSaveReply} className="flex flex-col gap-2.5">
              <label className="font-sans font-bold text-xs text-pink-600 uppercase tracking-widest block text-left">
                Leave a sweet reaction! 💬
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="I love you! / This is beautiful..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-white border border-pink-200/80 rounded-xl px-3 py-2 text-sm text-pink-700 font-medium focus:outline-none focus:ring-1 focus:ring-pink-400 placeholder:text-pink-300 pointer-events-auto"
                />
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-sans font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer pointer-events-auto shrink-0"
                >
                  Send ❤️
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="text-pink-600 font-bold text-sm mb-1 uppercase tracking-wide">
                Your Sweet Reaction Saved! 💖
              </div>
              <p className="text-xs text-pink-700/80 italic font-medium px-2 py-1 max-w-[300px]">
                "{savedReply}"
              </p>
              <button
                onClick={handleClearReply}
                className="text-[10px] text-pink-400 hover:text-pink-600 font-bold uppercase tracking-widest mt-2 pointer-events-auto cursor-pointer"
              >
                [ edit reply ]
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Restart Surprise Trigger */}
        <motion.button
          id="btn_relaunch_surprise"
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-sans font-extrabold text-xs text-pink-500 uppercase tracking-widest mt-8 flex items-center gap-1 cursor-pointer pointer-events-auto"
        >
          🔄 Re-play the Surprise
        </motion.button>
      </div>
    </div>
  );
}
