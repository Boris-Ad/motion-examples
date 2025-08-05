'use client';

import { useState } from 'react';
import Form from 'next/form';
import Image from 'next/image';
import * as z from 'zod/v4';
import clsx from 'clsx';
import { Person } from '@/services/zod.schemas';
import { useCalendarDates } from '@/hooks/useCalendarDates';

type FieldErrors = {
  avatar?: string[] | undefined;
  name?: string[] | undefined;
  date?: string[] | undefined;
};

export const BirthdayForm = ({ date, closeDialog }: { date: Date; closeDialog: () => void }) => {
  const [ava, setAva] = useState('/icons/boy.png');
  const [errors, setErrors] = useState<FieldErrors>({});
  const { setBirthday } = useCalendarDates(state => state);

  const addBirthday = (formData: FormData) => {
    const nameField = formData.get('name');
    const validateField = Person.safeParse({ name: nameField, avatar: ava, date });

    if (validateField.success === false) {
      const flattened = z.flattenError(validateField.error).fieldErrors;
      return setErrors(flattened);
    }

    const data = validateField.data;
    setBirthday({ id: crypto.randomUUID(), name: data.name, ava: data.avatar, date: data.date });
    closeDialog();
  };

  return (
    <Form action={addBirthday}>
      <div className="flex flex-col space-y-1">
        <p className="text-xl">Аватарка</p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setAva('/icons/boy.png')}
            className={clsx(
              'size-12 rounded-full ring-2 overflow-clip transition-shadow',
              ava === '/icons/boy.png' ? 'ring-amber-500' : 'ring-slate-300'
            )}
          >
            <Image src="/icons/boy.png" alt="boy" width={48} height={48} className="object-cover" />
          </button>
          <button
            type="button"
            onClick={() => setAva('/icons/girl.png')}
            className={clsx(
              'size-12 rounded-full ring-2 overflow-clip transition-shadow',
              ava === '/icons/girl.png' ? 'ring-amber-500' : 'ring-slate-300'
            )}
          >
            <Image src="/icons/girl.png" alt="girl" width={48} height={48} className="object-cover" />
          </button>
          <button
            type="button"
            onClick={() => setAva('/icons/man.png')}
            className={clsx(
              'size-12 rounded-full ring-2 overflow-clip transition-shadow',
              ava === '/icons/man.png' ? 'ring-amber-500' : 'ring-slate-300'
            )}
          >
            <Image src="/icons/man.png" alt="man" width={48} height={48} className="object-cover" />
          </button>
        </div>
      </div>
      <div className="mb-6 relative flex flex-col gap-2">
        <label htmlFor="name" className="text-xl block">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={clsx('w-full p-2 border rounded-md focus:outline-0', errors.name ? 'border-red-500' : 'border-slate-300')}
        />
        {errors.name && <p className="text-sm text-red-500 absolute start-1 bottom-0 translate-y-full">{errors.name}</p>}
      </div>
      <button className="w-[8em] p-1.5 border border-slate-300 rounded-md hover:ring hover:ring-slate-400 active:ring-2 transition-shadow">
        Сохранить
      </button>
    </Form>
  );
};
