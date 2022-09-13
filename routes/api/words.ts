import { HandlerContext } from "$fresh/server.ts";
import { get_words } from "../../utils/kbbi.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const words = await get_words();
  return new Response(JSON.stringify(words), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
