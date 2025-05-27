'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StickyTitle } from '@/components/StickyTitle';
import { persons } from '@/data';
import clsx from 'clsx';
import Image from 'next/image';
import { ChevronsRight } from 'lucide-react';

export const DropMenu1 = () => {
  const parentRef = useRef<HTMLElement>(null);
  const [center, setCenter] = useState(0);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState(0);

  const onEnter = (e: React.MouseEvent<HTMLButtonElement>, inx: number) => {
    if (parentRef.current == null) return;
    setDirection(count - inx);
    setOpen(true);
    const parent = parentRef.current.getBoundingClientRect();
    const { width, x } = e.currentTarget.getBoundingClientRect();
    const parentCenter = parent.x + parent.width / 2;
    const center = x + width / 2;
    setCenter(center - parentCenter);
    setCount(inx);
  };

  return (
    <div className="relative">
      <StickyTitle>#1</StickyTitle>
      <div className="flex justify-center items-center">
        <nav
          ref={parentRef}
          className="w-2xl h-14 flex justify-center items-center gap-x-4 border dark:border-slate-700/50 border-slate-300/50 dark:bg-slate-800 bg-slate-100
         rounded-full shadow-lg relative transition-theme"
        >
          {persons.map((person, inx) => (
            <button
              onMouseEnter={e => onEnter(e, inx)}
              onMouseLeave={() => setOpen(false)}
              key={person.id}
              className={clsx('px-3 text-lg transition-color delay-75 duration-200', { 'text-amber-500': open && inx === count })}
            >
              {person.name.split(' ')[0]}
            </button>
          ))}

          <AnimatePresence>
            {open && (
              <motion.div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { delay: 0.1 } }}
                transition={{ duration: 0.2 }}
                className="w-72 min-h-32 absolute bottom-0.5 translate-y-full start-1/2 -translate-x-1/2 dark:bg-slate-700 bg-slate-100
                 rounded-md border dark:border-slate-500 border-slate-300 shadow-lg"
              >
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: center }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{ rotate: 45 }}
                  className="w-3 h-3 dark:bg-slate-700 bg-slate-100 absolute -top-px -translate-y-1/2 start-1/2 -translate-x-1/2 border-l border-t
                   dark:border-slate-500 border-slate-300"
                />
                <div className="flex overflow-hidden">
                  <motion.div
                    key={count}
                    initial={{ x: 100 * direction, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full p-3 flex flex-col space-y-2"
                  >
                    <div className="flex items-center gap-x-3">
                      <Image src={persons[count].img} alt={persons[count].name} width={40} height={40} className="object-center rounded-full" />
                      <h3 className="text-lg">{persons[count].name}</h3>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere est facilis omnis?</p>
                    <ChevronsRight size={18} className="ml-auto" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
};
