import { useState, useEffect, useCallback } from 'react'
import { generateRandomSubtraction, generateAnswerOptions, difficultyOptions } from '../utils/mathUtils'
import { playCorrectSound, playWrongSound } from '../utils/soundUtils'

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

export function useSubtractionGame(difficulty: number) {
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
    const { num1, num2, result } = generateRandomSubtraction(difficulty)
    const options = generateAnswerOptions(result, difficulty, 10)

    setGameState(prev => ({
      ...prev,
      num1,
      num2,
      correctAnswer: result,
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
    
    // 播放音效
    if (isCorrect) {
      playCorrectSound()
    } else {
      playWrongSound()
    }
    
    const newCorrectCount = isCorrect ? gameState.correctCount + 1 : 0

    const currentIndex = difficultyOptions.findIndex(d => d.value === difficulty)
    const isLastLevel = currentIndex === difficultyOptions.length - 1

    if (isCorrect && newCorrectCount >= 10) {
      if (isLastLevel) {
        setGameState(prev => ({
          ...prev,
          selectedAnswer: answer,
          isCorrect,
          showFeedback: true,
          correctCount: newCorrectCount,
          showGameComplete: true,
        }))
      } else {
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