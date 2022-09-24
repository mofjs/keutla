import { dirname, fromFileUrl, join } from "$std/path/mod.ts";

const WORDS_FILE = join(
  dirname(fromFileUrl(import.meta.url)),
  "../static/words.json",
);

export const generate_words = async () => {
  const kbbi: { entries: string[] } = await fetch("https://kbbi.vercel.app")
    .then((res) => res.json());
  const words: string[] = kbbi.entries
    .map((entry: string) => {
      const [word] = entry.split("/").reverse();
      return word;
    })
    .filter((word: string) =>
      /^[a-z]+$/.test(word) && word.length >= 5 && word.length <= 8
    );
  await Deno.writeTextFile(WORDS_FILE, JSON.stringify(words));
  console.log("%cWords file generated.", "color: blue; font-weight: bold");
};

export const get_words = async () => {
  const words: string[] = JSON.parse(await Deno.readTextFile(WORDS_FILE));
  return words;
};

export const get_random_word = async () => {
  const words = await get_words();
  return words[Math.floor(Math.random() * words.length)];
};

export const is_valid_word = async (word: string) => {
  const words = await get_words();
  return words.includes(word);
};
