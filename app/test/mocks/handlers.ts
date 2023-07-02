import { APIGuessRequestPayload, APIGuessResponsePayload } from "@/app/types";
import { rest } from "msw";

export const handlers = [
  rest.post("/api/guess", async (req, res, ctx) => {
    const payload: Partial<APIGuessRequestPayload> = await req.json();

    const makeError = (error: string, status: number) =>
      res(ctx.status(status), ctx.json({ error }));

    if (!payload || typeof payload.description !== "string")
      return makeError("Invalid payload", 400);

    if (payload.description === "a relatable cat")
      return res(
        ctx.status(200),
        ctx.json<APIGuessResponsePayload>({
          guesses: [
            { label: "garfield" },
            { label: "lesser garfield" },
            { label: "ice garfield" },
            { label: "fire garfield" },
          ],
        })
      );

    if (payload.description === "give me an error")
      return makeError("oops", 500);

    const responsePayload: APIGuessResponsePayload = {
      guesses: [
        { label: "guess 1" },
        { label: "guess 2" },
        { label: "guess 3" },
        { label: "guess 4" },
      ],
    };

    return res(ctx.status(200), ctx.json(responsePayload));
  }),
  rest.all("*", (req, res, ctx) => req.passthrough()),
];
