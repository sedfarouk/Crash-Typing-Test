import { useContext, useState, useEffect } from 'react';
import { AppCtx } from '@/store/app-store';

export default function Menu() {
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
  }, [configurePunctuation, configureNumbers]);

  const getActiveClass = (isActive) =>
    isActive
      ? 'text-amber-600'
      : 'text-muted-foreground hover:text-amber-500 cursor-pointer transition-colors';

  return (
    <>
      <section className="flex gap-3 items-center rounded-lg md:h-12 h-17 w-auto mx-auto px-5 bg-muted text-sm text-muted-foreground">

        <nav className="flex gap-3">
          <p
            onClick={() => setConfigurePunctuation(prev => !prev)}
            className={getActiveClass(configurePunctuation)}
          >
            @ punctuation
          </p>
          <p
            onClick={() => setConfigureNumbers(prev => !prev)}
            className={getActiveClass(configureNumbers)}
          >
            # numbers
          </p>
        </nav>

        <div className="h-6 w-[2px] bg-gray-500 mx-2"></div>

        <nav className="flex gap-3">
          <p
            className={`cursor-pointer transition-colors ${configureTimer ? 'text-amber-600' : 'hover:text-amber-500'}`}
            onClick={() => { setConfigureTimer(prev => !prev); setConfigureMode(false); }}
          >
            time
          </p>
          <p
            className={`cursor-pointer transition-colors ${configureMode ? 'text-amber-600' : 'hover:text-amber-500'}`}
            onClick={() => { setConfigureMode(prev => !prev); setConfigureTimer(false); }}
          >
            difficulty
          </p>
        </nav>

        <div className="h-6 w-[2px] bg-gray-500 mx-2"></div>

        {configureTimer && (
          <nav className="flex gap-3">
            {[15, 30, 60, 120].map((t) => (
              <p
                key={t}
                onClick={() => appCtx.handleTimerIntervalChange(t)}
                className={`cursor-pointer transition-colors ${appCtx.timerInterval === t ? 'text-amber-600' : 'hover:text-amber-500'}`}
              >
                {t}
              </p>
            ))}
            <p className="cursor-pointer hover:text-amber-500 transition-colors">Custom</p>
          </nav>
        )}

        {configureMode && (
          <nav className="flex gap-3">
            {["easy", "medium", "hard"].map((d) => (
              <p
                key={d}
                onClick={() => appCtx.handleGameMode(d)}
                className={`cursor-pointer transition-colors ${appCtx.gameMode.toLowerCase() === d ? 'text-amber-600' : 'hover:text-amber-500'}`}
              >
                {d}
              </p>
            ))}
          </nav>
        )}

      </section>

      <section id='time-and-shuffle' className='flex justify-between items-center'>
        <h3 className="text-3xl font-semibold text-amber-600">{appCtx.timerInterval} s</h3>
        <i className="fa-solid fa-shuffle text-xl cursor-pointer" onClick={appCtx.handleGameRestart}></i>
      </section>
    </>
  );
}
