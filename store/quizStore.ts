// src/store/quizStore.ts
import { create } from 'zustand'
import { QuizResult } from '@/types'

interface QuizStore {
  isOpen: boolean
  currentStep: number
  answers: QuizResult
  setOpen: (open: boolean) => void
  nextStep: () => void
  previousStep: () => void
  setAnswer: (key: keyof QuizResult, value: any) => void
  resetQuiz: () => void
}

export const useQuizStore = create<QuizStore>((set) => ({
  isOpen: false,
  currentStep: 0,
  answers: {},
  
  setOpen: (open) => set({ isOpen: open, currentStep: 0, answers: {} }),
  
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  
  previousStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  
  setAnswer: (key, value) => 
    set((state) => ({ answers: { ...state.answers, [key]: value } })),
    
  resetQuiz: () => set({ currentStep: 0, answers: {} }),
}))
