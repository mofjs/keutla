import { tw } from "twind";

interface Props {
  char: string;
  state?: boolean | null;
}

export default function Tile({ char, state }: Props) {
  const text = state === undefined
    ? tw`text-gray-700 dark:text-white`
    : tw`text-white dark:text-gray-200`;
  const background = state === true
    ? tw`bg-green-500`
    : state === false
    ? tw`bg-yellow-500`
    : state === null
    ? tw`bg-gray-500 dark:bg-gray-700`
    : "";
  const border = char === " "
    ? tw`border border-gray-400 dark:border-gray-700`
    : state === undefined
    ? tw`border-2 border-gray-500`
    : "";

  return (
    <button
      className={tw`rounded-sm uppercase text-center text-5xl h-full w-full ${text} ${background} ${border} font-bold flex justify-center items-center select-none`}
      tabIndex={-1}
    >
      {char}
    </button>
  );
}
