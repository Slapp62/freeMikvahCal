import { create } from 'zustand'
import { AuthSlice, createAuthSlice } from './authSlice';
import { createEventSlice, EventSlice } from './eventSlice';
import { CalendarSlice, createCalendarSlice } from './calendarSlice';

type StoreState = AuthSlice & EventSlice & CalendarSlice;

export const useZStore = create<StoreState>()((...args) => ({
  ...createAuthSlice(...args),
  ...createEventSlice(...args),
  ...createCalendarSlice(...args),
}));

export default useZStore