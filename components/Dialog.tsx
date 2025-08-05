'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useMounted } from '@/hooks/useMounted';

export const Dialog = ({ children, open, close }: { children: React.ReactNode; open?: string; close: () => void }) => {
  const { mounted } = useMounted();

  const wrapVariants = {
    initial: { opacity: 0, backdropFilter: 'blur(0px)' },
    animate: { opacity: 1, backdropFilter: 'blur(5px)' },
    exit: { opacity: 0, backdropFilter: 'blur(0px)' },
  };

  const dialogVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition:{duration:0.2} },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={wrapVariants}
            onClick={close}
            className="absolute inset-0 bg-black/30 flex justify-center items-center z-50"
          >
            <motion.div variants={dialogVariants} onClick={e => e.stopPropagation()} className="w-xl relative">
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      'dialog-root'
    )
  );
};
