import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { QuestionDisplay } from '../components/QuestionDisplay'
import { NumberButton } from '../components/NumberButton'
import { FeedbackMessage } from '../components/FeedbackMessage'
import { LevelCompleteMessage } from '../components/LevelCompleteMessage'
import { GameCompleteMessage } from '../components/GameCompleteMessage'
import { AnswerExplanation } from '../components/AnswerExplanation'
import { useSubtractionGame } from '../hooks/useSubtractionGame'
import { difficultyOptions } from '../utils/mathUtils'
import { isSoundEnabled, setSoundEnabled } from '../utils/soundUtils'

export default function SubtractionGame() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const difficulty = parseInt(searchParams.get('difficulty') || '10')
  const [showExplanation, setShowExplanation] = useState(false)
  const [soundOn, setSoundOn] = useState(isSoundEnabled())

  const toggleSound = () => {
    const newSoundState = !soundOn
    setSoundOn(newSoundState)
    setSoundEnabled(newSoundState)
  }

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
  } = useSubtractionGame(difficulty)

  const handleBack = () => {
    navigate('/')
  }

  const handleGoToNextLevel = () => {
    const currentIndex = difficultyOptions.findIndex(d => d.value === difficulty)
    if (currentIndex < difficultyOptions.length - 1) {
      const nextDifficulty = difficultyOptions[currentIndex + 1].value
      handleNextLevel()
      navigate(`/subtraction?difficulty=${nextDifficulty}`)
    }
  }

  const handleGoToFirstLevel = () => {
    handleRestart()
    navigate('/subtraction?difficulty=10')
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
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="text-xl sm:text-2xl">←</span>
            <span className="text-base sm:text-lg font-bold">返回选择</span>
          </button>
          <button
            onClick={toggleSound}
            className="px-3 py-2 rounded-lg font-bold transition-all text-sm shadow-md bg-gray-100 hover:bg-gray-200"
            title={soundOn ? '关闭音效' : '打开音效'}
          >
            {soundOn ? '🔊' : '🔇'}
          </button>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
            {difficulty}以内减法
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            连续答对: {correctCount}/10
          </p>
        </div>

        <QuestionDisplay
          num1={num1}
          num2={num2}
          correctAnswer={correctAnswer}
          isCorrect={isCorrect}
          showFeedback={showFeedback}
          operator="-"
        />

        {showFeedback && isCorrect !== null && (
          <FeedbackMessage
            isCorrect={isCorrect}
            correctAnswer={correctAnswer}
            onNext={handleNextQuestion}
          />
        )}

        <div className={`grid ${getColumns()} gap-2 sm:gap-3 justify-items-center w-full my-6`}>
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

        <button
          onClick={() => setShowExplanation(true)}
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-bold transition-all text-sm shadow-md"
        >
          解析答案
        </button>
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
          operator="-"
        />
      )}
    </div>
  )
}