/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { AppSettings, DEFAULT_SETTINGS } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (updated: AppSettings) => void;
}

const MUSIC_PRESETS = [
  {
    title: 'Beautiful Dream Piano 🎹',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    title: 'Warm Acoustic Vibe 🎸',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    title: 'Magical Disney Bells 🔔',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export default function SettingsModal({ isOpen, onClose, settings, onSave }: SettingsModalProps) {
  const [partnerName, setPartnerName] = useState(settings.partnerName);
  const [age, setAge] = useState(settings.age);
  const [messageText, setMessageText] = useState(settings.messageText);
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(0);
  const [herReply, setHerReply] = useState('');

  useEffect(() => {
    // Sync states when modal opens
    setPartnerName(settings.partnerName);
    setAge(settings.age);
    setMessageText(settings.messageText);

    // Find active music preset index
    const index = MUSIC_PRESETS.findIndex((music) => music.url === settings.musicUrl);
    if (index !== -1) {
      setSelectedMusicIndex(index);
    }

    // Refresh reaction reply
    const reply = localStorage.getItem('birthday_reply');
    setHerReply(reply || '');
  }, [isOpen, settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AppSettings = {
      ...settings,
      partnerName: partnerName.trim() || 'My Girl',
      age: Number(age) || 20,
      birthYearText: `born ${age} years ago today!`,
      headlineText: `${partnerName} was born ${age} years ago today!`,
      messageText: messageText.trim() || DEFAULT_SETTINGS.messageText,
      musicUrl: MUSIC_PRESETS[selectedMusicIndex].url,
      musicTitle: MUSIC_PRESETS[selectedMusicIndex].title,
    };
    onSave(updated);
    onClose();
  };

  const handleResetToDefault = () => {
    setPartnerName(DEFAULT_SETTINGS.partnerName);
    setAge(DEFAULT_SETTINGS.age);
    setMessageText(DEFAULT_SETTINGS.messageText);
    setSelectedMusicIndex(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="settings_modal_wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Black backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black pointer-events-auto cursor-pointer"
          />

          {/* Modal core card */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-md w-full p-6 z-10 z-50 pointer-events-auto"
          >
            {/* Close button top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 font-sans font-bold text-lg select-none pointer-events-auto cursor-pointer"
            >
              ✕
            </button>

            <h3 className="font-sans font-extrabold text-xl text-rose-600 mb-4 flex items-center gap-2">
              ⚙️ Customize Surprise
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              {/* Partner Name */}
              <div className="flex flex-col gap-1">
                <label className="font-sans font-bold text-xs text-pink-700 uppercase tracking-wider text-left">
                  Girl's Name
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="bg-pink-50/50 border border-pink-150 rounded-xl px-3.5 py-2 text-sm text-pink-700 font-medium focus:ring-1 focus:ring-pink-400 focus:outline-none pointer-events-auto"
                  placeholder="e.g. Sneha"
                  required
                />
              </div>

              {/* Age */}
              <div className="flex flex-col gap-1">
                <label className="font-sans font-bold text-xs text-pink-700 uppercase tracking-wider text-left">
                  Age (She is turning)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value) || 0)}
                  className="bg-pink-50/50 border border-pink-150 rounded-xl px-3.5 py-2 text-sm text-pink-700 font-medium focus:ring-1 focus:ring-pink-400 focus:outline-none pointer-events-auto"
                  placeholder="e.g. 20"
                  required
                  min="1"
                />
              </div>

              {/* Romantic Message */}
              <div className="flex flex-col gap-1">
                <label className="font-sans font-bold text-xs text-pink-700 uppercase tracking-wider text-left">
                  Her Special Birthday Message
                </label>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="bg-pink-50/50 border border-pink-150 rounded-xl px-3.5 py-2 text-sm text-pink-700 font-medium focus:ring-1 focus:ring-pink-400 focus:outline-none pointer-events-auto custom-scrollbar"
                  placeholder="Write a sweet, romantic letter..."
                  required
                />
              </div>

              {/* Music Presets Selection */}
              <div className="flex flex-col gap-1">
                <label className="font-sans font-bold text-xs text-pink-700 uppercase tracking-wider text-left">
                  Background surprise track
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {MUSIC_PRESETS.map((preset, index) => (
                    <button
                      key={preset.title}
                      type="button"
                      onClick={() => setSelectedMusicIndex(index)}
                      className={`text-left px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide border cursor-pointer pointer-events-auto transition-colors ${
                        index === selectedMusicIndex
                          ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-transparent shadow-xs'
                          : 'bg-pink-50/30 border-pink-150 text-pink-700 hover:bg-pink-50'
                      }`}
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* REACTION FEEDBACK VIEW - SWEET DISCOVERY PANEL */}
              <div className="border-t border-pink-100 pt-3 flex flex-col gap-1 text-left bg-rose-50/40 p-3 rounded-2xl">
                <span className="font-sans font-bold text-[10px] text-pink-500 uppercase tracking-widest block">
                  💌 Her Saved Reaction
                </span>
                {herReply ? (
                  <p className="font-sans text-xs text-pink-700/90 font-medium italic select-all">
                    "{herReply}"
                  </p>
                ) : (
                  <p className="font-sans text-[11px] text-pink-400 italic">
                    No reaction has been left by her yet. Send her the app link to let her reply!
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-pink-100 flex items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="text-xs text-pink-400 hover:text-pink-600 font-bold uppercase tracking-widest cursor-pointer pointer-events-auto"
                >
                  Reset defaults
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer pointer-events-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer pointer-events-auto hover:opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
