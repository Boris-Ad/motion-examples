'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { startOfToday, format, eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, addMonths, subMonths } from 'date-fns';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import { daysWeek, monthsYear } from '@/data';
import { DayItem } from './DayItem';
import { BoardCalendar } from './BoardCalendar';

export const Calendar = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [direction, setDirection] = useState(true);
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const newDays = eachDayOfInterval({ start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }), end: endOfMonth(currentMonth) });

  useEffect(() => {
    if (selectedMonth > 0) {
      setCurrentMonth(addMonths(today, selectedMonth));
    } else if (selectedMonth < 0) {
      setCurrentMonth(subMonths(today, Math.abs(selectedMonth)));
    } else {
      setCurrentMonth(today);
    }
  }, [selectedMonth]);

  const variants = {
    init: { x: direction ? -120 : 120, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: (d: boolean) => ({ x: d ? 120 : -120, opacity: 0 }),
  };

  return (
    <div className="h-[480px] px-2 py-8 flex select-none border rounded-md shadow-md transition-theme">
      <div className="min-w-3/5 flex flex-col">
        <div className="h-16">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setSelectedMonth(prev => prev - 1);
                  setDirection(true);
                }}
              >
                <ChevronLeft />
              </button>
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.p
                  key={selectedMonth}
                  initial="init"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="w-[200px] text-center"
                >
                  {monthsYear[parseInt(format(currentMonth, 'M')) - 1]} {format(currentMonth, 'yyyy')}
                </motion.p>
              </AnimatePresence>

              <button
                onClick={() => {
                  setSelectedMonth(prev => prev + 1);
                  setDirection(false);
                }}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-7 gap-x-3">
          {daysWeek.map((dayWeek, inx) => (
            <p key={dayWeek} className={clsx('text-center text-lg', { 'text-rose-500': inx >= 5 })}>
              {dayWeek}
            </p>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMonth}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 grid grid-cols-7 grid-rows-[repeat(6,42px)] gap-x-3 gap-y-1"
          >
            {newDays.map(day => (
              <DayItem
                key={day.getTime()}
                day={day}
                currentMonth={currentMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex-auto pl-2 border-l flex flex-col justify-start gap-3 transition-theme">
        <BoardCalendar currentMonth={currentMonth} />
      </div>
    </div>
  );
};
