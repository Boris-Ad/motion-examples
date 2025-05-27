'use client';

import { Cycle, motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';

export const RefreshButton = ({ onToggle }: { onToggle: Cycle }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => onToggle()}
      className="w-8 h-8 rounded-md dark:bg-slate-700 bg-slate-200 absolute bottom-2 end-2
       flex justify-center items-center group border dark:border-slate-600 border-slate-300 transition-colors duration-300"
    >
      <RefreshCw className="group-hover:rotate-180 transition-transform text-slate-500 dark:text-foreground" />
    </motion.button>
  );
};
