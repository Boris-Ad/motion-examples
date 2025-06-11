'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTimer } from '@/hooks/useTimer';
import { StickyTitle } from '@/components/StickyTitle';
import { TimerUnit } from './TimerUnit';

export const Timer1 = () => {
  const { setStop, onReset, seconds, minutes } = useTimer();
  const [reset, setReset] = useState(0);

  return (
    <div className="relative">
      <StickyTitle>#1</StickyTitle>
      <div className="h-full flex justify-center items-center">
        <div className="p-4 border rounded-md flex flex-col space-y-4 transition-theme shadow-lg">
          <div className="flex-1 relative flex flex-col space-y-3">
            <div className="flex-1 flex justify-center items-center">
              <svg width={300} height={300} strokeLinecap="round" className="stroke-2 dark:stroke-amber-500 stroke-amber-400">
                <circle r="145" cx="150" cy="150" fill="none" />

                <motion.path key={reset} animate={{ rotate: `${6 * seconds[2]}deg`, transformOrigin: 'bottom' }} d="M 150 150 150 20" />
                <path d="M 0 150 20 150" />
                <path d="M 280 150 300 150" />
                <path d="M 150 0 150 20" />
                <path d="M 150 280 150 300" />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-3xl">
              <TimerUnit value={minutes[0]} />
              <TimerUnit value={minutes[1]} />
              <div className="flex flex-col gap-1.5">
                <div className="size-1 bg-foreground rounded-full transition-theme" />
                <div className="size-1 bg-foreground rounded-full transition-theme" />
              </div>
              <TimerUnit value={seconds[0]} />
              <TimerUnit value={seconds[1]} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button click={() => setStop(false)}>Старт</Button>
            <Button click={() => setStop(true)}>Стоп</Button>
            <Button
              click={() => {
                onReset();
                setReset(prev => prev + 1);
              }}
            >
              Сброс
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Button = ({ children, click }: { children: string; click: () => void }) => {
  return (
    <button
      onClick={click}
      className="h-10 w-full border rounded-md flex justify-center items-center flex-1 transition-theme
       dark:hover:bg-slate-800 dark:active:border-slate-500 hover:bg-slate-200 active:border-slate-400"
    >
      {children}
    </button>
  );
};
