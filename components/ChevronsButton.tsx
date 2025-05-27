'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Cycle, motion } from 'motion/react';
import { ChevronsIcon } from './icons/ChevronsIcon';

export const ChevronsButton = ({ open, toggleOpen }: { open: 'close' | 'open'; toggleOpen: Cycle }) => {
  const [hover, setHover] = useState<'start' | 'end'>('end');
  return (
    <button
      onClick={() => toggleOpen()}
      onMouseEnter={() => setHover('start')}
      onMouseLeave={() => setHover('end')}
      className={clsx('w-full pl-3 pr-5 flex dark:hover:text-slate-200 hover:text-slate-900', open === 'close' ? 'justify-start' : 'justify-end')}
    >
      <motion.div layout>
        <ChevronsIcon hover={hover} styles={clsx(open === 'close' ? 'rotate-0' : 'rotate-180')} />
      </motion.div>
    </button>
  );
};
