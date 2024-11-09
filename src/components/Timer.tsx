import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

interface TimerProps {
  minutes: number;
  seconds: number;
  isBreak: boolean;
  step: number;
  progress: number;
}

export const Timer = ({ minutes, seconds, isBreak, progress }: TimerProps) => {
  const timeDisplay = () => {
    return (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10">
    <div className="w-[200px] h-[200px]">
      <CircularProgressbar
        value={progress}
        text={timeDisplay()}
        styles={buildStyles({
          textColor: "white",
          pathColor: isBreak ? "#76c7c0" : "#ff6b6b",
          trailColor: "#e0e0e0",
        })}
      />
    </div>
   
  </div>
  );
}; 