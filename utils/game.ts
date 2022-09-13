import { is_valid_word } from "./kbbi.ts";

export interface GameState {
  answer: string;
  guesses: string[];
}

export interface GameResult {
  length: number;
  guesses: string[];
  hints: (boolean | null)[][];
  isGameOver: boolean;
  isWinngin: boolean;
}

export function getGameResult(gs: GameState): GameResult {
  return {
    length: gs.answer.length,
    guesses: gs.guesses,
    hints: getHints(gs),
    isGameOver: isGameOver(gs),
    isWinngin: isWinning(gs),
  };
}

export async function addGuess(gs: GameState, guess: string) {
  if (isGameOver(gs)) {
    throw "Game is already over.";
  }
  if (gs.guesses.includes(guess)) {
    throw "Word already submitted.";
  }
  if (!await is_valid_word(guess)) {
    throw "Invalid word."
  }
  gs.guesses.push(guess);
}

const getHints = (gs: GameState) => {
  const hints: (boolean | null)[][] = [];
  gs.guesses.forEach((guess) => {
    const answerChars: (string | null)[] = gs.answer.split("");
    const guessChars: (string | null)[] = guess.split("");
    const hint = new Array(gs.answer.length).fill(null);
    for (let i = 0; i < hint.length; i++) {
      if (answerChars[i] === guessChars[i]) {
        answerChars[i] = null;
        guessChars[i] = null;
        hint[i] = true;
      }
    }
    for (let i = 0; i < hint.length; i++) {
      if (guessChars[i] === null) continue;
      const position = answerChars.indexOf(guessChars[i]);
      if (position !== -1) {
        answerChars[position] = null;
        hint[i] = false;
      }
    }
    hints.push(hint);
  });
  return hints;
};

const isWinning = (gs: GameState) => {
  return gs.guesses.includes(gs.answer);
};

const isGameOver = (gs: GameState) => {
  return isWinning(gs) || gs.guesses.length >= 6;
};
