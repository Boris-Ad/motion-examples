'use client';

import { useState } from 'react';
import Form from 'next/form';
import clsx from 'clsx';
import * as z from 'zod/v4';
import { useCalendarDates } from '@/hooks/useCalendarDates';
import { CalendarEvent } from '@/services/zod.schemas';

type FieldErrors = {
  title?: string[] | undefined;
  text?: string[] | undefined;
};

export const EventForm = ({ date, closeDialog }: { date: Date; closeDialog: () => void }) => {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formFields, setFormFields] = useState<{ title?: string; text?: string }>();
  const { setEventDate } = useCalendarDates(state => state);

  const addEvent = (formData: FormData) => {
    const title = formData.get('title')?.toString();
    const text = formData.get('text')?.toString();
    const validateField = CalendarEvent.safeParse({ title, text, date });
    const { success, data } = validateField;
    if (!success) {
      const flattened = z.flattenError(validateField.error).fieldErrors;
      setFormFields({ title, text });
      return setErrors(flattened);
    }
    setEventDate({ id: crypto.randomUUID(), title: data.title, text: data.text, date: data.date });
    closeDialog();
  };

  return (
    <Form action={addEvent}>
      <div className="mb-4 relative flex flex-col gap-2">
        <label htmlFor="title" className="text-xl block">
          Название события
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={formFields?.title}
          className={clsx('w-full p-2 border rounded-md focus:outline-0', errors.title ? 'border-red-500' : 'border-slate-300')}
        />
        {errors.title && <p className="text-sm text-red-500 absolute start-1 bottom-0 translate-y-full">{errors.title}</p>}
      </div>
      <div className="mb-6 relative flex flex-col gap-2">
        <label htmlFor="text" className="text-xl block">
          Событие
        </label>
        <input
          type="text"
          id="text"
          name="text"
          defaultValue={formFields?.text}
          className={clsx('w-full p-2 border rounded-md focus:outline-0', errors.text ? 'border-red-500' : 'border-slate-300')}
        />
        {errors.text && <p className="text-sm text-red-500 absolute start-1 bottom-0 translate-y-full">{errors.text}</p>}
      </div>
      <button className="w-[8em] p-1.5 border border-slate-300 rounded-md hover:ring hover:ring-slate-400 active:ring-2 transition-shadow">
        Сохранить
      </button>
    </Form>
  );
};
