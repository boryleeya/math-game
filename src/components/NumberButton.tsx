interface NumberButtonProps {
  number: number
  onClick: (num: number) => void
  isSelected: boolean
  isCorrect: boolean | null
  showFeedback: boolean
}

export function NumberButton({ number, onClick, isSelected, isCorrect, showFeedback }: NumberButtonProps) {
  const getButtonClass = () => {
    if (!showFeedback) {
      return 'bg-white hover:bg-yellow-100 border-4 border-yellow-300'
    }
    
    if (isSelected && isCorrect) {
      return 'bg-green-400 border-4 border-green-600'
    }
    
    if (isSelected && !isCorrect) {
      return 'bg-red-400 border-4 border-red-600 animate-shake'
    }
    
    return 'bg-white/50 border-4 border-gray-200 opacity-50'
  }

  return (
    <button
      onClick={() => onClick(number)}
      disabled={showFeedback}
      className={`
        ${getButtonClass()}
        text-gray-800 font-bold
        text-base sm:text-lg md:text-xl lg:text-2xl
        w-full
        min-h-[56px] sm:min-h-[64px] md:min-h-[72px]
        rounded-xl
        shadow-md
        transform transition-all duration-150
        hover:scale-105
        active:scale-95
        disabled:cursor-not-allowed
        flex items-center justify-center
        sm:w-16 sm:h-16 md:w-20 md:h-20
      `}
    >
      {number}
    </button>
  )
}