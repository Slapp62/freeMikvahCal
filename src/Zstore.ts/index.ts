import { create } from 'zustand'
import { AuthSlice, createAuthSlice } from './authSlice';
import { createEventSlice, EventSlice } from './eventSlice';

type StoreState = AuthSlice & EventSlice;

export const useZStore = create<StoreState>()((...args) => ({
  ...createAuthSlice(...args),
  ...createEventSlice(...args),
}));

export default useZStore