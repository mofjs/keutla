import { Handlers } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { decrypt, encrypt } from "../../utils/crypt.ts";
import { addGuess, GameState, getGameResult } from "../../utils/game.ts";
import { get_random_word } from "../../utils/kbbi.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const gs: GameState = {
      answer: await get_random_word(),
      guesses: [],
    };
    const result = getGameResult(gs);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    setCookie(headers, { name: "gs", value: await encrypt(gs), path: "/" });
    return new Response(JSON.stringify(result), {
      headers,
    });
  },
  async POST(req, _ctx) {
    try {
      const cookies = getCookies(req.headers);
      const gs = await decrypt<GameState>(cookies["gs"]);
      console.log({ gs });
      const json = await req.json();
      const guess = json.guess;
      await addGuess(gs, guess);
      const result = getGameResult(gs);
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      setCookie(headers, { name: "gs", value: await encrypt(gs), path: "/" });
      return new Response(JSON.stringify(result), {
        headers,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  },
};
