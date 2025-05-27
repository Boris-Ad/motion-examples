'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

export const StickyTitle = ({ children }: { children: string }) => {
  const [vision, setVision] = useState<'visible' | 'hidden'>('visible');
  const ref = useRef(null);
  const isInView = useInView(ref);

  const variants = {
    visible: { x: 0, opacity: 1, scale: 1 },
    hidden: { x: -200, opacity: 0, scale: 0.5 },
  };

  useEffect(() => {
    if (isInView) {
      setVision('visible');
    } else {
      setVision('hidden');
    }
  }, [isInView]);

  return (
    <div ref={ref} className="sticky top-0">
      <motion.h2
        initial={{ x: -200, opacity: 0, scale: 0.5 }}
        animate={vision}
        variants={variants}
        transition={{ duration: 0.3 }}
        className="inline-block text-4xl pl-10 font-medium font-montserrat dark:text-foreground text-slate-700"
      >
        {children}
      </motion.h2>
    </div>
  );
};
