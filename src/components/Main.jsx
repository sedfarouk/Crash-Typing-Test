import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Menu from "./Menu";
import { useContext, useRef, useState, useEffect } from "react";
import { AppCtx } from "@/store/app-store";
import ResultsModal from "./ResultsModal";
import { 
	Zap, Target, Clock, TrendingUp, Award, Flame, 
	ChevronUp, Star, Trophy, AlertTriangle 
} from "lucide-react";

const userTimer = +(localStorage.getItem("timer_interval")) || 60;
const defaultValues = {
	totalCharsTyped: 0,
	totalErrors: 0,
	correctCharsTyped: 0,
	incorrectCharsTyped: 0,
	backspaceCount: 0
};

const getStreakColor = (streak) => {
	if (streak >= 20) return "text-purple-500 bg-purple-100 dark:bg-purple-900/20";
	if (streak >= 15) return "text-blue-500 bg-blue-100 dark:bg-blue-900/20";
	if (streak >= 10) return "text-green-500 bg-green-100 dark:bg-green-900/20";
	if (streak >= 5) return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
	return "text-gray-500 bg-gray-100 dark:bg-gray-900/20";
};

const getWPMColor = (wpm) => {
	if (wpm >= 60) return "text-purple-600";
	if (wpm >= 40) return "text-blue-600";
	if (wpm >= 25) return "text-green-600";
	return "text-gray-600";
};

