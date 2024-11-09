// app/components/StateButtons.tsx
import State from "app/components/state";

interface StateButtonsProps {
  step: number;
  isStart: boolean;
  forceState: (state: number) => void;
}

export function StateButtons({ step, isStart, forceState }: StateButtonsProps) {
  return (
    <div id="states" className="flex justify-evenly items-center gap-4 text-lg">
      <State
        text="Focus"
        onClick={() => forceState(1)}
        customStyling={step === 1 && isStart ? "bg-green-600 border-gray-100" : ""}
      />
      <State
        text="Short break"
        onClick={() => forceState(2)}
        customStyling={step === 2 ? "bg-green-600 border-gray-100" : ""}
      />
      <State
        text="Long break"
        onClick={() => forceState(3)}
        customStyling={step === 3 ? "bg-green-600 border-gray-100" : ""}
      />
    </div>
  );
}
