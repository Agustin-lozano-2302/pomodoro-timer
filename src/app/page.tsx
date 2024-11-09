"use client";
import { StateButtons } from "app/components/sections/statesButtons";
import State from "app/components/state";
import { Timer } from "app/components/Timer";
import { usePomodoro } from "app/hooks/usePomodoro";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface IPomo {
  seconds: number;
  minutes: number;
}

export default function Home() {
  
const {
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
} = usePomodoro()

  const progress = (minutes * 60 + seconds) / (step === 1 ? 25 * 60 : step === 2 ? 5 * 60 : 15 * 60) * 100;



  return (
    <main className="flex min-h-screen flex-col items-center px-6 bg-gray-800  text-gray-100 relative gap-8">
    <nav className="flex py-8 items-center gap-4 mx-auto">
      <p className="text-2xl md:text-5xl font-bold">PomoProto</p>
    </nav>
      <div className="flex flex-col justify-center items-center gap-10">
        <Timer minutes={minutes} seconds={seconds} isBreak={isBreak} step={step} progress={progress} />
        <StateButtons step={step} isStart={isStart} forceState={forceState} />
      </div>
      <div className="flex gap-10 justify-center">
      <div
          id="timer-display"
          className="flex justify-center item-center gap-2 relative"
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
        {step !== 0 && isStart &&
          <button onClick={reset} className="button font-bold text-xl w-[100px] h-[100px] rounded-full">
            Reset
          </button>
        }
        
      </div>
      <div className="text-center mt-4">
        <p className="text-lg font-semibold text-gray-300">
          Ciclos completados: {cycleCount}
        </p>
      </div>
  </main>
  );
}
