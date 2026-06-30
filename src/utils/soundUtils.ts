// 音效工具函数 - 使用 Web Audio API 生成简单的音效

let audioContext: AudioContext | null = null
let soundEnabled = true // 默认开启音效

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContext
}

// 获取音效开关状态
export function isSoundEnabled(): boolean {
  return soundEnabled
}

// 设置音效开关状态
export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled
}

// 播放正确答案的音效 - 欢快的上升音调
export function playCorrectSound() {
  if (!soundEnabled) return // 音效关闭时不播放

  const ctx = getAudioContext()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
  oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1) // E5
  oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2) // G5

  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 0.5)
}

// 播放错误答案的音效 - 低沉的下降音调
export function playWrongSound() {
  if (!soundEnabled) return // 音效关闭时不播放

  const ctx = getAudioContext()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.frequency.setValueAtTime(392, ctx.currentTime) // G4
  oscillator.frequency.setValueAtTime(349.23, ctx.currentTime + 0.15) // F4
  oscillator.frequency.setValueAtTime(293.66, ctx.currentTime + 0.3) // D4

  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 0.5)
}