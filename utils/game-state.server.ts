import { ClientGameState } from "./game-state.client.ts";
import { is_valid_word } from "./kbbi.ts";

export interface ServerGameState {
  answer: string;
  guesses: string[];
  timestamp: number;
}

export function toClientGameState(gs: ServerGameState): ClientGameState {
  return {
    answer: isGameOver(gs) ? gs.answer : null,
    length: gs.answer.length,
    guesses: gs.guesses,
    hints: getHints(gs),
    isGameOver: isGameOver(gs),
    isWinning: isWinning(gs),
    duration: Date.now() - gs.timestamp,
  };
}

export async function addGuess(gs: ServerGameState, guess: string) {
  if (isGameOver(gs)) {
    throw "Game is already over.";
  }
  if (gs.guesses.includes(guess)) {
    throw "Word already submitted.";
  }
  if (!await is_valid_word(guess)) {
    throw "Invalid word.";
  }
  gs.guesses.push(guess);
}

const getHints = (gs: ServerGameState) => {
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

const isWinning = (gs: ServerGameState) => {
  return gs.guesses.includes(gs.answer);
};

const isGameOver = (gs: ServerGameState) => {
  return isWinning(gs) || gs.guesses.length >= 6;
};
