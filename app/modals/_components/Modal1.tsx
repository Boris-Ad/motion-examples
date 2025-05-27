'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useAnimationFrame, useCycle, useMotionTemplate, useMotionValue, useTime, useTransform, wrap } from 'motion/react';
import { StickyTitle } from '@/components/StickyTitle';
import { useMounted } from '@/hooks/useMounted';
import { X } from 'lucide-react';

export const Modal1 = () => {
  const [open, toggleOpen] = useCycle('close', 'open');
  const { mounted } = useMounted();
  const x = useMotionValue(0);
  const time = useTime();
  const deg = useTransform(time, [0, 4000], [0, 360], { clamp: false });
  const backgroundImage = useMotionTemplate`conic-gradient(from ${deg}deg, var(--color-blue-500), var(--color-rose-500), var(--color-green-500))`;

  useAnimationFrame(t => {
    const test = wrap(-160, 12, (t / 100) * 5);
    x.set(test);
  });

  const wrapVariants = {
    initial: { opacity: 0, backdropFilter: 'blur(0px)' },
    animate: { opacity: 1, backdropFilter: 'blur(5px)' },
    exit: { opacity: 0, backdropFilter: 'blur(0px)' },
  };

  const dialogVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <div className="relative text-lg">
      <StickyTitle>#1</StickyTitle>
      <div className="h-full flex justify-center items-center">
        <motion.div style={{ backgroundImage }} className="w-56 h-12 relative rounded-md overflow-hidden shadow-lg">
          <div className="absolute inset-0 backdrop-blur-xl">
            <button
              onClick={() => toggleOpen()}
              className="absolute inset-0.5 dark:bg-slate-800 bg-slate-100 rounded-sm opacity-90 hover:opacity-80 active:opacity-90 transition-theme"
            >
              Open
            </button>
          </div>
        </motion.div>
      </div>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open === 'open' && (
              <motion.div
                onClick={() => toggleOpen()}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={wrapVariants}
                className="absolute inset-0 bg-black/10 grid place-content-center z-50"
              >
                <motion.div
                  variants={dialogVariants}
                  onClick={e => e.stopPropagation()}
                  className="w-xl aspect-[3/2] dark:bg-slate-800 bg-slate-100 rounded-md shadow-lg ring ring-slate-300 dark:ring-slate-700 relative"
                >
                  <div className="w-[220px] p-2 absolute top-0 start-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md bg-inherit shadow-md">
                    <h3 className="text-center text-lg font-montserrat font-medium">Пример</h3>
                  </div>

                  <button
                    onClick={() => toggleOpen()}
                    className="w-9 h-9 absolute top-4 end-4 flex justify-center items-center rounded-md hover:border hover:dark:border-slate-600 hover:dark:bg-slate-700 
                  hover:border-slate-300 hover:bg-slate-200 transition-color"
                  >
                    <X size={26} />
                  </button>
                  <div className="absolute inset-x-0 bottom-3 overflow-hidden">
                    <motion.div style={{ x }} className=" flex flex-nowrap gap-3">
                      {Array.from(new Array(8).keys()).map(item => (
                        <span className="w-[160px] flex-none text-nowrap text-lg font-roboto bg-clip-text text-transparent bg-gradient-to-r
                         from-amber-400 to-amber-600 dark:from-amber-200 dark:to-amber-400" key={item}>
                          Модальное окно
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
          'modal-1'
        )}
    </div>
  );
};
