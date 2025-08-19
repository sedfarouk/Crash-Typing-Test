import { useState, createContext, useEffect } from "react"
import SENTENCES from '../data/data';

const DEFAULT_TIMER_INTERVAL = 15;
const length = SENTENCES.easy.plain.length;
const DEFAULT_SENTENCE = SENTENCES.easy.plain[Math.floor(Math.random() * length)];

const AppCtx = createContext({
	punctuationSwitch: false,
	numbersSwitch: false,
	timerInterval: DEFAULT_TIMER_INTERVAL,
	selectedText: DEFAULT_SENTENCE,
	gameStart: false,
	handleNumbersSwitch: () => null,
	handlePunctuationSwitch: () => null,
	handleTimerIntervalChange: () => null,
	handleGameStart: () => null,
	handleSetSelectedText: () => null
});

const AppContextProvider = ({ children }) => {
	const [punctuationSwitch, setPunctuationSwitch] = useState(false);
	const [numbersSwitch, setNumbersSwitch] = useState(false);
	const [timerInterval, setTimerInterval] = useState(DEFAULT_TIMER_INTERVAL);
	const [selectedText, setSelectedText] = useState(DEFAULT_SENTENCE);
	const [gameStart, setGameStart] = useState(false);

	useEffect(() => {
		let interval;

		if (gameStart) {
			interval = setInterval(() => {
				setTimerInterval(prevRemainingTime => {
					if (prevRemainingTime <= 1) {
						clearInterval(interval);
						return 0;
					}
					return prevRemainingTime - 1;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [gameStart]);

	function handlePunctuationSwitch() {
		setPunctuationSwitch(prev => !prev);
	}

	function handleNumbersSwitch() {
		setNumbersSwitch(prev => !prev);
	}

	function handleTimerIntervalChange(newInterval) {
		if (!gameStart) return;
		setTimerInterval(newInterval);
	}

	function handleGameStart() {
		setGameStart(prev => !prev);
	}

	function handleSetSelectedText(newText) {
		setSelectedText(newText);
	}

	const ctxValue = {
		punctuationSwitch,
		numbersSwitch,
		timerInterval,
		selectedText,
		handleNumbersSwitch,
		handlePunctuationSwitch,
		handleTimerIntervalChange,
		handleGameStart,
		handleSetSelectedText
	}

	return <AppCtx.Provider value={ctxValue}>
		{children}
	</AppCtx.Provider>
}

export { AppCtx };
export default AppContextProvider
