import App from "../islands/App.tsx";
import Container from "../components/Container.tsx";
import Header from "../components/Header.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { decrypt, encrypt } from "../utils/crypt.ts";
import { GameResult, GameState, getGameResult } from "../utils/game.ts";
import { get_random_word } from "../utils/kbbi.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    let gs: GameState;
    try {
      const cookies = getCookies(req.headers);
      gs = await decrypt<GameState>(cookies["gs"]);
    } catch (_) {
      gs = {
        answer: await get_random_word(),
        guesses: [],
      };
    }
    const result = getGameResult(gs);
    const res = await ctx.render(result);
    setCookie(res.headers, { name: "gs", value: await encrypt(gs), path: "/" });
    return res;
  },
};

export default function Home({ data }: PageProps<GameResult>) {
  return (
    <Container>
      <Header />
      <App gameResult={data} />
    </Container>
  );
}
