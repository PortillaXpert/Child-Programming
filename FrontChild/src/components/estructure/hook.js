import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useDisclosure = create(
  persist(
    (set) => ({
      isOpen: true,
      toggle: () => set((state) => ({ isOpen: !state.isOpen }))
    }),
    { name: 'aside' }
  )
)
