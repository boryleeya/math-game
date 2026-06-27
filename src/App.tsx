import { Routes, Route } from 'react-router-dom'
import DifficultySelect from './pages/DifficultySelect'
import MathGame from './pages/MathGame'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<DifficultySelect />} />
        <Route path="/game" element={<MathGame />} />
      </Routes>
    </div>
  )
}

export default App