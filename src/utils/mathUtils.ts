export interface DifficultyOption {
  label: string
  value: number
  color: string
}

export const difficultyOptions: DifficultyOption[] = [
  { label: '10以内', value: 10, color: 'bg-red-400 hover:bg-red-500' },
  { label: '20以内', value: 20, color: 'bg-orange-400 hover:bg-orange-500' },
  { label: '30以内', value: 30, color: 'bg-amber-400 hover:bg-amber-500' },
  { label: '40以内', value: 40, color: 'bg-yellow-400 hover:bg-yellow-500' },
  { label: '50以内', value: 50, color: 'bg-lime-400 hover:bg-lime-500' },
  { label: '60以内', value: 60, color: 'bg-green-400 hover:bg-green-500' },
  { label: '70以内', value: 70, color: 'bg-emerald-400 hover:bg-emerald-500' },
  { label: '80以内', value: 80, color: 'bg-teal-400 hover:bg-teal-500' },
  { label: '90以内', value: 90, color: 'bg-cyan-400 hover:bg-cyan-500' },
  { label: '100以内', value: 100, color: 'bg-blue-400 hover:bg-blue-500' },
]

export function generateRandomNumbers(maxSum: number): { num1: number; num2: number; sum: number } {
  const num1 = Math.floor(Math.random() * (maxSum - 1)) + 1
  const maxNum2 = maxSum - num1
  const num2 = Math.floor(Math.random() * maxNum2) + 1
  return { num1, num2, sum: num1 + num2 }
}

export function generateNumberArray(max: number): number[] {
  return Array.from({ length: max }, (_, i) => i + 1)
}

export function generateAnswerOptions(correctAnswer: number, maxNum: number, count: number = 8): number[] {
  const options = new Set<number>()
  options.add(correctAnswer)
  
  while (options.size < count) {
    const randomNum = Math.floor(Math.random() * maxNum) + 1
    if (randomNum !== correctAnswer) {
      options.add(randomNum)
    }
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5)
}