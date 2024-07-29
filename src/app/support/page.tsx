"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
export default function () {
  // Estados de los minutos y segundos, no tienen un valor inicial, mas que 0, el valor se cambiara con useEffect y funciones
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)


  useEffect(() => {
    setMinutes(25)
    setSeconds(0)
  }, [])


  return (
    <h1>Tiempo: {minutes} : {seconds}</h1>
  )
}


// export default function Support() {

//   const [minutes, setMinutes] = useState<number>(0)
//   const [seconds, setSeconds] = useState<number>(5)
//   const [displayMessage, setDisplayMessage] = useState<boolean>(false)

//   const br1 = "border-[1px] border-red-500"
//   const bg1 = "border-[1px] border-green-500"


//   const formatedSeconds = seconds < 10 ? "0" + seconds : seconds
//   const formatedMinutes = minutes < 10 ? "0" + minutes : minutes


//   const pouse = () => {
//     setDisplayMessage(false)

//   }


//   useEffect(() => {
//     let interval = setInterval(() => {
//       clearInterval(interval)

//       if (seconds === 0) {
//         if (minutes !== 0) {
//           setSeconds(59);
//           setMinutes(minutes - 1)
//         } else {
//           let minutes = displayMessage ? 24 : 4;
//           let seconds = 59;
//           setSeconds(seconds)
//           setMinutes(minutes)
//           setDisplayMessage(!displayMessage)
//         }
//       } else {
//         setSeconds(seconds - 1)
//       }

//     }, 1000)
//   }, [seconds])


//   return (
//     <main className="flex min-h-screen flex-col items-center px-24">
//       <nav
//         className={`${br1} w-full flex py-7`}
//       >
//         <p className="m-auto text-3xl">Pomodoro timer</p>
//       </nav>
//       <section className={` ${br1} w-full flex py-7 flex-col`}>
//         <div id="states" className={` ${bg1} flex justify-center item-center w-full gap-8 text-lg`}>
//           <p>Pomodoro</p>
//           <p>Descanso corto</p>
//           <p>Descanso largo</p>
//         </div>
//         <div id="timer-display" className={`${bg1} flex flex-col justify-center item-center w-full gap-8 p-8`}>
//           {displayMessage && <p className="text-3xl">Break!</p>}
//           <p className=" text-8xl text-center">{formatedMinutes + ":" + formatedSeconds}</p>
//           <button onClick={() => { }} className="button">Iniciar</button>
//           <button onClick={pouse} className="button">Pausar</button>
//         </div>
//       </section>
//     </main>
//   );
// }
