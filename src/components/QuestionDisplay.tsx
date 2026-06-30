interface QuestionDisplayProps {
  num1: number
  num2: number
  isCorrect: boolean | null
  showFeedback: boolean
  operator?: string
}

export function QuestionDisplay({ num1, num2, isCorrect, showFeedback, operator = '+' }: QuestionDisplayProps) {
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
    `}>
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-blue-500">
            {num1}
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-red-400">
            {operator}
          </span>
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-green-500">
            {num2}
          </span>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-400">
            =
          </span>
          <span className={`
            text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold
            ${showFeedback && isCorrect ? 'text-green-500' : ''}
            ${showFeedback && !isCorrect ? 'text-red-500' : ''}
          `}>
            ?
          </span>
        </div>
      </div>
    </div>
  )
}