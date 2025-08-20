import { Zap, Github, Twitter, Linkedin, Mail, Keyboard, Trophy, Target, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card/50 backdrop-blur border-t mt-20">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-primary">CrashTypingTest</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Master your typing skills with the interactive typing test. Track your WPM, accuracy, and consistency while having fun!
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/sedfarouk/Crash-Typing-Test" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/farouk-sedick/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Clock className="h-4 w-4" />
                <span>Timed Tests</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Target className="h-4 w-4" />
                <span>Accuracy Tracking</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Trophy className="h-4 w-4" />
                <span>Achievement System</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Keyboard className="h-4 w-4" />
                <span>Multiple Text Options</span>
              </li>
            </ul>
          </div>
{/* 
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Best WPM</span>
                <span className="font-medium">--</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-medium">--%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tests Taken</span>
                <span className="font-medium">--</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Max Streak</span>
                <span className="font-medium">--</span>
              </div>
            </div>
          </div> */}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:sadikalhanssah@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  sadikalhanssah@gmail.com
                </a>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-medium">Quick Links</h4>
              <div className="space-y-1">
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Help & Tips</a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Keyboard Shortcuts</a>
                <a href="https://github.com/sedfarouk/Crash-Typing-Test/issues" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Report Bug</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-5 pt-5">
          <div className="text-center space-y-3">
            <h4 className="text-sm font-semibold">💡 Pro Tip</h4>
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Keep your fingers on the home row (ASDF for left hand, JKL; for right hand) and use proper finger positioning for maximum speed and accuracy!
            </p>
          </div>
        </div>

        <div className="border-t mt-5 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} CrashTypingTest. Made with ⚡ for typing enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}