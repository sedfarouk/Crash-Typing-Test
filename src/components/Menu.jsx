import { useContext, useState, useEffect } from 'react';
import { AppCtx } from '@/store/app-store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Shuffle,
  Hash,
  AtSign,
  Zap,
  Target,
  Brain,
  Timer,
  Settings,
  Play,
  RotateCcw
} from 'lucide-react';

export default function Menu({ onRestart }) {
  const appCtx = useContext(AppCtx);

  const [configurePunctuation, setConfigurePunctuation] = useState(
    appCtx.gameMode.includes('punctuation')
  );
  const [configureNumbers, setConfigureNumbers] = useState(
    appCtx.gameMode.includes('numbers')
  );
  const [configureTimer, setConfigureTimer] = useState(true);
  const [configureMode, setConfigureMode] = useState(false);

  useEffect(() => {
    let newMode = '';
    if (configurePunctuation && configureNumbers) newMode = 'punctuation&numbers';
    else if (configurePunctuation) newMode = 'punctuation';
    else if (configureNumbers) newMode = 'numbers';
    else newMode = 'plain';

    appCtx.handleMode(newMode);
    onRestart();
  }, [configurePunctuation, configureNumbers]);

  const userTimer = +(localStorage.getItem("timer_interval"));

  const getDifficultyInfo = (difficulty) => {
    const info = {
      easy: {
        icon: Target,
        color: 'text-green-500',
        bgColor: 'bg-green-50 dark:bg-green-950',
        description: 'Simple words, no tricks',
        multiplier: '1x'
      },
      medium: {
        icon: Zap,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950',
        description: 'Mixed complexity',
        multiplier: '1.5x'
      },
      hard: {
        icon: Brain,
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-950',
        description: 'Complex patterns',
        multiplier: '2x'
      }
    };
    return info[difficulty] || info.easy;
  };

  const getTimerColor = (time) => {
    if (time <= 30) return 'text-red-500';
    if (time <= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const currentDifficulty = getDifficultyInfo(appCtx.gameMode.toLowerCase());

  return (
    <>
      <Card className="p-6 bg-gradient-to-r from-card via-card/80 to-card border-2 border-primary/20 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Settings className="w-4 h-4" />
              <span>Game Mode</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={configurePunctuation ? "default" : "outline"}
                size="sm"
                onClick={() => setConfigurePunctuation(prev => !prev)}
                className="flex items-center gap-2 transition-all hover:scale-105"
              >
                <AtSign className="w-4 h-4" />
                Punctuation
                {configurePunctuation && <Badge variant="secondary" className="ml-1">ON</Badge>}
              </Button>

              <Button
                variant={configureNumbers ? "default" : "outline"}
                size="sm"
                onClick={() => setConfigureNumbers(prev => !prev)}
                className="flex items-center gap-2 transition-all hover:scale-105"
              >
                <Hash className="w-4 h-4" />
                Numbers
                {configureNumbers && <Badge variant="secondary" className="ml-1">ON</Badge>}
              </Button>
            </div>
          </div>

          <div className="hidden lg:block h-12 w-px bg-border"></div>
          <div className="lg:hidden w-full h-px bg-border"></div>

          <div className="flex gap-4">
            <Button
              variant={configureTimer ? "default" : "ghost"}
              size="sm"
              onClick={() => { setConfigureTimer(true); setConfigureMode(false); }}
              className="flex items-center gap-2"
            >
              <Timer className="w-4 h-4" />
              Timer
            </Button>

            <Button
              variant={configureMode ? "default" : "ghost"}
              size="sm"
              onClick={() => { setConfigureMode(true); setConfigureTimer(false); }}
              className="flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Difficulty
            </Button>
          </div>

          <div className="hidden lg:block h-12 w-px bg-border"></div>
          <div className="lg:hidden w-full h-px bg-border"></div>

          <div className="flex-1">
            {configureTimer && (
              <div className="space-y-3">
                <span className="text-sm font-medium text-muted-foreground">Select Duration</span>
                <div className="flex flex-wrap gap-2">
                  {[15, 30, 60, 120].map((time) => (
                    <Button
                      key={time}
                      variant={appCtx.timerInterval === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => { appCtx.handleTimerIntervalChange(time); onRestart() }}
                      className={`transition-all hover:scale-105 ${userTimer === time
                          ? `${getTimerColor(time)} border-current`
                          : ''
                        }`}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {time}s
                    </Button>
                  ))}
                  <Button
                    variant={![15, 30, 60, 120].includes(userTimer) ? "default" : "outline"}
                    size="sm"
                    className="transition-all hover:scale-105"
                  >
                    Custom
                  </Button>
                </div>
              </div>
            )}

            {configureMode && (
              <div className="space-y-3">
                <span className="text-sm font-medium text-muted-foreground">Choose Difficulty</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {["easy", "medium", "hard"].map((difficulty) => {
                    const info = getDifficultyInfo(difficulty);
                    const Icon = info.icon;
                    const isActive = appCtx.gameMode.toLowerCase() === difficulty;

                    return (
                      <div
                        key={difficulty}
                        onClick={() => {appCtx.handleGameMode(difficulty); onRestart()}}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${isActive
                            ? `${info.bgColor} border-current ${info.color}`
                            : 'border-border hover:border-primary/50'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${isActive ? info.color : 'text-muted-foreground'}`} />
                            <span className={`font-medium capitalize ${isActive ? info.color : 'text-foreground'}`}>
                              {difficulty}
                            </span>
                          </div>
                          <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                            {info.multiplier}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${getTimerColor(appCtx.timerInterval) === 'text-red-500' ? 'bg-red-100 dark:bg-red-950' : getTimerColor(appCtx.timerInterval) === 'text-yellow-500' ? 'bg-yellow-100 dark:bg-yellow-950' : 'bg-green-100 dark:bg-green-950'}`}>
                <Clock className={`w-5 h-5 ${getTimerColor(appCtx.timerInterval)}`} />
              </div>
              <div>
                <div className={`text-2xl font-bold ${getTimerColor(appCtx.timerInterval)}`}>
                  {appCtx.timerInterval}s
                </div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${currentDifficulty.bgColor}`}>
                <currentDifficulty.icon className={`w-5 h-5 ${currentDifficulty.color}`} />
              </div>
              <div>
                <div className={`text-lg font-semibold capitalize ${currentDifficulty.color}`}>
                  {appCtx.gameMode.toLowerCase()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentDifficulty.description}
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              {configurePunctuation && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <AtSign className="w-3 h-3" />
                  Punctuation
                </Badge>
              )}
              {configureNumbers && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  Numbers
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {appCtx.gameStatus === 'not started' && (
                <Badge variant="outline" className="flex items-center gap-1 text-blue-600">
                  <Play className="w-3 h-3" />
                  Ready
                </Badge>
              )}
              {appCtx.gameStatus === 'started' && (
                <Badge variant="default" className="flex items-center gap-1 bg-green-500 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Active
                </Badge>
              )}
              {appCtx.gameStatus === 'finished' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Finished
                </Badge>
              )}
            </div>

            <Button
              onClick={onRestart}
              size="sm"
              variant="outline"
              className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
            >
              <Shuffle className="w-4 h-4" />
              New Text
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}