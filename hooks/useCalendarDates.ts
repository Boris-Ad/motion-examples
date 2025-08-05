import { create } from 'zustand';

type Birthday = { id: string; date: Date; name: string; ava: string };
type EventDate = { id: string; date: Date; title: string; text: string };

type State = {
  birthdays: Birthday[];
  eventDates: EventDate[];
};

type Actions = {
  setBirthday: (value: Birthday) => void;
  setEventDate: (value: EventDate) => void;
  deleteBirthday: (id: string) => void;
  deleteEventDate: (id: string) => void;
};

export const useCalendarDates = create<State & Actions>(set => ({
  birthdays: [],
  eventDates: [],
  setBirthday: value =>
    set(state => {
      const birthdays = [...state.birthdays, value].sort((a, b) => a.date.getDate() - b.date.getDate());
      return { birthdays };
    }),
  setEventDate: value =>
    set(state => {
      const eventDates = [...state.eventDates, value].sort((a, b) => a.date.getDate() - b.date.getDate());
      return { eventDates };
    }),
  deleteBirthday: id =>
    set(state => {
      const newBirthdays = state.birthdays.filter(d => d.id !== id);
      return { birthdays: newBirthdays };
    }),
  deleteEventDate: id =>
    set(state => {
      const newEventDates = state.eventDates.filter(d => d.id !== id);
      return { eventDates: newEventDates };
    }),
}));
