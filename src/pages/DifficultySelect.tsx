import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DifficultyButton } from '../components/DifficultyButton'
import { difficultyOptions } from '../utils/mathUtils'

export default function DifficultySelect() {
  const navigate = useNavigate()
  const [operationType, setOperationType] = useState<'addition' | 'subtraction' | null>(null)

  const handleDifficultySelect = (value: number) => {
    if (operationType === 'subtraction') {
      navigate(`/subtraction?difficulty=${value}`)
    } else {
      navigate(`/game?difficulty=${value}`)
    }
  }

  const handleBackToOperationSelect = () => {
    setOperationType(null)
  }

  if (!operationType) {
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
              选择运算类型开始练习！
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setOperationType('addition')}
              className="w-full p-6 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white rounded-2xl shadow-lg transition-all hover:scale-105 pop-in"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="text-2xl sm:text-3xl font-bold mb-2">加法</div>
              <div className="text-sm sm:text-base opacity-90">1 + 1 = ?</div>
            </button>

            <button
              onClick={() => setOperationType('subtraction')}
              className="w-full p-6 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white rounded-2xl shadow-lg transition-all hover:scale-105 pop-in"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="text-2xl sm:text-3xl font-bold mb-2">减法</div>
              <div className="text-sm sm:text-base opacity-90">5 - 2 = ?</div>
            </button>
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

  return (
    <div className="min-h-screen py-6 px-3 sm:px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <button
          onClick={handleBackToOperationSelect}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span className="text-xl sm:text-2xl">←</span>
          <span className="text-base sm:text-lg font-bold">返回选择</span>
        </button>

        <div className="text-center mb-8 sm:mb-12">
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              {operationType === 'addition' ? '加法练习' : '减法练习'}
            </h1>
            <span className="absolute -top-3 -right-3 text-2xl sm:text-3xl animate-float">⭐</span>
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