export const get_words = async () => {
  const kbbi: { entries: string[] } = await fetch("https://kbbi.vercel.app")
    .then((res) => res.json());
  return kbbi.entries
    .map((entry: string) => {
      const [word] = entry.split("/").reverse();
      return word;
    })
    .filter((word: string) =>
      /^[a-z]+$/.test(word) && word.length >= 5 && word.length <= 8
    );
};

export const get_random_word = async () => {
  const words = await get_words();
  return words[Math.floor(Math.random() * words.length)];
};

export const is_valid_word = async (word: string) => {
  const words = await get_words();
  return words.includes(word);
};
