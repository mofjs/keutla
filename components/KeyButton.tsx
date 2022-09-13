import { tw } from "twind";
import { ComponentChildren } from "preact";

interface Props {
  state?: boolean | null;
  onClick: () => void;
  children: ComponentChildren;
}

export default function KeyButton({ state, onClick, children }: Props) {
  const color = state === true
    ? tw`bg-green-500`
    : state === false
    ? tw`bg-yellow-500`
    : state === null
    ? tw`bg-gray-800`
    : tw`bg-gray-300 dark:bg-gray-500`;
  const text = state === null
    ? tw`text-white dark:text-gray-200`
    : state === undefined
    ? tw`text-gray-900 dark:text-gray-200`
    : tw`text-white`;
  return <button
    className={tw`min-h-[36px] sm:min-h-[48px] flex-1 rounded-md uppercase font-semibold text-sm flex items-center justify-center ${color} ${text} select-none px-1 sm:px-3`}
    onClick={onClick}
  >
    {children}
  </button>;
}
