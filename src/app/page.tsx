"use client";
import State from "app/components/state";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IPomo {
  seconds: number;
  minutes: number;
}

export default function Home() {
  const [{ seconds, minutes }, setPomo] = useState<IPomo>({
    seconds: 0,
    minutes: 25,
  });
  const [isStart, setIsStart] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  const [step, setStep] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const start = () => {
    console.log("Starting pomodoro...");
    setIsStart(true);
    if (minutes === 25) {
      setPomo({
        seconds: 59,
        minutes: 24,
      });
      setStep(1);
    }
  };

  const reset = () => {
    setResetAnimation(true)
    setTimeout(() => {
      setResetAnimation(false)
      setIsStart(false)
      setStep(0);
      setCycleCount(0)
      setPomo({
        seconds: 0,
        minutes: 25,
      });
    }, 1000)
  }

  const stop = () => {
    setIsStart(false);
  };

  const timeDisplay = () => {
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const forceState = (x: number) => {
    if (x === 1) {
      setStep(x)
      setPomo({
        seconds: 0,
        minutes: 25,
      });
      setIsStart(false)
    } else if (x === 2) {
      setStep(x);
      setPomo({ minutes: 5, seconds: 0 });
    }
    else {
      setStep(x);
      setPomo({ minutes: 15, seconds: 0 });
    }
    setIsStart(false)
  }

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
            if (step === 1) { // Work session complete
              setIsStart(false);
              setCycleCount(cycleCount + 1);

              if (cycleCount === 3) { // After 4 cycles, take a long break
                setStep(3);
                setPomo({ minutes: 15, seconds: 0 });
              } else { // Short break
                setStep(2);
                setPomo({ minutes: 5, seconds: 0 });
              }
              setIsBreak(true);
            } else if (step === 2) { // Short break complete
              setIsStart(false);
              setIsBreak(false);
              setStep(1);
              setPomo({ minutes: 25, seconds: 0 });
            } else if (step === 3) { // Long break complete
              setIsStart(false);
              setIsBreak(false);
              setCycleCount(0); // Reset the cycle count after a long break
              setStep(1);
              setPomo({ minutes: 25, seconds: 0 });
            }
            return { minutes: 0, seconds: 0 };
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isStart, step, cycleCount]);




  return (
    <main className={` flex min-h-screen flex-col items-center px-6 animate-fade animate-duration-[2000ms] relative z-[100]`}>
      <div className={` ${resetAnimation ? "animate-fade animate-once animate-duration-[700ms] w-full h-full bg-red-600 z-[200] fixed" : "d-none"}`}>
      </div>
      <nav className={` flex py-8 items-center gap-4 mx-auto`}>
        <Image
          src="/logos/pomo-logo-03.jpeg"
          alt="logo"
          width={80}
          height={80}
          className="rounded-full"
        />
        <p className="text-2xl md:text-5xl font-bold">Pomodoro</p>
      </nav>
      <section
        className={`w-fit p-4 flex flex-col gap-8  rounded-xl`}
      >
        <div
          id="states"
          className={`flex  justify-evenly item-center w-full gap-2 md:gap-8 text-lg`}
        >
          <State
            text="Focus"
            onClick={() => forceState(1)}
            customStyling={step === 1 ? "bg-green-600 border-white" : ""}
          />
          <State
            onClick={() => forceState(2)}
            text="Short break"
            customStyling={step === 2 ? "bg-green-600 border-white" : ""}
          />
          <State
            onClick={() => forceState(3)}
            text="Long break"
            customStyling={step === 3 ? "bg-green-600 border-white" : ""}
          />
        </div>
        <p className="text-8xl text-center">{timeDisplay()}</p>
        <div
          id="timer-display"
          className={`flex justify-center item-center w-full gap-8 relative`}
        >
          {isStart &&
            <div className="absolute flex gap-2 top-[0px]">
              <span style={{
                rotate: "-20deg"
              }} className="animate-fade-up animate-infinite animate-duration-[2000ms] w-[4px] h-[20px] bg-green-600 "></span>
              <span className="animate-fade-up animate-infinite animate-duration-[2000ms] w-[4px] h-[22px] bg-green-600 top-[-5px] relative"></span>
              <span style={{
                rotate: "20deg"
              }} className="animate-fade-up animate-infinite animate-duration-[2000ms] w-[4px] h-[20px] bg-green-600"></span>
            </div>
          }
          <button onClick={isStart ? stop : start} className="button bg-red-600 font-bold text-xl w-[100px] h-[100px] rounded-full">
            {isStart ? "Pause" : minutes === 25 ? "Start" : "Continue"}
          </button>
        </div>
        {step !== 0 &&
          <button onClick={reset} className="button m-auto font-bold text-xl w-[100px] h-[100px] rounded-full">
            Reset
          </button>
        }
      </section>

    </main>
  );
}

