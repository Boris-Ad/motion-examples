'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { format, getMonth } from 'date-fns';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import { useCalendarDates } from '@/hooks/useCalendarDates';

export const BoardCalendar = ({ currentMonth }: { currentMonth: Date }) => {
  const [title, setTitle] = useState(true);
  const { birthdays, eventDates, deleteBirthday, deleteEventDate } = useCalendarDates(state => state);
  const existBirthdayInMonth = !!birthdays.find(day => getMonth(day.date) === getMonth(currentMonth));
  const existCalendarEventsInMonth = !!eventDates.find(day => getMonth(day.date) === getMonth(currentMonth));

  return (
    <>
      <div className="h-10 flex justify-center items-center gap-8 text-lg">
        <button onClick={() => setTitle(true)} className={clsx('text-center transition-colors duration-300', { 'text-amber-500': title })}>
          Дни рождения
        </button>
        <button
          onClick={() => setTitle(false)}
          className={clsx('text-center transition-colors duration-300', { 'text-amber-500': !title })}
        >
          События
        </button>
      </div>
      <div className={clsx('w-full px-1 flex-1 flex overflow-clip', title ? 'justify-start' : 'justify-end')}>
        <motion.div layout transition={{ type: 'spring', visualDuration: 0.6, bounce: 0.1 }} className="w-[200%] flex flex-none">
          <div className="h-[362px] flex-1 border-r border-amber-500 overflow-y-auto scrollbar-none">
            <div className="w-full pr-3 flex flex-col gap-y-3 ">
              {existBirthdayInMonth ? (
                <>
                  {birthdays.map(item => (
                    <div
                      key={item.id}
                      className={clsx('pb-2 flex items-center border-b', { hidden: getMonth(item.date) !== getMonth(currentMonth) })}
                    >
                      <div className="flex flex-1 space-x-4">
                        <Image src={item.ava} alt={item.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex flex-col justify-center">
                          <p className="text-xs">{format(item.date, 'dd/MM')}</p>
                          <p className="text-xl line-clamp-1">{item.name}</p>
                        </div>
                      </div>
                      <button onClick={() => deleteBirthday(item.id)}>
                        <Trash2 className="hover:text-red-400 transition-colors" />
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <h3 className="text-center">Нет сохранений!</h3>
              )}
            </div>
          </div>

          <div className="h-[362px] flex-1 overflow-y-auto scrollbar-none">
            <div className="pl-3 w-full flex flex-col gap-y-3">
              {existCalendarEventsInMonth ? (
                <>
                  {eventDates.map(item => (
                    <div
                      key={item.id}
                      className={clsx('pb-2 flex flex-col border-b', { hidden: getMonth(item.date) !== getMonth(currentMonth) })}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{format(item.date, 'dd/MM')}</p>
                        <button onClick={() => deleteEventDate(item.id)}>
                          <Trash2 className="text-slate-600 hover:text-red-400/70 transition-colors" />
                        </button>
                      </div>
                      <h3 className="text-lg">{item.title}</h3>
                      <p className="text-slate-400 line-clamp-4">{item.text}</p>
                    </div>
                  ))}
                </>
              ) : (
                <h3 className="text-center">Нет сохранений!</h3>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
