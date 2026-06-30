interface GameCompleteMessageProps {
  onRestart: () => void
}

export function GameCompleteMessage({ onRestart }: GameCompleteMessageProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl mb-4">🏆</div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            恭喜通关！
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            你已完成所有关卡，真是太厉害了！
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={onRestart}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-xl font-bold transition-all text-base shadow-lg"
            >
              重新开始
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}