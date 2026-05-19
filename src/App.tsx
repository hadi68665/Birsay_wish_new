/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { AppSettings, DEFAULT_SETTINGS, ScreenType } from './types';

// Importing all required screens constructed modularly
import CountdownScreen from './components/CountdownScreen';
import LoaderScreen from './components/LoaderScreen';
import IntroScreen from './components/IntroScreen';
import CakeScreen from './components/CakeScreen';
import PhotosScreen from './components/PhotosScreen';
import MessageScreen from './components/MessageScreen';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('countdown');
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Background Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load custom settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('birthday_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing settings, fallback to defaults', e);
      }
    }
  }, []);

  // Update Audio source whenever musicUrl changes
  useEffect(() => {
    if (audioRef.current) {
      const stoodIsPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = settings.musicUrl;
      audioRef.current.load();
      if (stoodIsPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Audio play request failed:', err);
        });
      }
    }
  }, [settings.musicUrl]);

  // Handle setting updates
  const handleSaveSettings = (updated: AppSettings) => {
    setSettings(updated);
    localStorage.setItem('birthday_settings', JSON.stringify(updated));
  };

  // Attempt to trigger gentle music play on any screen interaction (helps bypass browser autoplay blocks)
  const handleAutoplayAction = () => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Autoplay deferred until primary click events:', err);
        });
    }
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Audio play failure', err));
    }
  };

  const handleNextScreen = (next: ScreenType) => {
    handleAutoplayAction(); // Try to play music on next button clicks!
    setScreen(next);
  };

  const resetSurprise = () => {
    setScreen('countdown');
  };

  return (
    <div 
      id="surprise_app_root" 
      onClick={handleAutoplayAction}
      className="min-h-screen w-full relative bg-pink-50 text-pink-900 selection:bg-pink-300 selection:text-pink-900"
    >
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={settings.musicUrl}
        loop
        preload="auto"
      />

      {/* TOP FLOATING CONTROL BAR (Settings & Music widgets) */}
      <div 
        id="floating_header_controls"
        className="absolute top-4 right-4 z-40 flex items-center gap-2"
      >
        {/* Soothing audio widget */}
        <motion.button
          id="btn_toggle_audio"
          onClick={toggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isPlaying ? `Pause: ${settings.musicTitle}` : 'Play sweet birthday music'}
          className="w-10 h-10 rounded-full bg-white/75 backdrop-blur-md border border-pink-200/50 flex items-center justify-center text-rose-500 shadow-md cursor-pointer hover:bg-pink-100 transition-colors relative"
        >
          {isPlaying ? (
            <motion.span 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="text-base font-bold"
            >
              🎵
            </motion.span>
          ) : (
            <span className="text-base opacity-75">🔇</span>
          )}

          {/* Pulsing decoration when music is alive */}
          {isPlaying && (
            <div className="absolute -inset-1.5 rounded-full border border-pink-400/30 animate-ping pointer-events-none" />
          )}
        </motion.button>

        {/* Surprise configurations edit cog */}
        <motion.button
          id="btn_open_settings"
          onClick={(e) => {
            e.stopPropagation();
            setIsSettingsOpen(true);
          }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          title="Customize names, ages, messages, & letters"
          className="w-10 h-10 rounded-full bg-white/75 backdrop-blur-md border border-pink-200/50 flex items-center justify-center text-rose-400 shadow-md cursor-pointer hover:bg-pink-100 transition-colors"
        >
          <span className="text-base">⚙️</span>
        </motion.button>
      </div>

      {/* RENDER ACTIVE SURPRISE PHASE SCREEN */}
      <div id="surprise_active_viewport" className="w-full relative min-h-screen">
        <AnimatePresence mode="wait">
          {screen === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <CountdownScreen onComplete={() => handleNextScreen('loader')} />
            </motion.div>
          )}

          {screen === 'loader' && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <LoaderScreen onComplete={() => handleNextScreen('intro')} />
            </motion.div>
          )}

          {screen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <IntroScreen settings={settings} onNext={() => handleNextScreen('cake')} />
            </motion.div>
          )}

          {screen === 'cake' && (
            <motion.div
              key="cake"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <CakeScreen settings={settings} onNext={() => handleNextScreen('photos')} />
            </motion.div>
          )}

          {screen === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <PhotosScreen settings={settings} onNext={() => handleNextScreen('message')} />
            </motion.div>
          )}

          {screen === 'message' && (
            <motion.div
              key="message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            >
              <MessageScreen settings={settings} onReset={resetSurprise} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SURPRISE PERSONALIZATION CONTROL MODAL */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
