import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import createSelectors from './createSelectors'

export type Technology = {
  name: string
  description: string
  familiarity: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

interface GlobalState {
  isLoading: boolean
  error: string | null
  technologiesList: Technology[]

  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
  setTechnologiesList: (technologies: Technology[]) => void
}

export const useStore = create<GlobalState>()(
  devtools(
    (set) => ({
      // Initial state
      isLoading: false,
      error: null,
      technologiesList: [],

      // Actions
      setTechnologiesList: (technologies: Technology[]) => set({ technologiesList: technologies }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      reset: () => set({
        isLoading: false,
        error: null
      }),
    }),
  )
)

export const useGloblaStore = createSelectors(useStore)
