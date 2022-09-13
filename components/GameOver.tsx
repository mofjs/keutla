interface Props {
  isWinning: boolean;
  onRetry: () => void;
}

export default function GameOver({ isWinning, onRetry }: Props) {
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end sm:items-center justify-center text-center p-4 sm:p-0">
            <div className="relative rounded-md shadow-md bg-white dark:bg-gray-900 p-4">
              <p className="text-gray-900 dark:text-white text-4xl mb-4">
                {isWinning ? "Anda Menang." : "Anda gagal."}
              </p>
              <p className="text-gray-900 dark:text-white text-lg mb-4">
                {isWinning
                  ? "Tebakan anda benar!"
                  : "Kesempatan menebak sudah habis."}
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
