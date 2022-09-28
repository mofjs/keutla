import Board from "../components/Board.tsx";
import GameOver from "../components/GameOver.tsx";
import Keyboard from "../components/Keyboard.tsx";
import {
  ClientGameState,
  useClientGameState,
} from "../utils/game-state.client.ts";

interface Props {
  clientGameState: ClientGameState;
}

export default function App({ clientGameState }: Props) {
  const { boardProps, keyboardProps, gameOverProps } =
    useClientGameState(clientGameState);

  return (
    <div className="h-full min-h-[640px] w-full max-w-lg min-w-[360px] mx-auto px-4 flex flex-col justify-around items-center">
      <Board {...boardProps} />
      <Keyboard
        {...keyboardProps}
      />
      <GameOver {...gameOverProps} />
    </div>
  );
}
