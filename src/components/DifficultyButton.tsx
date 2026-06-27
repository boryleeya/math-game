import { DifficultyOption } from '../utils/mathUtils'

interface DifficultyButtonProps {
  option: DifficultyOption
  onClick: (value: number) => void
}

export function DifficultyButton({ option, onClick }: DifficultyButtonProps) {
  return (
    <button
      onClick={() => onClick(option.value)}
      className={`
        ${option.color}
        text-white font-bold text-lg sm:text-xl md:text-2xl
        px-4 py-5 sm:px-6 sm:py-5 md:px-8 md:py-6
        rounded-2xl
        shadow-lg
        transform transition-all duration-200
        hover:scale-105 hover:shadow-xl
        active:scale-95
        pop-in
        border-4 border-white/30
        min-h-[88px] sm:min-h-[100px]
        flex flex-col items-center justify-center
        w-full
      `}
    >
      <span className="text-center">{option.label}</span>
      <span className="text-xs sm:text-sm opacity-80 text-center">加法练习</span>
    </button>
  )
}