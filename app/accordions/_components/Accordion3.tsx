'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { StickyTitle } from '@/components/StickyTitle';
import { persons } from '@/data';

export const Accordion3 = () => {
  const [count, setCount] = useState(-1);

  return (
    <div className="relative">
      <StickyTitle>#3</StickyTitle>
      <div className="flex justify-center items-center">
        <div className="w-3xl h-[400px] border rounded-md flex relative shadow-lg transition-theme">
          <aside className="w-56 px-2 py-4 border-r flex flex-col gap-2 transition-theme">
            {persons.map((person, inx) => (
              <motion.button
                key={person.id}
                layoutId={'modal' + inx}
                onClick={() => setCount(inx)}
                className="h-10 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 hover:dark:bg-slate-800/50 rounded flex items-center gap-3
              transition-theme"
              >
                <motion.span layout>
                  <Image src={person.img} alt={person.name} width={32} height={32} className="size-8 object-cover rounded-full flex-none" />
                </motion.span>
                <motion.span layout>{person.name}</motion.span>
              </motion.button>
            ))}
          </aside>
          <div className="p-4 flex-1">
            <h2 className="text-2xl text-center font-montserrat">Список сотрудников</h2>
          </div>
          <AnimatePresence>
            {count >= 0 && (
              <motion.div
                layoutId={'modal' + count}
                transition={{ duration: 0.3 }}
                className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md absolute inset-0 flex flex-col transition-theme"
              >
                <div className="mb-3 flex justify-between items-center">
                  <h2 className="text-2xl">{persons[count].name}</h2>
                  <Image src={persons[count].img} alt={persons[count].name} width={64} height={64} className="size-16 object-cover flex-none rounded-full" />
                </div>
                <p className="text-slate-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, voluptatem atque? Amet.</p>
                <div className="mt-auto flex justify-end">
                  <button
                    onClick={() => setCount(-1)}
                    className="w-full max-w-40 py-1.5 border rounded-md dark:border-slate-700 border-slate-200 dark:hover:bg-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
