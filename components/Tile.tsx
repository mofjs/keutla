import { tw } from "twind";
import { animation, tw as twCss } from "twind/css";
import { useEffect, useState } from "preact/hooks";

interface Props {
  char: string;
  state?: boolean | null;
  index: number;
}

const flip = animation("0.8s ease 1", {
  "0%, 100%": {
    transform: "rotateX(0)",
  },
  "50%": {
    transform: "rotateX(-90deg)",
  },
});

export default function Tile({ char, state: propsState, index }: Props) {
  const [state, setState] = useState(propsState);
  const [animate, setAnimate] = useState(false);

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

  const flipping = animate ? twCss(flip) : "";

  useEffect(() => {
    if (propsState !== state) {
      setTimeout(() => {
        setAnimate(true);
        setTimeout(() => {
          setState(propsState);
        }, 400);
      }, index * 600);
    }
  }, [propsState]);

  return (
    <button
      className={tw`rounded-sm uppercase text-center text-5xl h-full w-full ${flipping} ${text} ${background} ${border} font-bold flex justify-center items-center select-none`}
      tabIndex={-1}
      disabled
    >
      {char}
    </button>
  );
}
