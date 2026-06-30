interface LevelCompleteMessageProps {
  currentDifficulty: number
  onNextLevel: () => void
  onStayCurrentLevel: () => void
}

export function LevelCompleteMessage({
  currentDifficulty,
  onNextLevel,
  onStayCurrentLevel,
}: LevelCompleteMessageProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl transform animate-bounce-in">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl mb-4">🎉</div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            太棒了！
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            你已连续答对 10 题，完成 {currentDifficulty} 以内关卡！
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStayCurrentLevel}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold transition-colors text-base"
            >
              继续练习
            </button>
            <button
              onClick={onNextLevel}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-bold transition-all text-base shadow-lg"
            >
              进入下一关
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}