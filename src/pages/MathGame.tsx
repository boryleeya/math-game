import { useNavigate, useSearchParams } from 'react-router-dom'
import { QuestionDisplay } from '../components/QuestionDisplay'
import { NumberButton } from '../components/NumberButton'
import { FeedbackMessage } from '../components/FeedbackMessage'
import { useMathGame } from '../hooks/useMathGame'
import { generateNumberArray, generateAnswerOptions } from '../utils/mathUtils'

export default function MathGame() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const difficulty = parseInt(searchParams.get('difficulty') || '10')

  const {
    num1,
    num2,
    correctAnswer,
    selectedAnswer,
    isCorrect,
    showFeedback,
    handleAnswerSelect,
    handleNextQuestion,
  } = useMathGame(difficulty)

  const isSmallRange = difficulty <= 20
  const numbers = isSmallRange 
    ? generateNumberArray(difficulty)
    : generateAnswerOptions(correctAnswer, difficulty, difficulty <= 50 ? 10 : 12)

  const handleBack = () => {
    navigate('/')
  }

  const getColumns = () => {
    if (difficulty <= 20) return 'grid-cols-4 sm:grid-cols-5'
    if (difficulty <= 50) return 'grid-cols-5'
    return 'grid-cols-6'
  }

  return (
    <div className="min-h-screen py-4 px-3 sm:px-4">
      <div className="max-w-md mx-auto w-full">
        <button
          onClick={handleBack}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span className="text-xl sm:text-2xl">←</span>
          <span className="text-base sm:text-lg font-bold">返回选择</span>
        </button>

        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
            {difficulty}以内加法
          </h2>
        </div>

        <div className="flex justify-center mb-6">
          <QuestionDisplay
            num1={num1}
            num2={num2}
            isCorrect={isCorrect}
            showFeedback={showFeedback}
          />
        </div>

        {showFeedback && isCorrect !== null && (
          <div className="flex justify-center mb-6">
            <FeedbackMessage
              isCorrect={isCorrect}
              correctAnswer={correctAnswer}
              onNext={handleNextQuestion}
            />
          </div>
        )}

        <div className={`grid ${getColumns()} gap-2 sm:gap-3 justify-items-center w-full`}>
          {numbers.map((num, index) => (
            <div
              key={num}
              className="pop-in w-full"
              style={{ animationDelay: `${index * 0.02}s` }}
            >
              <NumberButton
                number={num}
                onClick={handleAnswerSelect}
                isSelected={selectedAnswer === num}
                isCorrect={isCorrect}
                showFeedback={showFeedback}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}