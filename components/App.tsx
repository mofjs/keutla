import Board from "./Board.tsx";
import Keyboard from "./Keyboard.tsx";

export default function App() {
  return (
    <div className="h-full min-h-[640px] w-full max-w-lg min-w-[480px] mx-auto px-4 flex flex-col justify-around items-center">
      <Board length={6} answers={[]} states={[]}></Board>
      <Keyboard
        onPressChar={() => {}}
        onDelete={() => {}}
        onEnter={() => {}}
        states={{}}
      />
    </div>
  );
}
