import { useState, useEffect, useCallback } from 'react'
import { generateRandomNumbers, generateAnswerOptions, difficultyOptions } from '../utils/mathUtils'

interface GameState {
  num1: number
  num2: number
  correctAnswer: number
  selectedAnswer: number | null
  isCorrect: boolean | null
  showFeedback: boolean
  options: number[]
  correctCount: number
  showLevelComplete: boolean
  showGameComplete: boolean
}

export function useMathGame(difficulty: number) {
  const [gameState, setGameState] = useState<GameState>({
    num1: 0,
    num2: 0,
    correctAnswer: 0,
    selectedAnswer: null,
    isCorrect: null,
    showFeedback: false,
    options: [],
    correctCount: 0,
    showLevelComplete: false,
    showGameComplete: false,
  })

  const generateNewQuestion = useCallback(() => {
    const { num1, num2, sum } = generateRandomNumbers(difficulty)
    const options = generateAnswerOptions(sum, difficulty, 10)

    setGameState(prev => ({
      ...prev,
      num1,
      num2,
      correctAnswer: sum,
      selectedAnswer: null,
      isCorrect: null,
      showFeedback: false,
      options,
    }))
  }, [difficulty])

  useEffect(() => {
    generateNewQuestion()
  }, [generateNewQuestion])

  const handleAnswerSelect = (answer: number) => {
    if (gameState.showFeedback) return

    const isCorrect = answer === gameState.correctAnswer
    const newCorrectCount = isCorrect ? gameState.correctCount + 1 : 0

    // 判断是否通关
    const currentIndex = difficultyOptions.findIndex(d => d.value === difficulty)
    const isLastLevel = currentIndex === difficultyOptions.length - 1

    if (isCorrect && newCorrectCount >= 10) {
      // 连续答对10题
      if (isLastLevel) {
        // 最后一关，显示全部通关
        setGameState(prev => ({
          ...prev,
          selectedAnswer: answer,
          isCorrect,
          showFeedback: true,
          correctCount: newCorrectCount,
          showGameComplete: true,
        }))
      } else {
        // 显示关卡完成
        setGameState(prev => ({
          ...prev,
          selectedAnswer: answer,
          isCorrect,
          showFeedback: true,
          correctCount: newCorrectCount,
          showLevelComplete: true,
        }))
      }
    } else {
      setGameState(prev => ({
        ...prev,
        selectedAnswer: answer,
        isCorrect,
        showFeedback: true,
        correctCount: newCorrectCount,
      }))
    }
  }

  const handleNextQuestion = () => {
    generateNewQuestion()
  }

  const handleNextLevel = () => {
    setGameState(prev => ({
      ...prev,
      correctCount: 0,
      showLevelComplete: false,
    }))
  }

  const handleRestart = () => {
    setGameState(prev => ({
      ...prev,
      correctCount: 0,
      showGameComplete: false,
    }))
  }

  return {
    ...gameState,
    handleAnswerSelect,
    handleNextQuestion,
    handleNextLevel,
    handleRestart,
  }
}