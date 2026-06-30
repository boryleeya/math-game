import { useMemo } from 'react'

interface AnswerExplanationProps {
  num1: number
  num2: number
  correctAnswer: number
  onClose: () => void
  operator?: string
}

export function AnswerExplanation({
  num1,
  num2,
  correctAnswer,
  onClose,
  operator = '+',
}: AnswerExplanationProps) {
  const getColumns = (count: number) => {
    if (count <= 10) return 5
    if (count <= 20) return 7
    if (count <= 40) return 10
    return 10
  }

  const getItemSize = (count: number) => {
    if (count <= 10) return 'w-8 h-8 sm:w-10 sm:h-10'
    if (count <= 20) return 'w-6 h-6 sm:w-8 sm:h-8'
    if (count <= 40) return 'w-5 h-5 sm:w-6 sm:h-6'
    return 'w-4 h-4 sm:w-5 sm:h-5'
  }

  const isSubtraction = operator === '-'
  const items1 = useMemo(() => Array(num1).fill(0), [num1])
  const items2 = useMemo(() => Array(num2).fill(0), [num2])

  const cols1 = getColumns(num1)
  const cols2 = getColumns(num2)
  const colsTotal = getColumns(correctAnswer)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-bounce-in">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            答案解析
          </h3>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 mb-6">
          <div className="text-center text-2xl sm:text-3xl font-bold text-gray-700 mb-6">
            {num1} {operator} {num2} = {correctAnswer}
          </div>

          {isSubtraction ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 mb-3">
                  被减数：{num1} 个
                </div>
                <div
                  className="grid gap-1 justify-items-center mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${cols1}, 1fr)`,
                    maxWidth: 'fit-content',
                  }}
                >
                  {items1.map((_, index) => (
                    <div
                      key={`num1-${index}`}
                      className={`${getItemSize(num1)} rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-md animate-pop`}
                      style={{ animationDelay: `${index * 0.03}s` }}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg font-bold text-green-600 mb-3">
                  减去：{num2} 个
                </div>
                <div
                  className="grid gap-1 justify-items-center mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${cols2}, 1fr)`,
                    maxWidth: 'fit-content',
                  }}
                >
                  {items2.map((_, index) => (
                    <div
                      key={`num2-${index}`}
                      className={`${getItemSize(num2)} rounded-lg bg-gradient-to-br from-green-400 to-green-600 shadow-md animate-pop`}
                      style={{ animationDelay: `${(num1 + index) * 0.03}s` }}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-300 pt-4">
                <div className="text-center text-lg font-bold text-purple-600 mb-3">
                  剩下：{correctAnswer} 个
                </div>
                <div
                  className="grid gap-1 justify-items-center mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${colsTotal}, 1fr)`,
                    maxWidth: 'fit-content',
                  }}
                >
                  {[...Array(correctAnswer)].map((_, index) => (
                    <div
                      key={`total-${index}`}
                      className={`${getItemSize(correctAnswer)} rounded bg-gradient-to-br from-purple-400 to-purple-600 shadow-sm animate-pop`}
                      style={{ animationDelay: `${index * 0.02}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
                <div className="flex-1">
                  <div className="text-center text-lg font-bold text-blue-600 mb-3">
                    {num1}
                  </div>
                  <div
                    className="grid gap-1 justify-items-center"
                    style={{
                      gridTemplateColumns: `repeat(${cols1}, 1fr)`,
                    }}
                  >
                    {items1.map((_, index) => (
                      <div
                        key={`num1-${index}`}
                        className={`${getItemSize(num1)} rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-md animate-pop`}
                        style={{ animationDelay: `${index * 0.03}s` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-gray-600 min-w-[30px] text-center">
                  +
                </div>

                <div className="flex-1">
                  <div className="text-center text-lg font-bold text-green-600 mb-3">
                    {num2}
                  </div>
                  <div
                    className="grid gap-1 justify-items-center"
                    style={{
                      gridTemplateColumns: `repeat(${cols2}, 1fr)`,
                    }}
                  >
                    {items2.map((_, index) => (
                      <div
                        key={`num2-${index}`}
                        className={`${getItemSize(num2)} rounded-lg bg-gradient-to-br from-green-400 to-green-600 shadow-md animate-pop`}
                        style={{ animationDelay: `${(num1 + index) * 0.03}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-300 pt-4">
                <div className="text-center text-lg font-bold text-gray-700 mb-2">
                  合并后：{correctAnswer} 个方块
                </div>
                <div
                  className="grid gap-1 justify-items-center"
                  style={{
                    gridTemplateColumns: `repeat(${colsTotal}, 1fr)`,
                    maxWidth: '100%',
                  }}
                >
                  {[...Array(correctAnswer)].map((_, index) => (
                    <div
                      key={`total-${index}`}
                      className={`${getItemSize(correctAnswer)} rounded bg-gradient-to-br from-purple-400 to-purple-600 shadow-sm animate-pop`}
                      style={{ animationDelay: `${index * 0.02}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-bold transition-all text-base shadow-lg"
        >
          关闭
        </button>
      </div>
    </div>
  )
}