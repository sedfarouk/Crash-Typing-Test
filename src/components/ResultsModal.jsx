import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AppCtx } from "@/store/app-store"
import { useContext, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Trophy, Target, Zap, Award, TrendingUp, Clock, AlertTriangle, Star } from "lucide-react"

const getPerformanceLevel = (wpm, accuracy) => {
  if (wpm >= 80 && accuracy >= 95) return { level: "Legend", color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/20", icon: Trophy }
  if (wpm >= 60 && accuracy >= 90) return { level: "Expert", color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/20", icon: Award }
  if (wpm >= 40 && accuracy >= 85) return { level: "Advanced", color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/20", icon: Target }
  if (wpm >= 25 && accuracy >= 80) return { level: "Intermediate", color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/20", icon: TrendingUp }
  return { level: "Beginner", color: "text-gray-500", bgColor: "bg-gray-100 dark:bg-gray-900/20", icon: Star }
}

const getAccuracyMessage = (accuracy) => {
  if (accuracy >= 98) return "Flawless! 🎯"
  if (accuracy >= 95) return "Excellent! 🌟"
  if (accuracy >= 90) return "Great job! 👍"
  if (accuracy >= 80) return "Good work! 📈"
  return "Keep practicing! 💪"
}

const getSpeedMessage = (wpm) => {
  if (wpm >= 80) return "Lightning fast! ⚡"
  if (wpm >= 60) return "Speedy fingers! 🚀"
  if (wpm >= 40) return "Nice pace! 🏃‍♂️"
  if (wpm >= 25) return "Steady typing! 🚶‍♂️"
  return "Rome wasn't built in a day! 🏗️"
}

const AnimatedCounter = ({ value, duration = 1000, suffix = "" }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const end = parseFloat(value) || 0
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [value, duration])
  
  return <span>{Math.round(count)}{suffix}</span>
}

export default function ResultsModal({onClose, results}) {
  const appCtx = useContext(AppCtx);
  const [showDetails, setShowDetails] = useState(false)
  
  const performance = getPerformanceLevel(results.wpm, results.accuracy)
  const PerformanceIcon = performance.icon
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  }

  return createPortal(
    <Dialog open={appCtx.gameStatus === "finished"} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className={`mx-auto w-20 h-20 rounded-full ${performance.bgColor} flex items-center justify-center my-4 animate-bounce`}>
            <PerformanceIcon className={`w-10 h-10 ${performance.color}`} />
          </div>
          <DialogTitle className="text-2xl font-bold">
            🎉 {performance.level} Performance!
          </DialogTitle>
          <DialogDescription className="text-lg">
            {getSpeedMessage(results.wpm)} {getAccuracyMessage(results.accuracy)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-lg p-4 text-center border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-muted-foreground">Speed</span>
              </div>
              <div className="text-3xl font-bold text-blue-500">
                <AnimatedCounter value={results.wpm} suffix=" WPM" />
              </div>
              <div className="text-xs text-muted-foreground">
                Raw: <AnimatedCounter value={results.rawWpm} suffix=" WPM" />
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 text-center border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
              </div>
              <div className="text-3xl font-bold text-green-500">
                <AnimatedCounter value={results.accuracy} suffix="%" />
              </div>
              <div className="text-xs text-muted-foreground">
                {results.errors} errors
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 text-center border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-muted-foreground">Time</span>
              </div>
              <div className="text-2xl font-bold text-purple-500">
                {formatTime(results.timeTaken)}
              </div>
              <div className="text-xs text-muted-foreground">
                {results.progress}% completed
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 text-center border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-muted-foreground">Consistency</span>
              </div>
              <div className="text-2xl font-bold text-orange-500">
                <AnimatedCounter value={results.consistency} suffix="%" />
              </div>
              <div className="text-xs text-muted-foreground">
                {results.backspaces} corrections
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{results.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(results.progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {results.wpm >= 40 && (
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                🚀 Speed Demon
              </div>
            )}
            {results.accuracy >= 95 && (
              <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                🎯 Sharpshooter
              </div>
            )}
            {results.errors === 0 && (
              <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                ✨ Perfectionist
              </div>
            )}
            {results.consistency >= 90 && (
              <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full text-xs font-medium">
                🎪 Steady Hand
              </div>
            )}
          </div>

          {/* Detailed Stats Toggle */}
          <Button 
            variant="outline" 
            onClick={() => setShowDetails(!showDetails)}
            className="w-full"
          >
            {showDetails ? 'Hide' : 'Show'} Detailed Stats
          </Button>

          {showDetails && (
            <div className="grid grid-cols-2 gap-3 text-sm bg-muted/50 rounded-lg p-4">
              <div className="flex justify-between">
                <span>Characters Typed:</span>
                <span className="font-medium">{results.charactersTyped}</span>
              </div>
              <div className="flex justify-between">
                <span>Correct Characters:</span>
                <span className="font-medium text-green-600">{results.correctCharacters}</span>
              </div>
              <div className="flex justify-between">
                <span>Error Rate:</span>
                <span className="font-medium text-red-600">{results.errorRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>CPM:</span>
                <span className="font-medium">{results.cpm}</span>
              </div>
              <div className="flex justify-between">
                <span>Words Completed:</span>
                <span className="font-medium">{results.wordsCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span>Backspaces:</span>
                <span className="font-medium">{results.backspaces}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:justify-center">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onClose} className="flex-1">
              🔄 Try Again
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    , document.getElementById("modal"))
}