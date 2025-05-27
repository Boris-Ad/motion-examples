'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export const MoonIcon = () => {
  const [hover, setHover] = useState<'start' | 'end'>('end');

  const variants = {
    start: { rotate:['0deg','-20deg','20deg','0deg'],transition:{duration:0.5} },
    end: { rotate:'0deg' },
  };

  return (
    <span onMouseEnter={() => setHover('start')} onMouseLeave={() => setHover('end')} className="cursor-pointer">
      <motion.svg
        initial={false}
        animate={hover}
        variants={variants}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </motion.svg>
    </span>
  );
};


