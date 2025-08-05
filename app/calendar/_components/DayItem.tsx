'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { format, isSameMonth, isEqual, isToday } from 'date-fns';
import clsx from 'clsx';
import { Cake, X, CalendarCheck } from 'lucide-react';
import { Dialog } from '@/components/Dialog';
import { BirthdayForm } from './BirthdayForm';
import { EventForm } from './EventForm';
import { monthsYear } from '@/data';
import { useCalendarDates } from '@/hooks/useCalendarDates';

export const DayItem = ({
  day,
  currentMonth,
  selectedDay,
  setSelectedDay,
}: {
  day: Date;
  currentMonth: Date;
  selectedDay?: Date;
  setSelectedDay: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState<'birthday' | 'date' | undefined>();
  const { birthdays, eventDates } = useCalendarDates(state => state);

  const existBirthday = birthdays.find(b => isEqual(b.date, day));
  const existEventDays = eventDates.find(b => isEqual(b.date, day));

  const parentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2 } },
  };

  const buttonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: 20, opacity: 0, transition: { delay: 0.2 } },
  };

  return (
    <>
      <div
        onClick={() => setSelectedDay(prev => (prev?.getTime() === day.getTime() ? undefined : day))}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className={clsx(
          'flex justify-center items-center rounded-md hover:ring hover:ring-amber-600 relative ',
          { 'opacity-0 cursor-auto': !isSameMonth(day, currentMonth) },
          { 'bg-amber-500': selectedDay ? isEqual(selectedDay, day) : false },
          { 'ring ring-slate-300': isToday(day) }
        )}
      >
        {!!existBirthday && (
          <div className="absolute top-1 start-3">
            <Cake size={18} className="text-amber-500" />
          </div>
        )}

        {!!existEventDays && (
          <div className="absolute top-1 end-3">
            <CalendarCheck size={18} className="text-amber-500" />
          </div>
        )}

        <AnimatePresence>
          {selectedDay && isEqual(selectedDay, day) && active && (
            <motion.div
              variants={parentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={clsx(
                'w-64 p-2 absolute -top-1 -translate-y-full bg-background overflow-clip space-y-1 z-30 border rounded-md',
                { '-end-2': day.getDay() % 7 === 0 },
                { '-start-4': day.getDay() % 7 === 1 }
              )}
            >
              <p className="text-center text-amber-400">Добавить</p>
              <div className="h-8 flex gap-1">
                <motion.button
                  onClick={e => {
                    e.stopPropagation();
                    setOpen('birthday');
                  }}
                  variants={buttonVariants}
                  className="flex-1 dark:bg-slate-700 bg-slate-300 rounded-md text-sm hover:bg-slate-700/50 transition-colors"
                >
                  День рождения
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  onClick={e => {
                    e.stopPropagation();
                    setOpen('date');
                  }}
                  className="flex-1 dark:bg-slate-700 bg-slate-300 rounded-md text-sm hover:bg-slate-700/50 transition-colors"
                >
                  Событие
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <time dateTime={format(day, 'dd/MM/yyyy')}>{format(day, 'd')}</time>
      </div>
      <Dialog open={open} close={() => setOpen(undefined)}>
        <div className="p-4 bg-slate-100 rounded-md shadow-lg">
          <button
            onClick={() => setOpen(undefined)}
            className="w-9 h-9 absolute top-4 end-4 flex justify-center items-center rounded-md hover:border
                  hover:border-slate-300 hover:bg-slate-200 transition-color"
          >
            <X size={26} className="text-slate-700" />
          </button>
          <div className="w-1/2 p-2 absolute top-0 start-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md bg-inherit shadow-md">
            <h3 className="text-center text-lg font-medium text-slate-700">Добавить {open === 'birthday' ? 'День рождения' : 'Событие'}</h3>
          </div>
          <div className="pt-6 pb-2 text-slate-700 flex flex-col space-y-3">
            <h4 className="">
              Месяц: <span className="text-xl text-slate-800">{monthsYear[parseInt(format(currentMonth, 'M')) - 1]}</span> Число:{' '}
              <span className="text-xl text-slate-800">{format(day, 'dd')}</span>
            </h4>
            {selectedDay &&
              (open === 'birthday' ? (
                <BirthdayForm date={selectedDay} closeDialog={() => setOpen(undefined)} />
              ) : (
                <EventForm date={selectedDay} closeDialog={() => setOpen(undefined)} />
              ))}
          </div>
        </div>
      </Dialog>
    </>
  );
};
