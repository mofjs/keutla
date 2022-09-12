import { useState } from "preact/hooks";
import Board from "../components/Board.tsx";
import Keyboard from "../components/Keyboard.tsx";

export default function App() {
  const length = 6;
  const [guesses, setGuesses] = useState<string[]>([]);
  const [hints, setHints] = useState<(boolean | null)[][]>([]);

  const onPressChar = (char: string) => {
    setGuesses((prev_guesses) => {
      const guesses = [...prev_guesses];
      const row = hints.length;
      let guess = guesses[row] ?? "";
      guess += char;
      guess = guess.slice(0, length);
      guesses[row] !== undefined ? guesses[row] = guess : guesses.push(guess);
      return guesses;
    });
  };

  const onDelete = () => {
    setGuesses((prev_guesses) => {
      const guesses = [...prev_guesses];
      const row = hints.length;
      let guess = guesses[row] ?? "";
      guess = guess.slice(0, -1);
      guesses[row] !== undefined ? guesses[row] = guess : guesses.push(guess);
      return guesses;
    });
  };

  return (
    <div className="h-full min-h-[640px] w-full max-w-lg min-w-[480px] mx-auto px-4 flex flex-col justify-around items-center">
      <Board length={6} answers={guesses} states={hints}></Board>
      <Keyboard
        onPressChar={onPressChar}
        onDelete={onDelete}
        onEnter={() => {}}
        states={{}}
      />
    </div>
  );
}
