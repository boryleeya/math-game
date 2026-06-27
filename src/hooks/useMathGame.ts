import { useState, useEffect, useCallback } from 'react'
import { generateRandomNumbers } from '../utils/mathUtils'

interface GameState {
  num1: number
  num2: number
  correctAnswer: number
  selectedAnswer: number | null
  isCorrect: boolean | null
  showFeedback: boolean
}

export function useMathGame(difficulty: number) {
  const [gameState, setGameState] = useState<GameState>({
    num1: 0,
    num2: 0,
    correctAnswer: 0,
    selectedAnswer: null,
    isCorrect: null,
    showFeedback: false,
  })

  const generateNewQuestion = useCallback(() => {
    const { num1, num2, sum } = generateRandomNumbers(difficulty)
    setGameState({
      num1,
      num2,
      correctAnswer: sum,
      selectedAnswer: null,
      isCorrect: null,
      showFeedback: false,
    })
  }, [difficulty])

  useEffect(() => {
    generateNewQuestion()
  }, [generateNewQuestion])

  const handleAnswerSelect = (answer: number) => {
    if (gameState.showFeedback) return
    
    const isCorrect = answer === gameState.correctAnswer
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isCorrect,
      showFeedback: true,
    }))
  }

  const handleNextQuestion = () => {
    generateNewQuestion()
  }

  return {
    ...gameState,
    handleAnswerSelect,
    handleNextQuestion,
  }
}