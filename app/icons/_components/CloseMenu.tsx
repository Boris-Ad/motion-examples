'use client';

import { motion, MotionConfig } from 'motion/react';

export const CloseMenu = () => {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-slate-700 dark:stroke-slate-200"
    >
      <MotionConfig transition={{ repeat: Infinity, repeatDelay: 1, repeatType: 'mirror' }}>
        <motion.line initial={{ y1: '50', y2: '50' }} animate={{ y1: [50, 90, 50], y2: [50, 90, 130] }} x1="30" y1="50" x2="150" y2="50" />
        <motion.line initial={{ opacity: 1 }} animate={{ opacity: [1, 0, 0] }} x1="30" y1="90" x2="150" y2="90" />
        <motion.line initial={{ y1: '130', y2: '130' }} animate={{ y1: [130, 90, 130], y2: [130, 90, 50] }} x1="30" y1="130" x2="150" y2="130" />
      </MotionConfig>
    </svg>
  );
};

