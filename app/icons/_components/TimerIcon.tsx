'use client';

import { motion } from 'motion/react';

export const TimerIcon = () => {
  return (
    <motion.svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-slate-700 dark:stroke-slate-200"
    >
      <motion.path
        animate={{ rotate: '360deg', transformOrigin: 'bottom left' }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, repeatType: 'loop' }}
        d="M90 105L112.5 82.5"
      />
      <motion.path
        animate={{ rotate: ['0deg', '-20deg', '0deg', '20deg', '0deg'] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 0.7, repeatType: 'loop' }}
        d="M75 15L105 15"
      />

      <path cx="12" cy="14" r="8" d="M150 105A60 60 0 0 1 90 165A60 60 0 0 1 30 105A60 60 0 0 1 150 105z" />
    </motion.svg>
  );
};
