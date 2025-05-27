'use client';

import { useState } from 'react';
import { AnimatePresence, motion, PanInfo, wrap } from 'motion/react';
import { streetPhotos } from '@/data';
import Image from 'next/image';
import { StickyTitle } from '@/components/StickyTitle';

export const Slider2 = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, streetPhotos.length, page);

  const onDrag = (_event:MouseEvent, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -5000) {
      setPage([page + 1, 1]);
    } else if (swipe > 5000) {
      setPage([page - 1, -1]);
    }
  };

  const variants = {
    start: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    end: (direction: number) => ({ zIndex: 1, x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <div className="relative">
      <StickyTitle>#2</StickyTitle>
      <div className="w-[300px] aspect-[6/9] relative top-1/2 start-1/2 -translate-y-1/2 -translate-x-1/2">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            initial="start"
            animate="center"
            exit="end"
            variants={variants}
            custom={direction}
            transition={{
              x: { type: 'spring', stiffness: 400, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDrag}
            className="overflow-hidden absolute inset-0 rounded-md ring-2 dark:ring-slate-800 ring-slate-500/50
             shadow-2xl dark:shadow-slate-800/50 shadow-slate-700 transition-theme"
          >
            <Image
              src={streetPhotos[imageIndex].src}
              alt={streetPhotos[imageIndex].id.toString()}
              sizes="50vw"
              fill
              className="object-contain"
              draggable={false}
            />
            <svg width="40" height="14.413" className="absolute start-2 bottom-2 transition-colors duration-300 fill-slate-400/30">
              <path d="M15.103 0 7.2 14.4H0L6.171 3.156C7.128 1.413 9.515 0 11.503 0z" stroke="none" strokeWidth="0.031746031746031744" />
              <path d="M32.76 3.6a3.6 3.6 0 1 1 7.2 0 3.6 3.6 0 0 1 -7.2 0" stroke="none" strokeWidth="0.031746031746031744" />
              <path d="M16.454 0h7.2L15.75 14.4h-7.2z" stroke="none" strokeWidth="0.031746031746031744" />
              <path d="M24.957 0h7.2l-6.171 11.244c-0.957 1.743 -3.344 3.156 -5.332 3.156h-3.6z" stroke="none" strokeWidth="0.031746031746031744" />
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
