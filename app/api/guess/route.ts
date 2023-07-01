import { NextResponse } from "next/server";
import { getCompletion } from "./openai";
import { APIGuessRequestPayload } from "@/app/types";

const onError = (error: Error, statusCode = 500) =>
  NextResponse.json(
    {
      message: error.message,
    },
    {
      status: statusCode,
    }
  );

export const POST = async (request: Request) => {
  const payload: APIGuessRequestPayload | undefined = await request
    .json()
    .catch();
  if (!payload) return onError(new Error("Invalid payload"));

  const { description } = payload;
  if (!description) return onError(new Error("Invalid payload"));
  // if (!(excluded && Array.isArray(excluded)))
  //   return onError(new Error("Invalid payload"));
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json({
    guesses: [
      {
        label: "Joga",
      },
      {
        label: "Human Behaviour",
      },
      {
        label: "Army of Me",
      },
      {
        label: "Hyperballad",
      },
    ],
    reasoning:
      "The clues mention a song by Bjork where she is running through a forest and surrounded by forest creatures. Based on these clues, the song that fits the description is 'Joga'.",
  });

  const guessResponse = await getCompletion(description, []).catch();
  if (!guessResponse)
    return onError(new Error("Null guess response received "));

  return NextResponse.json(guessResponse);
};
