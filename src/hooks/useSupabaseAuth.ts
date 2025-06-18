import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuthStore } from '../Zstore.ts/authStore'

export function useSupabaseAuth() {
  const setSession = useAuthStore((state) => state.setSession)

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    // Subscribe to auth changes (optional)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [setSession])
}
