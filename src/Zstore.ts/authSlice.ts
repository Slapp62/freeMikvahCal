import { StateCreator } from 'zustand'
import { Session } from '@supabase/supabase-js'

export interface AuthSlice {
  session: Session | null
  setSession: (session: Session | null) => void
  clearSession: () => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null }),
})
