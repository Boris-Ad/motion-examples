'use client';

import { useState } from 'react';
import { motion, PanInfo, wrap } from 'motion/react';
import { streetPhotos } from '@/data';
import Image from 'next/image';
import { StickyTitle } from '@/components/StickyTitle';

export const Slider1 = () => {
  const [count, setCount] = useState(0);
  const positions = ['left1', 'left2', 'center', 'right1', 'right2'];
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const variants = {
    left1: { x: -200, zIndex: direction === 'left' ? 2 : 1, scale: 0.8, filter:'blur(2px)' },
    left2: { x: -310, zIndex: direction === 'left' ? 4 : 3, scale: 0.9, filter:'blur(0px)' },
    center: { x: 0, zIndex: 5, scale: 1,filter:'blur(0px)' },
    right1: { x: 310, zIndex: direction === 'right' ? 4 : 3, scale: 0.9, filter:'blur(0px)' },
    right2: { x: 200, zIndex: direction === 'right' ? 2 : 1, scale: 0.8, filter:'blur(2px)' },
  };

  const onDrag = (_event:MouseEvent, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -5000) {
      setCount(prev => prev - 1);
      setDirection('left');
    } else if (swipe > 5000) {
      setCount(prev => prev + 1);
      setDirection('right');
    }
  };

  return (
    <div className='relative'>
      <StickyTitle>#1</StickyTitle>
      <div className="w-[300px] aspect-[6/9] relative top-1/2 start-1/2 -translate-y-1/2 -translate-x-1/2">
        {streetPhotos.map((img, inx) => (
          <motion.div
            key={img.id}
            initial={false}
            animate={positions[wrap(0, streetPhotos.length, count + inx)]}
            variants={variants}
            drag="x"
            dragListener={positions[wrap(0, streetPhotos.length, count + inx)] === 'center' ? true : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDrag}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 overflow-hidden rounded-md ring-2 dark:ring-slate-800 ring-slate-500/50
             shadow-2xl dark:shadow-slate-800 shadow-slate-700 transition-theme"
          >
            <Image src={img.src} alt={img.id.toString()} fill sizes="500px" draggable={false} className="object-center" />
            <svg width="40" height="14.413" className="absolute start-2 bottom-2 transition-colors duration-300 fill-slate-400/30">
              <path d="M15.103 0 7.2 14.4H0L6.171 3.156C7.128 1.413 9.515 0 11.503 0z" stroke="none" strokeWidth="0.031746031746031744" />
              <path d="M32.76 3.6a3.6 3.6 0 1 1 7.2 0 3.6 3.6 0 0 1 -7.2 0" stroke="none" strokeWidth="0.031746031746031744" />
              <path d="M16.454 0h7.2L15.75 14.4h-7.2z" stroke="none" strokeWidth="0.031746031746031744" />
              <path d="M24.957 0h7.2l-6.171 11.244c-0.957 1.743 -3.344 3.156 -5.332 3.156h-3.6z" stroke="none" strokeWidth="0.031746031746031744" />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
