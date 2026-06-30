import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { QuestionDisplay } from '../components/QuestionDisplay'
import { NumberButton } from '../components/NumberButton'
import { FeedbackMessage } from '../components/FeedbackMessage'
import { LevelCompleteMessage } from '../components/LevelCompleteMessage'
import { GameCompleteMessage } from '../components/GameCompleteMessage'
import { AnswerExplanation } from '../components/AnswerExplanation'
import { useMathGame } from '../hooks/useMathGame'
import { difficultyOptions } from '../utils/mathUtils'

export default function MathGame() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const difficulty = parseInt(searchParams.get('difficulty') || '10')
  const [showExplanation, setShowExplanation] = useState(false)

  const {
    num1,
    num2,
    correctAnswer,
    selectedAnswer,
    isCorrect,
    showFeedback,
    options,
    correctCount,
    showLevelComplete,
    showGameComplete,
    handleAnswerSelect,
    handleNextQuestion,
    handleNextLevel,
    handleRestart,
  } = useMathGame(difficulty)

  const handleBack = () => {
    navigate('/')
  }

  const handleGoToNextLevel = () => {
    const currentIndex = difficultyOptions.findIndex(d => d.value === difficulty)
    if (currentIndex < difficultyOptions.length - 1) {
      const nextDifficulty = difficultyOptions[currentIndex + 1].value
      handleNextLevel()
      navigate(`/game?difficulty=${nextDifficulty}`)
    }
  }

  const handleGoToFirstLevel = () => {
    handleRestart()
    navigate('/game?difficulty=10')
  }

  const handleStayCurrentLevel = () => {
    handleNextLevel()
    handleNextQuestion()
  }

  const getColumns = () => {
    return 'grid-cols-5'
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
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            连续答对: {correctCount}/10
          </p>
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
          <div className="flex flex-col justify-center mb-6 gap-3">
            <FeedbackMessage
              isCorrect={isCorrect}
              correctAnswer={correctAnswer}
              onNext={handleNextQuestion}
            />
            <button
              onClick={() => setShowExplanation(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-bold transition-all text-sm shadow-md"
            >
              解析答案
            </button>
          </div>
        )}

        <div className={`grid ${getColumns()} gap-2 sm:gap-3 justify-items-center w-full`}>
          {options.map((num, index) => (
            <div
              key={`${num}-${index}`}
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

      {showLevelComplete && (
        <LevelCompleteMessage
          currentDifficulty={difficulty}
          onNextLevel={handleGoToNextLevel}
          onStayCurrentLevel={handleStayCurrentLevel}
        />
      )}

      {showGameComplete && (
        <GameCompleteMessage onRestart={handleGoToFirstLevel} />
      )}

      {showExplanation && (
        <AnswerExplanation
          num1={num1}
          num2={num2}
          correctAnswer={correctAnswer}
          onClose={() => setShowExplanation(false)}
        />
      )}
    </div>
  )
}