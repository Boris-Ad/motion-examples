'use client';

import { motion } from 'motion/react';

export const PageTitle = ({ children }: { children: string }) => {
  return (
    <motion.h2 
      initial={{ y: 7, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{duration:0.2}}
      className="text-4xl mb-12 font-medium font-montserrat dark:text-foreground text-slate-700"
    >
      {children}
    </motion.h2>
  );
};
