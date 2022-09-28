import { useCallback, useMemo, useState } from "preact/hooks";

export interface ClientGameState {
  length: number;
  guesses: string[];
  hints: (boolean | null)[][];
  answer: string | null;
  isGameOver: boolean;
  isWinning: boolean;
  duration: number;
}

export function useClientGameState(initialState: ClientGameState) {
  const [cgs, setCgs] = useState(initialState);
  const [guessInvalid, setGuessInvalid] = useState(false);

  const onPressChar = (char: string) => {
    setCgs((cgs) => {
      const guesses = [...cgs.guesses];
      const row = cgs.hints.length;
      let guess = guesses[row] ?? "";
      guess += char;
      guess = guess.slice(0, cgs.length);
      guesses[row] !== undefined ? guesses[row] = guess : guesses.push(guess);
      return { ...cgs, guesses };
    });
  };

  const onDelete = () => {
    setCgs((cgs) => {
      const guesses = [...cgs.guesses];
      const row = cgs.hints.length;
      let guess = guesses[row] ?? "";
      guess = guess.slice(0, -1);
      guesses[row] !== undefined ? guesses[row] = guess : guesses.push(guess);
      return { ...cgs, guesses };
    });
  };

  const onEnter = useCallback(async () => {
    const guess = cgs.guesses[cgs.hints.length];
    const res = await fetch("/api/game", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess }),
    });
    if (res.ok) {
      const cgs = await res.json();
      setCgs(cgs);
    } else {
      setGuessInvalid(true);
      setTimeout(() => {
        setGuessInvalid(false);
      }, 600);
    }
  }, [cgs.guesses, cgs.hints]);

  const charHints = useMemo(() => {
    const charHints: { [char: string]: boolean | null } = {};
    cgs.hints.forEach((hint, i) => {
      const guess = cgs.guesses[i].split("");
      hint.forEach((state, j) => {
        if (
          charHints[guess[j]] ||
          (state === null && charHints[guess[j]] === false)
        ) {
          return;
        }
        charHints[guess[j]] = state;
      });
    });
    return charHints;
  }, [cgs.hints]);

  const onRetry = async () => {
    const res = await fetch("/api/game");
    if (res.ok) {
      const cgs = await res.json();
      setCgs(cgs);
    }
  };

  const { length, guesses, hints, isGameOver, isWinning, answer, duration } = cgs;

  return {
    boardProps: {
      length,
      guesses,
      hints,
      guessInvalid: !!guessInvalid,
    },
    keyboardProps: {
      onPressChar,
      onDelete,
      onEnter,
      charHints,
    },
    gameOverProps: {
      isGameOver,
      isWinning,
      answer,
      duration,
      onRetry,
    }
  };
}
