'use client';

import { motion, useCycle } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { StickyTitle } from '@/components/StickyTitle';

export const Accordion1 = () => {
  const [value1, toggleValue1] = useCycle('close', 'open');
  const [value2, toggleValue2] = useCycle('close', 'open');

  const variants = {
    close: { height: 0, opacity: 0 },
    open: { height: 'auto', opacity: 1 },
  };

  return (
    <div className="relative">
      <StickyTitle>#1</StickyTitle>
      <div className="flex justify-center items-center">
        <div className="w-2xl p-4 border rounded-md shadow-lg transition-theme">
          <motion.section initial={false} animate={value1} className="pb-2 border-b dark:border-slate-800 border-slate-200 overflow-hidden transition-theme">
          <button onClick={() => toggleValue1()} className="w-full p-2 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image src="https://randomuser.me/api/portraits/women/75.jpg" alt="woman" width={50} height={50} className="rounded-full object-cover" />
              <p className="text-xl">Any Hale</p>
            </div>
            <ChevronDown className={clsx({ 'rotate-180': value1 === 'open' }, 'transition-transform')} />
          </button>
          <motion.div variants={variants} className="pl-18 pr-12">
            <p className="text-lg text-slate-600 dark:text-slate-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, numquam alias consectetur harum odit unde eveniet. Harum, obcaecati accusamus? Est
              aliquid perspiciatis vitae, officia suscipit laborum perferendis, quos sequi necessitatibus a maxime?
            </p>
          </motion.div>
        </motion.section>

        <motion.section initial={false} animate={value2} className="pt-2 overflow-hidden">
          <button onClick={() => toggleValue2()} className="w-full p-2 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image src="https://randomuser.me/api/portraits/men/75.jpg" alt="woman" width={50} height={50} className="rounded-full object-cover" />
              <p className="text-xl">John Wallace</p>
            </div>

            <ChevronDown className={clsx({ 'rotate-180': value2 === 'open' }, 'transition-transform')} />
          </button>

          <motion.div variants={variants} className="pl-18 pr-12">
            <p className="text-lg text-slate-600 dark:text-slate-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, numquam alias consectetur harum odit unde eveniet. Harum, obcaecati accusamus? Est
              aliquid perspiciatis vitae, officia suscipit?
            </p>
          </motion.div>
        </motion.section>
        </div>
      </div>
    </div>
  );
};
