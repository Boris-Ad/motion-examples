'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export const SunIcon = () => {
  const [hover, setHover] = useState<'start' | 'end'>('end');

  const variantsPath = {
    start: { scale: [1, 0.3, 1], transition: { duration: 0.3 } },
    end: { scale: 1, transition: { duration: 0.3 } },
  };
  const variantsCircle = {
    start: { r: [4, 5, 4], transition: { duration: 0.3 } },
    end: { r: 4, transition: { duration: 0.3 } },
  };

  return (
    <span onMouseEnter={() => setHover('start')} onMouseLeave={() => setHover('end')} className="cursor-pointer">
      <motion.svg
        initial={false}
        animate={hover}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <motion.circle variants={variantsCircle} cx="12" cy="12" r="4"></motion.circle>
        <motion.path variants={variantsPath} d="m19.07 4.93-1.41 1.41"></motion.path>
        <motion.path variants={variantsPath} d="M20 12h2"></motion.path>
        <motion.path variants={variantsPath} d="M12 20v2"></motion.path>
        <motion.path variants={variantsPath} d="m17.66 17.66 1.41 1.41"></motion.path>
        <motion.path variants={variantsPath} d="m6.34 17.66-1.41 1.41"></motion.path>
        <motion.path variants={variantsPath} d="M2 12h2"></motion.path>
        <motion.path variants={variantsPath} d="m4.93 4.93 1.41 1.41"></motion.path>
        <motion.path variants={variantsPath} d="M12 2v2"></motion.path>
      </motion.svg>
    </span>
  );
};
