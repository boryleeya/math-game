import { useState, useEffect } from 'react'

interface FeedbackMessageProps {
  isCorrect: boolean
  correctAnswer: number
  onNext: () => void
}

const correctMessages = [
  { emoji: '🎉', text: '太棒了！你答对了！' },
  { emoji: '🌟', text: '真聪明！回答正确！' },
  { emoji: '✨', text: '完美！你是数学小天才！' },
  { emoji: '👍', text: '做得好！继续加油！' },
]

const incorrectMessages = [
  { emoji: '😢', text: '没关系，再试一次！' },
  { emoji: '💪', text: '别灰心，正确答案是...' },
  { emoji: '🎯', text: '差一点点！正确答案是...' },
]

function getRandomMessage(isCorrect: boolean) {
  const messages = isCorrect ? correctMessages : incorrectMessages
  return messages[Math.floor(Math.random() * messages.length)]
}

export function FeedbackMessage({ isCorrect, correctAnswer, onNext }: FeedbackMessageProps) {
  const [message, setMessage] = useState<{ emoji: string; text: string }>(() => getRandomMessage(isCorrect))

  useEffect(() => {
    setMessage(getRandomMessage(isCorrect))
  }, [isCorrect])

  return (
    <div className={`
      rounded-2xl
      p-4 sm:p-6 md:p-8
      shadow-lg
      pop-in
      ${isCorrect ? 'bg-green-100 border-4 border-green-400' : 'bg-red-100 border-4 border-red-400'}
      w-full
      max-w-[340px] sm:max-w-[400px] md:max-w-[500px]
    `}>
      <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
        <span className="text-3xl sm:text-4xl md:text-5xl">{message.emoji}</span>
        <p className={`
          text-sm sm:text-base md:text-lg font-bold text-center leading-tight
          ${isCorrect ? 'text-green-700' : 'text-red-700'}
        `}>
          {message.text}
        </p>
        
        {!isCorrect && (
          <div className="bg-white rounded-xl px-4 py-2 shadow-md">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
              {correctAnswer}
            </span>
          </div>
        )}
        
        <button
          onClick={onNext}
          className={`
            ${isCorrect ? 'bg-green-400 hover:bg-green-500' : 'bg-blue-400 hover:bg-blue-500'}
            text-white font-bold text-sm sm:text-base md:text-lg
            px-4 sm:px-6 py-2 sm:py-3
            rounded-full
            shadow-lg
            transform transition-all duration-200
            hover:scale-105
            active:scale-95
            flex items-center gap-2
            min-h-[44px] sm:min-h-[48px]
            justify-center
            w-full
          `}
        >
          <span>下一题</span>
          <span className="text-lg sm:text-xl">👉</span>
        </button>
      </div>
    </div>
  )
}