import { useMemo, useState } from "preact/hooks";
import Board from "../components/Board.tsx";
import Keyboard from "../components/Keyboard.tsx";
import { GameResult } from "../utils/game.ts";

interface Props {
  gameResult: GameResult;
}

export default function App({ gameResult }: Props) {
  const [gr, setGr] = useState(gameResult);

  const onPressChar = (char: string) => {
    setGr((gr) => {
      const guesses = [...gr.guesses];
      const row = gr.hints.length;
      let guess = guesses[row] ?? "";
      guess += char;
      guess = guess.slice(0, gr.length);
      guesses[row] !== undefined ? guesses[row] = guess : guesses.push(guess);
      return { ...gr, guesses };
    });
  };

  const onDelete = () => {
    setGr((gr) => {
      const guesses = [...gr.guesses];
      const row = gr.hints.length;
      let guess = guesses[row] ?? "";
      guess = guess.slice(0, -1);
      guesses[row] !== undefined ? guesses[row] = guess : guesses.push(guess);
      return { ...gr, guesses };
    });
  };

  const onEnter = async () => {
    const guess = gr.guesses[gr.hints.length];
    const res = await fetch("/api/game", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess }),
    });
    if (res.ok) {
      const gr = await res.json();
      setGr(gr);
    }
  };

  const charHints = useMemo(() => {
    const charHints: { [char: string]: boolean | null } = {};
    gr.hints.forEach((hint, i) => {
      const guess = gr.guesses[i].split("");
      hint.forEach((state, j) => {
        if (!state && charHints[guess[j]]) return;
        charHints[guess[j]] = state;
      });
    });
    return charHints;
  }, [gr.hints]);

  return (
    <div className="h-full min-h-[640px] w-full max-w-lg min-w-[480px] mx-auto px-4 flex flex-col justify-around items-center">
      <Board {...gr}></Board>
      <Keyboard
        onPressChar={onPressChar}
        onDelete={onDelete}
        onEnter={onEnter}
        charHints={charHints}
      />
    </div>
  );
}
