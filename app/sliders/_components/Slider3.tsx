'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { streetPhotos } from '@/data';
import Image from 'next/image';
import { StickyTitle } from '@/components/StickyTitle';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export const Slider3 = () => {
  const [image, setImage] = useState(0);

  return (
    <div className="relative">
      <StickyTitle>#3</StickyTitle>
      <div className="flex justify-center items-center">
        <div className="p-4 flex flex-col gap-3 dark:bg-slate-800 bg-slate-50 shadow-2xl rounded-md transition-theme">
          <div className="w-[340px] h-[450px] flex gap-3 overflow-hidden">
            {streetPhotos.map(img => (
              <motion.div
                key={img.id}
                initial={{ x: 0 }}
                animate={{ x: image * -312 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="w-[300px] aspect-[6/9] relative"
              >
                <Image src={img.src} alt={img.id.toString()} fill sizes="300px" className="object-cover" />
              </motion.div>
            ))}
          </div>
          <div className="w-full flex items-center relative">
            <AnimatePresence>
              {image > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  draggable={false}
                  onClick={() => setImage(image > 0 ? image - 1 : image)}
                  className="w-9 h-9 mr-auto flex justify-center items-center dark:bg-slate-800 bg-slate-200
                   rounded-md border dark:border-slate-700 border-slate-300 transition-theme"
                >
                  <ArrowLeft />
                </motion.button>
              )}
            </AnimatePresence>
            <div className="absolute start-1/2 -translate-x-1/2  top-1/2 -translate-y-1/2 select-none flex gap-2">
              {streetPhotos.map((item, inx) => (
                <button
                  key={item.id}
                  onClick={() => setImage(inx)}
                  className={clsx('w-3 h-3 border dark:border-slate-700 border-slate-500 rounded', { 'bg-slate-300': image === inx })}
                ></button>
              ))}
            </div>

            <AnimatePresence>
              {image < streetPhotos.length - 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  onClick={() => setImage(image >= streetPhotos.length - 1 ? image : image + 1)}
                  className="w-9 h-9 ml-auto flex justify-center items-center dark:bg-slate-800 bg-slate-200
                    rounded-md border dark:border-slate-700 border-slate-300 transition-theme"
                >
                  <ArrowRight />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
