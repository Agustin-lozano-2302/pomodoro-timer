export default function State({ customStyling, text }: IState) {
  return (
    <p className={`${customStyling} border-[1px] border-green-500 p-2 rounded-sm  h-min text-center font-bold`} >{text}</p>

  )
}


interface IState {
  text: string;
  customStyling: string;
}