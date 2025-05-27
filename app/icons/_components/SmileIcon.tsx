'use client';

import { motion, useCycle } from 'motion/react';
import { RefreshButton } from './RefreshButton';

export const SmileIcon = () => {
  const [face, toggleFace] = useCycle('smile', 'angry');

  const variantsSmile = {
    smile: { d: 'M60,105C70,130 110,130 120,105' },
    angry: { d: 'M50,120C70,105 110,105 130,120' },
  };

  const variantsLeftBrow = {
    smile: { x1: 55, y1: 55, x2: 70, y2: 48 },
    angry: { x1: 60, y1: 55, x2: 75, y2: 60 },
  };
  const variantsRightBrow = {
    smile: { x1: 110, y1: 48, x2: 125, y2: 55 },
    angry: { x1: 105, y1: 60, x2: 120, y2: 55 },
  };

  return (
    <>
      <motion.svg
        initial={false}
        animate={face}
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{smile:{stroke:'var(--color-green-400)'},angry:{stroke:'var(--color-amber-600)'}}}
        
      >
        <path cx="12" cy="12" r="10" d="M165 90A75 75 0 0 1 90 165A75 75 0 0 1 15 90A75 75 0 0 1 165 90z" />
        <motion.line variants={variantsLeftBrow} />
        <motion.line variants={variantsRightBrow} />
        <motion.path variants={variantsSmile} />
        <path x1="9" x2="9" y1="9" y2="9" d="M67.5 67.5L67.575 67.5" />
        <path x1="15" x2="15" y1="9" y2="9" d="M112.5 67.5L112.575 67.5" />
      </motion.svg>

      <RefreshButton onToggle={toggleFace} />
    </>
  );
};
