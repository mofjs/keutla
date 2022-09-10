import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const kbbi = await fetch("https://kbbi.vercel.app").then((res) => res.json());
  const words = kbbi.entries
    .map((entry: string) => {
      const [word] = entry.split("/").reverse();
      return word;
    })
    .filter((word: string) =>
      /^[a-z]+$/.test(word) && word.length >= 5 && word.length <= 8
    );
  return new Response(JSON.stringify(words), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
