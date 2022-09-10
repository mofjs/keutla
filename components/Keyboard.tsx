import KeyButton from "./KeyButton.tsx";

interface Props {
  onPressChar: (char: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  states: { [char: string]: boolean | null };
}

export default function Keyboard(
  { onPressChar, onDelete, onEnter, states }: Props,
) {
  return (
    <div className="w-full flex flex-col space-y-3 py-4 relative z-auto">
      <div className="flex space-x-2">
        {"qwertyuiop".split("").map((char) => (
          <KeyButton
            key={char}
            state={states[char]}
            onClick={() => onPressChar(char)}
          >
            {char}
          </KeyButton>
        ))}
      </div>
      <div className="flex space-x-2">
        <div className="flex-[1/2]" />
        {"asdfghjkl".split("").map((char) => (
          <KeyButton
            key={char}
            state={states[char]}
            onClick={() => onPressChar(char)}
          >
            {char}
          </KeyButton>
        ))}
        <div className="flex-[1/2]" />
      </div>
      <div className="flex space-x-2">
        <KeyButton onClick={onEnter}>{" Enter "}</KeyButton>
        {"zxcvbnm".split("").map((char) => (
          <KeyButton
            key={char}
            state={states[char]}
            onClick={() => onPressChar(char)}
          >
            {char}
          </KeyButton>
        ))}
        <KeyButton onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="currentColor"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            >
            </path>
          </svg>
        </KeyButton>
      </div>
    </div>
  );
}
