'use client';

import { AnimatePresence, motion } from 'motion/react';

export const TimerUnit = ({ value }: { value: number }) => {
  return (
    <div className="w-4 h-8 relative overflow-clip">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute start-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
