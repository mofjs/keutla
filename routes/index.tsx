import App from "../islands/App.tsx";
import Container from "../components/Container.tsx";
import Header from "../components/Header.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { decrypt, encrypt } from "../utils/crypt.ts";
import {
  ServerGameState,
  toClientGameState,
} from "../utils/game-state.server.ts";
import { ClientGameState } from "../utils/game-state.client.ts";
import { get_random_word } from "../utils/kbbi.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    let sgs: ServerGameState;
    try {
      const cookies = getCookies(req.headers);
      sgs = decrypt<ServerGameState>(cookies["sgs"]);
    } catch (_) {
      sgs = {
        answer: await get_random_word(),
        guesses: [],
        timestamp: Date.now(),
      };
    }
    const result = toClientGameState(sgs);
    const res = await ctx.render(result);
    setCookie(res.headers, { name: "sgs", value: encrypt(sgs), path: "/" });
    return res;
  },
};

export default function Home({ data }: PageProps<ClientGameState>) {
  return (
    <Container>
      <Header />
      <App clientGameState={data} />
    </Container>
  );
}
