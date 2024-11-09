import { useState, useEffect } from 'react';

interface IPomo {
  seconds: number;
  minutes: number;
}

export const usePomodoro = () => {
  const [{ seconds, minutes }, setPomo] = useState<IPomo>({
    seconds: 0,
    minutes: 25,
  });
  const [isStart, setIsStart] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [step, setStep] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const start = () => {
    setIsStart(true);
    if (minutes === 25) {
      setPomo({
        seconds: 59,
        minutes: 24,
      });
      setStep(1);
    }
  };

  const stop = () => setIsStart(false);
  
  const reset = () => {
    setIsStart(false);
    setStep(0);
    setCycleCount(0);
    setPomo({
      seconds: 0,
      minutes: 25,
    });
  };

  const forceState = (x: number) => {
    if (x === 1) {
      setStep(x);
      setPomo({ seconds: 0, minutes: 25 });
    } else if (x === 2) {
      setStep(x);
      setPomo({ minutes: 5, seconds: 0 });
    } else {
      setStep(x);
      setPomo({ minutes: 15, seconds: 0 });
    }
    setIsStart(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isStart) {
      interval = setInterval(() => {
        setPomo(({ seconds, minutes }) => {
          if (seconds > 0) {
            return { seconds: seconds - 1, minutes };
          } else if (minutes > 0) {
            return { seconds: 59, minutes: minutes - 1 };
          } else {
            if (step === 1) {
              setIsStart(false);
              setCycleCount(cycleCount + 1);

              if (cycleCount === 3) {
                setStep(3);
                setPomo({ minutes: 15, seconds: 0 });
              } else {
                setStep(2);
                setPomo({ minutes: 5, seconds: 0 });
              }
              setIsBreak(true);
            } else if (step === 2 || step === 3) {
              setIsStart(false);
              setIsBreak(false);
              setStep(1);
              setPomo({ minutes: 25, seconds: 0 });
              if (step === 3) setCycleCount(0);
            }
            return { minutes: 0, seconds: 0 };
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isStart, step, cycleCount]);

  return {
    seconds,
    minutes,
    isStart,
    isBreak,
    step,
    cycleCount,
    start,
    stop,
    reset,
    forceState
  };
}; 