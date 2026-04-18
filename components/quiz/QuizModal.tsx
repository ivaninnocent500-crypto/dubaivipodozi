//components/quiz/QuizModal.tsx
'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuizStore } from '@/store/quizStore'
import { useUIStore } from '@/store/uiStore'
import Button from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics/track'

const steps = [
  {
    title: 'What occasion?',
    options: ['Everyday', 'Special Event', 'Evening Out', 'Office'],
    key: 'occasion',
  },
  {
    title: 'Your mood?',
    options: ['Confident', 'Relaxed', 'Adventurous', 'Romantic'],
    key: 'mood',
  },
  {
    title: 'Preferred intensity?',
    options: ['Subtle', 'Moderate', 'Intense', 'Bold'],
    key: 'intensity',
  },
  {
    title: 'Favorite notes?',
    options: ['Floral', 'Woody', 'Fresh', 'Oriental'],
    key: 'notes',
    multiSelect: true,
  },
]

const QuizModal = () => {
  const { isOpen, setOpen, currentStep, answers, setAnswer, nextStep, previousStep, resetQuiz } = useQuizStore()
  
  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  
  const handleSelect = (value: string) => {
    const key = currentStepData.key as keyof typeof answers
    
    if (currentStepData.multiSelect) {
      const current = (answers[key] as string[]) || []
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      setAnswer(key, updated)
    } else {
      setAnswer(key, value)
      if (!isLastStep) {
        setTimeout(() => nextStep(), 300)
      }
    }
  }
  
  const handleComplete = () => {
    trackEvent('quiz_completed', { answers })
    setOpen(false)
    resetQuiz()
    alert('View your matches - would show personalized products')
  }
  
  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-background rounded-lg shadow-xl z-50 p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-heading">Find Your Scent</Dialog.Title>
            <Dialog.Close className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Dialog.Close>
          </div>
          
          <div className="mb-4">
            <div className="flex gap-1 mb-4">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    idx <= currentStep ? 'bg-accent' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <h3 className="text-xl mb-6">{currentStepData.title}</h3>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {currentStepData.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left p-4 border rounded-lg transition-all hover:border-accent hover:shadow-md ${
                    (currentStepData.multiSelect
                      ? (answers[currentStepData.key as keyof typeof answers] as string[])?.includes(option)
                      : answers[currentStepData.key as keyof typeof answers] === option)
                      ? 'border-accent bg-accent/5'
                      : 'border-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button variant="outline" onClick={previousStep}>
                Back
              </Button>
            )}
            {isLastStep && (
              <Button onClick={handleComplete} className="ml-auto">
                View Your Matches
              </Button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default QuizModal
