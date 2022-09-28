import { tw } from "twind";
import { animation, tw as twCss } from "twind/css";
import Tile from "./Tile.tsx";

interface Props {
  length: number;
  guesses: string[];
  hints: (boolean | null)[][];
  guessInvalid: boolean;
}

const shake = animation("0.6s ease 1", {
  "10%, 90%": {
    transform: "translateX(-1px)",
  },
  "20%, 80%": {
    transform: "translateX(2px)",
  },
  "30%, 50%, 70%": {
    transform: "translateX(-4px)",
  },
  "40%, 60%": {
    transform: "translateX(4px)",
  },
});

export default function Board({ length, guesses, hints, guessInvalid }: Props) {
  const activeRow = hints.length;
  return (
    <div
      className="grid grid-rows-6 gap-1.5 w-full"
      style={{ aspectRatio: "1 / 1" }}
    >
      {Array(6).fill("").map((_, i) => {
        let answer = guesses[i] ?? "";
        answer += " ".repeat(length - answer.length);
        const state = hints[i] ?? [];
        const shaking = activeRow === i && guessInvalid ? twCss(shake) : "";
        return (
          <div
            className={tw`flex flex-row gap-1.5 relative ${shaking}`}
            key={i}
          >
            {answer.split("").map((char, j) => {
              return (
                <Tile
                  char={char}
                  state={state[j]}
                  index={j}
                  key={`${j}-${char}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
