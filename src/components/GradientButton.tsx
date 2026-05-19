/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export default function GradientButton({
  children,
  onClick,
  className = '',
  id,
  disabled = false,
}: GradientButtonProps) {
  return (
    <motion.button
      id={id || `btn_${Math.random().toString(36).substr(2, 9)}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05, translateY: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative px-8 py-3.5 font-sans font-medium text-white transition-all bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-lg hover:shadow-pink-400/30 font-medium tracking-wide border border-pink-400/20 active:outline-none focus:outline-none flex items-center justify-center gap-2 cursor-pointer ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none -z-10" />
    </motion.button>
  );
}
