import Tile from "./Tile.tsx";

interface Props {
  length: number;
  answers: string[];
  states: (boolean | null)[][];
}

export default function Board({ length, answers, states }: Props) {
  return (
    <div className="grid grid-rows-6 gap-1.5 w-full" style={{aspectRatio: "1 / 1"}}>
      {Array(6).fill("").map((_, i) => {
        let answer = answers[i] ?? "";
        answer += " ".repeat(length - answer.length);
        const state = states[i] ?? [];
        return (
          <div className="flex flex-row gap-1.5 relative" key={i}>
            {answer.split("").map((char, j) => {
              return <Tile char={char} state={state[j]} key={`${j}-${char}`}/>;
            })}
          </div>
        );
      })}
    </div>
  );
}
