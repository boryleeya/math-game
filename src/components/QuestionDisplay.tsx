interface QuestionDisplayProps {
  num1: number
  num2: number
  correctAnswer: number
  isCorrect: boolean | null
  showFeedback: boolean
  operator?: string
}

export function QuestionDisplay({ num1, num2, correctAnswer, isCorrect, showFeedback, operator = '+' }: QuestionDisplayProps) {
  const getAnimationClass = () => {
    if (!showFeedback) return ''
    if (isCorrect) return 'animate-bounce'
    return 'animate-shake'
  }

  return (
    <div className={`
      bg-white/80 backdrop-blur-sm
      rounded-2xl sm:rounded-3xl
      p-4 sm:p-6 md:p-8 lg:p-12
      shadow-xl
      border-4 border-yellow-300
      ${getAnimationClass()}
      w-full
      max-w-[340px] sm:max-w-[400px] md:max-w-[500px]
      mx-auto mb-6
    `}>
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 flex-wrap">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500 min-w-[40px] sm:min-w-[50px] md:min-w-[60px] text-center">
            {num1}
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-400">
            {operator}
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 min-w-[40px] sm:min-w-[50px] md:min-w-[60px] text-center">
            {num2}
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400">
            =
          </span>
          <span className={`
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold
            min-w-[40px] sm:min-w-[50px] md:min-w-[60px] text-center
            ${showFeedback && isCorrect ? 'text-green-500' : ''}
            ${showFeedback && !isCorrect ? 'text-red-500' : ''}
            ${!showFeedback ? 'text-gray-400' : ''}
          `}>
            {showFeedback ? correctAnswer : '?'}
          </span>
        </div>
      </div>
    </div>
  )
}