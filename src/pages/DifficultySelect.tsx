import { useNavigate } from 'react-router-dom'
import { DifficultyButton } from '../components/DifficultyButton'
import { difficultyOptions } from '../utils/mathUtils'

export default function DifficultySelect() {
  const navigate = useNavigate()

  const handleDifficultySelect = (value: number) => {
    navigate(`/game?difficulty=${value}`)
  }

  return (
    <div className="min-h-screen py-6 px-3 sm:px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
              数学小天才
            </h1>
            <span className="absolute -top-3 -right-3 text-3xl sm:text-4xl animate-float">⭐</span>
            <span className="absolute -bottom-1 -left-3 text-2xl sm:text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🌟</span>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
            选择一个难度开始练习吧！
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {difficultyOptions.map((option, index) => (
            <div 
              key={option.value} 
              className="pop-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <DifficultyButton option={option} onClick={handleDifficultySelect} />
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl">
            <span className="animate-float">🌈</span>
            <span className="animate-float" style={{ animationDelay: '0.3s' }}>🎨</span>
            <span className="animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
            <span className="animate-float" style={{ animationDelay: '0.9s' }}>🎈</span>
          </div>
        </div>
      </div>
    </div>
  )
}