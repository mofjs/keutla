import { useMemo } from "preact/hooks";

interface Props {
  isGameOver: boolean;
  isWinning: boolean;
  answer: string | null;
  duration: number;
  onRetry: () => void;
}

export default function GameOver(
  { isGameOver, isWinning, answer, duration, onRetry }: Props,
) {
  const waktu = useMemo(() => {
    let ms = duration;
    const d = Math.floor(ms / (1000 * 60 * 60 * 24));
    ms %= 1000 * 60 * 60 * 24;
    const h = Math.floor(ms / (1000 * 60 * 60));
    ms %= 1000 * 60 * 60;
    const m = Math.floor(ms / (1000 * 60));
    ms %= 1000 * 60;
    const s = Math.floor(ms / 1000);
    return [
      d && `${d} hari`,
      h && `${h} jam`,
      m && `${m} menit`,
      s && `${s} detik`,
    ].filter(Boolean).join(", ");
  }, [duration]);

  if (!isGameOver) return null;
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end sm:items-center justify-center text-center p-4 sm:p-0">
            <div className="relative rounded-md shadow-md bg-white dark:bg-gray-900 p-12">
              <p className="text-gray-900 dark:text-white text-4xl mb-4">
                {isWinning ? "Anda Menang!" : "Anda gagal!"}
              </p>
              <p className="text-gray-900 dark:text-white text-lg mb-4">
                {isWinning
                  ? "Tebakan anda benar."
                  : "Kesempatan menebak sudah habis."}
              </p>
              <p className="text-gray-900 dark:text-white text-lg mb-4">
                {"Kunci Jawaban: "}
                <span className="text-gray-900 dark:text-white text-lg font-bold text-uppercase">
                  {answer}
                </span>
              </p>
              <p className="text-gray-900 dark:text-white text-lg mb-4">
                {`Waktu: ${waktu}.`}
              </p>
              <button
                className="rounded-md bg-indigo-500 p-2 text-white text-lg"
                onClick={onRetry}
              >
                Coba lagi!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
