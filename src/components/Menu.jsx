import { useContext } from 'react';
import classes from './Menu.module.css';
import {AppCtx} from '@/store/app-store';

export default function Menu() {
  const appCtx = useContext(AppCtx);

  return <>
    <section id="menu" className={`${classes.menu} flex gap-3 items-center rounded-lg md:h-12 h-17 w-auto mx-auto px-2 py-3 bg-muted text-sm text-muted-foreground`}>
      <nav className="flex gap-3">
        <p onClick={appCtx.handlePunctuationSwitch} className={appCtx.punctuationSwitch ? "text-amber-600" : null}>@ punctuation</p>
        <p onClick={appCtx.handleNumbersSwitch} className={appCtx.numbersSwitch ? "text-amber-600" : null}># numbers</p>
      </nav>
      <div className="spacer h-6 rounded-2xl w-0.5 rounded-2 border-none bg-gray-400"></div>
      <nav className="flex gap-1">
        <p className="text-amber-600">time</p>
      </nav>
      <div className="spacer h-6 rounded-2xl w-0.5 rounded-2 border-none bg-gray-400"></div>
      <nav className="flex gap-3">
        <p className={appCtx.timerInterval === 15 ? "text-amber-600" : null} onClick={() => appCtx.handleTimerIntervalChange(15)}>15</p>
        <p className={appCtx.timerInterval === 30 ? "text-amber-600" : null} onClick={() => appCtx.handleTimerIntervalChange(30)}>30</p>
        <p className={appCtx.timerInterval === 60 ? "text-amber-600" : null} onClick={() => appCtx.handleTimerIntervalChange(60)}>60</p>
        <p className={appCtx.timerInterval === 120 ? "text-amber-600" : null} onClick={() => appCtx.handleTimerIntervalChange(120)}>120</p>
        <p>Custom</p>
      </nav>
    </section>
    <h3 className="text-3xl font-semibold text-amber-600">{appCtx.timerInterval} s</h3>
  </>
}