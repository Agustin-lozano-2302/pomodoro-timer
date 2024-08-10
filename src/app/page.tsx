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
  const [step, setStep] = useState(0); // 0: Initial, 1: Work, 2: Short Break, 3: Long Break
  const [cycleCount, setCycleCount] = useState(0); // Counts completed work-break cycles

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

  const stop = () => {
    console.log("Stopping pomodoro...");
    setIsStart(false);
  };

  const timeDisplay = () => {
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
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
    <main className="flex min-h-screen flex-col items-center px-6">
      <nav className={` flex py-8 items-center gap-4 mx-auto`}>
        <Image
          src="/logos/pomo-logo-03.jpeg"
          alt="logo"
          width={80}
          height={80}
          className="rounded-full"
        />
        <p className="text-[3rem] font-bold">Pomodoro</p>
      </nav>
      <section
        className={`w-fit p-20 flex flex-col border-[1px] border-red-600 rounded-xl`}
      >
        <div
          id="states"
          className={`flex justify-center item-center w-full gap-8 text-lg mb-8`}
        >
          <State
            text="Pomodoro"
            customStyling={step === 1 ? "bg-green-600 border-white" : ""}
          />
          <State
            text="Descanso corto"
            customStyling={step === 2 ? "bg-green-600 border-white" : ""}
          />
          <State
            text="Descanso largo"
            customStyling={step === 3 ? "bg-green-600 border-white" : ""}
          />
        </div>
        <p className="text-8xl text-center">{timeDisplay()}</p>
        <div
          id="timer-display"
          className={`flex justify-center item-center w-full gap-8 p-8 relative`}
        >
          {isStart &&
            <div className="absolute flex gap-2 top-[25px]">
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
            {isStart ? "Pausar" : minutes === 25 ? "Empezar" : "Reanudar"}
          </button>
        </div>
      </section>
    </main>
  );
}

// "use client"
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function Home() {

//   const [minutes, setMinutes] = useState<number>(25)
//   const [seconds, setSeconds] = useState<number>(0)
//   const [displayMessage, setDisplayMessage] = useState<boolean>(false)
//   const [stop, setStop] = useState<boolean>(false)
//   const [start, setStart] = useState<boolean>(false)



//   const formatedSeconds = seconds < 10 ? "0" + seconds : seconds
//   const formatedMinutes = minutes < 10 ? "0" + minutes : minutes



//   const interval = () => {
//     setStart(true)
//   }

//   const pause = () => {
//     if (!stop) {
//       setDisplayMessage(false)
//       setMinutes(minutes)
//       setSeconds(seconds)
//       setStop(true)
//       setStart(false)
//     } else {
//       setStop(false)
//       setStart(true)
//     }
//   }


//   useEffect(() => {
//     if (start) {
//       if (stop) {
//         setDisplayMessage(false)
//         setStop(false)
//         setStart(false)
//         setMinutes(25)
//         setSeconds(0)
//       }

//       let interval = setInterval(() => { 
//         clearInterval(interval)

//         if (seconds === 0) {
//           if (minutes !== 0) {
//             setSeconds(59);
//             setMinutes(minutes - 1)

//           } else {
//             let minutes = displayMessage ? 24 : 4;
//             let seconds = 59;
//             setSeconds(seconds)
//             setMinutes(minutes)
//             setDisplayMessage(!displayMessage)
//           }
//         } else {
//           if (minutes !== 0) {
//             setSeconds(59);
//             setMinutes(minutes - 1)

//           } else {
//             return

//           }
//         }

//       }, 1000)
//     }


//   }, [start, seconds])




//   return (
//     <main className="flex min-h-screen flex-col items-center px-6">
//       <nav
//         className={` w-full flex py-7  items-center gap-4`}
//       >
//         <Image src="/logos/pomo-logo-03.jpeg" alt="logo" width={80} height={80} className=" rounded-full" />
//         <p className="text-[3rem] font-bold">Pomodoro</p>
//       </nav>
//       <section className={`  w-full flex flex-col`}>
//         <div id="states" className={` flex justify-center item-center w-full gap-8 text-lg`}>
//           <p className=" max-w-max text-center">{stop || start ? "Concentrate!" : "Presiona iniciar para comenzar"}</p>
//           {/* <p className=" w-1/4 h-min text-center">Descanso corto</p>
//           <p className=" w-1/4 h-min text-center">Descanso largo</p> */}
//         </div>
//         <p className=" text-8xl text-center">{formatedMinutes + ":" + formatedSeconds}</p>
//         <div id="timer-display" className={` flex justify-center item-center w-full gap-8 p-8`}>
//           {displayMessage && <p className="text-3xl">Break!</p>}
//           <button onClick={interval} className="button">{!stop ? "Iniciar" : "Reiniciar"}</button>
//           <button onClick={pause} className="button">{stop ? "Reanudar" : "Pausar"}</button>
//         </div>
//       </section>
//     </main>
//   );
// }
