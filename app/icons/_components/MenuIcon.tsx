'use client';

import { motion } from 'motion/react';

export const MenuIcon = () => {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-slate-700 dark:stroke-slate-200"
    >
      <path d="M37.5 22.5H142.5A15 15 0 0 1 157.5 37.5V142.5A15 15 0 0 1 142.5 157.5H37.5A15 15 0 0 1 22.5 142.5V37.5A15 15 0 0 1 37.5 22.5z" />
      <path d="M22.5 67.5h135" />
      <path d="m112.5 105 -22.5 22.5 -22.5 -22.5" />
      <motion.path
        initial={{ d: 'M65 105 90 130 115 105' }}
        animate={{ d: 'M55 174 90 174 125 174' }}
        transition={{ repeat: Infinity, repeatDelay: 1, repeatType: 'loop', duration: 0.8 }}
        d="M65 105 90 130 115 105"
      />
    </svg>
  );
};
