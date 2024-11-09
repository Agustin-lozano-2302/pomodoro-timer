export default function State({ customStyling, text, onClick }: IState) {
  return (
    <p onClick={onClick} className={`${customStyling} cursor-pointer px-2 rounded-full py-2 text-sm md:text-xl min-w-[105px] min-h-min flex justify-center items-center  h-min text-center font-bold`} >{text}</p>
  )
}


interface IState {
  text: string;
  customStyling: string;
  onClick: () => void;
}