export default function Main() {
	const appCtx = useContext(AppCtx);
	const [userInput, setUserInput] = useState("");
	const [values, setValues] = useState(defaultValues);
	const [previousInput, setPreviousInput] = useState("");
	const [streak, setStreak] = useState(0);
	const [maxStreak, setMaxStreak] = useState(0);
	const [combo, setCombo] = useState(0);
	const [showCombo, setShowCombo] = useState(false);
	const [recentWPM, setRecentWPM] = useState([]);
	const [startTime, setStartTime] = useState(null);
	const inputRef = useRef();

	const { totalCharsTyped, totalErrors, correctCharsTyped, incorrectCharsTyped, backspaceCount } = values;
	
	const timeElapsedInSecs = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
	const timeElapsedInMins = timeElapsedInSecs / 60;
	const timeRemaining = appCtx.timerInterval;
	
	const results = {
		wpm: timeElapsedInMins > 0 ? Math.round(((correctCharsTyped) / 5) / timeElapsedInMins) : 0,
		rawWpm: timeElapsedInMins > 0 ? Math.round((totalCharsTyped / 5) / timeElapsedInMins) : 0,
		cpm: timeElapsedInMins > 0 ? Math.round(totalCharsTyped / timeElapsedInMins) : 0,
		
		accuracy: totalCharsTyped > 0 ? Math.round((correctCharsTyped / totalCharsTyped) * 100) : 100,
		errorRate: totalCharsTyped > 0 ? Math.round((totalErrors / totalCharsTyped) * 100) : 0,
		
		errors: totalErrors,
		incorrectChars: incorrectCharsTyped,
		backspaces: backspaceCount,
		
		timeTaken: timeElapsedInSecs,
		timeElapsedMins: Math.round(timeElapsedInMins * 100) / 100,
		
		progress: Math.round((userInput.length / appCtx.selectedText.length) * 100),
		charactersTyped: totalCharsTyped,
		correctCharacters: correctCharsTyped,
		
		consistency: totalCharsTyped > 0 ? Math.round(((correctCharsTyped - backspaceCount) / totalCharsTyped) * 100) : 100,
		wordsCompleted: Math.floor(userInput.replace(/\s+/g, ' ').trim().split(' ').length),
		maxStreak: maxStreak,
		finalStreak: streak
	};

	const isGameOver = appCtx.gameStatus === "finished";
	const isGameActive = appCtx.gameStatus === "started";

	useEffect(() => {
		if (isGameActive && timeElapsedInSecs > 0 && timeElapsedInSecs % 5 === 0) {
			const currentWPM = results.wpm;
			setRecentWPM(prev => [...prev.slice(-11), currentWPM]); // Keep last 12 measurements
		}
	}, [timeElapsedInSecs, isGameActive, results.wpm]);

	useEffect(() => {
		if (isGameActive && timeRemaining <= 0 && !isGameOver) {
			appCtx.handleGameStatus("finished");
		}
	}, [timeRemaining, isGameActive, isGameOver, appCtx]);

	useEffect(() => {
		if (combo >= 5) {
			setShowCombo(true);
			const timer = setTimeout(() => setShowCombo(false), 1500);
			return () => clearTimeout(timer);
		}
	}, [combo]);

	function handleUserInputChange(e) {
		const newInput = e.target.value;
		const currIdx = newInput.length - 1;
		
		if (newInput.length > appCtx.selectedText.length) {
			return;
		}

		const isBackspace = newInput.length < userInput.length;
		
		setValues(prev => {
			const newValues = { ...prev };
			
			if (isBackspace) {
				newValues.backspaceCount++;
				setStreak(0); 
				setCombo(0);
			} else if (newInput.length > userInput.length) {
				const currentChar = newInput[currIdx];
				const expectedChar = appCtx.selectedText[currIdx];
				
				newValues.totalCharsTyped++;
				
				if (currentChar === expectedChar) {
					newValues.correctCharsTyped++;
					const newStreak = streak + 1;
					setStreak(newStreak);
					setMaxStreak(Math.max(maxStreak, newStreak));
					setCombo(combo + 1);
				} else {
					newValues.totalErrors++;
					newValues.incorrectCharsTyped++;
					setStreak(0);
					setCombo(0);
				}
			}
			
			return newValues;
		});

		setPreviousInput(userInput);
		setUserInput(newInput);

		if (newInput.length > 0 && appCtx.gameStatus === "not started") {
			appCtx.handleGameStatus("started");
			setStartTime(Date.now());
		}

		if (newInput === appCtx.selectedText) {
			appCtx.handleGameStatus("finished");
		}
	}

	function handleGameRestart() {
		appCtx.handleGameRestart();
		setValues(defaultValues);
		setUserInput("");
		setPreviousInput("");
		setStreak(0);
		setMaxStreak(0);
		setCombo(0);
		setShowCombo(false);
		setRecentWPM([]);
		setStartTime(null);
		inputRef.current?.focus();
	}

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	return (
		<>
			{isGameOver && <ResultsModal results={results} onClose={handleGameRestart} />}
			
			{showCombo && combo >= 5 && (
				<div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
					<div className="animate-ping text-6xl font-bold text-yellow-500 drop-shadow-lg">
						🔥 {combo}x COMBO!
					</div>
				</div>
			)}

			<main className="flex flex-col justify-start gap-6 h-full lg:mx-10 relative">
				<Menu onRestart={handleGameRestart} />
				
				{(isGameActive || appCtx.gameStatus === "not started") && (
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
						<Card className="p-4 text-center border-2 border-primary/20">
							<div className="flex items-center justify-center gap-2 mb-1">
								<Clock className={`w-4 h-4 ${timeRemaining <= 10 ? 'text-red-500' : 'text-blue-500'}`} />
								<span className="text-sm font-medium text-muted-foreground">Time</span>
							</div>
							<div className={`text-2xl font-bold ${timeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
								{formatTime(timeRemaining)}
							</div>
						</Card>

						<Card className="p-4 text-center">
							<div className="flex items-center justify-center gap-2 mb-1">
								<Zap className="w-4 h-4 text-yellow-500" />
								<span className="text-sm font-medium text-muted-foreground">WPM</span>
							</div>
							<div className={`text-2xl font-bold ${getWPMColor(results.wpm)}`}>
								{results.wpm}
								{recentWPM.length > 1 && (
									<ChevronUp className={`w-4 h-4 inline ml-1 ${recentWPM[recentWPM.length - 1] > recentWPM[recentWPM.length - 2] ? 'text-green-500' : 'text-red-500'}`} />
								)}
							</div>
						</Card>

						<Card className="p-4 text-center">
							<div className="flex items-center justify-center gap-2 mb-1">
								<Target className={`w-4 h-4 ${results.accuracy >= 95 ? 'text-green-500' : results.accuracy >= 85 ? 'text-yellow-500' : 'text-red-500'}`} />
								<span className="text-sm font-medium text-muted-foreground">Accuracy</span>
							</div>
							<div className={`text-2xl font-bold ${results.accuracy >= 95 ? 'text-green-600' : results.accuracy >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
								{results.accuracy}%
							</div>
						</Card>

						<Card className="p-4 text-center">
							<div className="flex items-center justify-center gap-2 mb-1">
								<Flame className="w-4 h-4 text-orange-500" />
								<span className="text-sm font-medium text-muted-foreground">Streak</span>
							</div>
							<div className="text-2xl font-bold text-orange-600">
								{streak}
								{streak >= 10 && <span className="text-sm">🔥</span>}
							</div>
						</Card>

						<Card className="p-4 text-center">
							<div className="flex items-center justify-center gap-2 mb-1">
								<TrendingUp className="w-4 h-4 text-purple-500" />
								<span className="text-sm font-medium text-muted-foreground">Progress</span>
							</div>
							<div className="text-2xl font-bold text-purple-600">
								{results.progress}%
							</div>
						</Card>

						<Card className="p-4 text-center">
							<div className="flex items-center justify-center gap-2 mb-1">
								<AlertTriangle className="w-4 h-4 text-red-500" />
								<span className="text-sm font-medium text-muted-foreground">Errors</span>
							</div>
							<div className="text-2xl font-bold text-red-600">
								{results.errors}
							</div>
						</Card>
					</div>
				)}

				{isGameActive && (
					<div className="flex flex-wrap gap-2 min-h-[2rem]">
						{streak >= 20 && (
							<Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
								🏆 Legend Streak
							</Badge>
						)}
						{streak >= 10 && (
							<Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300">
								🔥 On Fire!
							</Badge>
						)}
						{results.wpm >= 60 && (
							<Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
								⚡ Lightning Fast
							</Badge>
						)}
						{results.accuracy >= 98 && results.charactersTyped >= 20 && (
							<Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300">
								🎯 Perfect Aim
							</Badge>
						)}
					</div>
				)}

				{isGameActive && (
					<div className="space-y-2">
						<div className="flex justify-between text-sm text-muted-foreground">
							<span>Overall Progress</span>
							<span>{results.progress}%</span>
						</div>
						<div className="relative">
							<Progress value={results.progress} className="h-3" />
							{results.progress >= 25 && results.progress < 50 && (
								<div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
									🚀 Getting Started!
								</div>
							)}
							{results.progress >= 50 && results.progress < 75 && (
								<div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
									💪 Halfway There!
								</div>
							)}
							{results.progress >= 75 && results.progress < 100 && (
								<div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
									🔥 Almost Done!
								</div>
							)}
						</div>
					</div>
				)}
				
				<article id="type-content" className="relative">
					<Card className="p-6 bg-card/50 backdrop-blur border-2">
						<p className="text-2xl leading-relaxed font-mono selection:bg-primary/20">
							{appCtx.selectedText.split("").map((char, index) => {
								let baseStyle = "relative transition-all duration-150 ";
								
								if (index < userInput.length) {
									if (userInput[index] === char) {
										baseStyle += "text-green-500 bg-green-50 dark:bg-green-950 rounded px-0.5";
									} else {
										baseStyle += "text-red-500 bg-red-100 dark:bg-red-900 rounded px-0.5 animate-pulse";
									}
								} else if (index === userInput.length) {
									baseStyle += "bg-primary text-primary-foreground rounded px-0.5 animate-pulse shadow-lg";
								} else {
									baseStyle += "text-muted-foreground hover:text-foreground/60";
								}

								return (
									<span key={index} className={baseStyle}>
										{char}
									</span>
								);
							})}
						</p>
					</Card>
				</article>
				
				<article id="type-input" className="relative">
					<Card className="p-4 border-2 border-primary/20 focus-within:border-primary/50 transition-colors">
						<Input
							type="text"
							placeholder={isGameActive ? "Keep typing..." : "Click here and start typing to begin!"}
							className="text-lg border-0 shadow-none focus-visible:ring-0 bg-transparent"
							onChange={handleUserInputChange}
							autoFocus
							ref={inputRef}
							value={userInput}
							disabled={isGameOver}
						/>
					</Card>
					
					{isGameActive && (
						<div className="absolute -bottom-6 left-0 flex items-center gap-2 text-xs text-muted-foreground">
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
							<span>Typing active...</span>
						</div>
					)}
				</article>
			</main>
		</>
	);
}