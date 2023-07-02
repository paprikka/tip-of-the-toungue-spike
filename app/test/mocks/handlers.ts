import { APIGuessRequestPayload, APIGuessResponsePayload } from "@/app/types";
import { rest } from "msw";

export const handlers = [
  rest.post("/api/guess", async (req, res, ctx) => {
    const payload: Partial<APIGuessRequestPayload> = await req.json();

    const makeError = (error: string, status: number) =>
      res(ctx.status(status), ctx.json({ error }));

    const makeResponse = (responsePayload: APIGuessResponsePayload) =>
      res(ctx.status(200), ctx.json(responsePayload));

    if (!payload || typeof payload.description !== "string")
      return makeError("Invalid payload", 400);

    if (!Array.isArray(payload.exclude))
      return makeError("Invalid payload", 400);

    if (payload.exclude.length)
      return makeResponse({
        guesses: payload.exclude.map((label) => ({ label: `NOT: ${label}` })),
      });

    if (payload.description === "a relatable cat")
      return makeResponse({
        guesses: [
          { label: "garfield" },
          { label: "lesser garfield" },
          { label: "ice garfield" },
          { label: "fire garfield" },
        ],
      });

    if (payload.description === "give me an error")
      return makeError("oops", 500);

    return makeResponse({
      guesses: [
        { label: "guess 1" },
        { label: "guess 2" },
        { label: "guess 3" },
        { label: "guess 4" },
      ],
    });
  }),
  rest.all("*", (req, res, ctx) => req.passthrough()),
];
