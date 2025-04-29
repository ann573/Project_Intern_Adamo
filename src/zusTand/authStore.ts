import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  email: string
  name: string
}
type TAuthStore = {
  user: User | null
  setUser: (user: User | null) => void
}
export const useAuthStore = create<TAuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user })
    }),
    {
      name: 'user'
    }
  )
)
