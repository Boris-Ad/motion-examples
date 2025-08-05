import * as z from 'zod/v4';

export const Person = z.object({
  avatar: z.string().trim().min(1),
  name: z.string().trim().min(1, { error: 'Обязательно заполнить!' }),
  date: z.date(),
});

export const CalendarEvent = z.object({
  title: z.string().trim().min(1, { error: 'Обязательно заполнить!' }),
  text: z.string().trim().min(1, { error: 'Обязательно заполнить!' }),
  date: z.date(),
});
