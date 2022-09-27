import { Handlers } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { decrypt, encrypt } from "../../utils/crypt.ts";
import {
  addGuess,
  ServerGameState,
  toClientGameState,
} from "../../utils/game-state.server.ts";
import { get_random_word } from "../../utils/kbbi.ts";

function respondWithGameState(sgs: ServerGameState): Response {
  const result = toClientGameState(sgs);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  setCookie(headers, { name: "sgs", value: encrypt(sgs), path: "/" });
  return new Response(JSON.stringify(result), {
    headers,
  });
}

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const sgs: ServerGameState = {
      answer: await get_random_word(),
      guesses: [],
      timestamp: Date.now(),
    };
    return respondWithGameState(sgs);
  },
  async POST(req, _ctx) {
    try {
      const cookies = getCookies(req.headers);
      const gs = decrypt<ServerGameState>(cookies["sgs"]);
      console.log({ gs });
      const json = await req.json();
      const guess = json.guess;
      await addGuess(gs, guess);
      return respondWithGameState(gs);
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
