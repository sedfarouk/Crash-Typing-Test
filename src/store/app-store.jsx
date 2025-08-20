import { useState, createContext, useEffect } from "react"
import SENTENCES from "@/data/data";

const AppCtx = createContext({
	mode: "",
	timerInterval: "",
	selectedText: "",
	gameStatus: "not started",
	gameMode: "",
	handleMode: () => null,
	handleTimerIntervalChange: () => null,
	handleGameStatus: () => null,
	handleSetSelectedText: () => null,
	handleGameRestart: () => null,
	handleGameMode: () => null
});

const AppContextProvider = ({ children }) => {
	const [mode, setMode] = useState(localStorage.getItem("mode") || "plain");
	const [timerInterval, setTimerInterval] = useState(+(localStorage.getItem("timer_interval") || "15"));
	const [selectedText, setSelectedText] = useState(getSelectedText());
	const [gameMode, setGameMode] = useState(localStorage.getItem("difficulty") || "easy");
	const [gameStatus, setGameStatus] = useState("not started");

	function getSelectedText() {
		const difficulty = localStorage.getItem("difficulty").toLowerCase() || gameMode;
		const mode = localStorage.getItem("mode") || mode;
		const length = SENTENCES[difficulty][mode].length;
		const sentence = SENTENCES[difficulty][mode][Math.floor(Math.random() * length)];

		return sentence;
	}

	useEffect(() => {
		let interval;

		if (gameStatus === "started") {
			interval = setInterval(() => {
				setTimerInterval(prevRemainingTime => {
					if (prevRemainingTime <= 1) {
						clearInterval(interval);
						handleGameStatus("finished");
						return 0;
					}
					return prevRemainingTime - 1;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [gameStatus]);

	function handleMode(mode) {
		localStorage.setItem("mode", mode);
		setMode(mode);
		handleGameRestart();
	}

	function handleTimerIntervalChange(newInterval) {
		localStorage.setItem("timer_interval", newInterval);
		setTimerInterval(newInterval);
		handleGameRestart();
	}

	function handleGameStatus(option) {
		setGameStatus(option);
	}

	function handleGameMode(mode) {
		localStorage.setItem("difficulty", mode);
		setGameMode(mode);
		handleGameRestart();
	}

	function handleSetSelectedText(newText) {
		setSelectedText(newText);
	}

	function handleGameRestart() {
		setSelectedText(getSelectedText());
		setGameStatus("not started");
	}

	const ctxValue = {
		mode,
		timerInterval,
		selectedText,
		gameStatus,
		gameMode,
		handleMode,
		handleTimerIntervalChange,
		handleGameStatus,
		handleSetSelectedText,
		handleGameRestart,
		handleGameMode
	}

	return <AppCtx.Provider value={ctxValue}>
		{children}
	</AppCtx.Provider>
}

export { AppCtx };
export default AppContextProvider
