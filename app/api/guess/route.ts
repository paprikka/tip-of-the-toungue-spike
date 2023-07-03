import { NextResponse } from "next/server";
import { getCompletion } from "./openai";
import { APIErrorResponsePayload, APIGuessRequestPayload } from "@/app/types";

const onError = (error: Error, statusCode = 500) =>
  NextResponse.json<APIErrorResponsePayload>(
    {
      error: error.message,
    },
    {
      status: statusCode,
    }
  );

export const POST = async (request: Request) => {
  const payload: APIGuessRequestPayload | undefined = await request
    .json()
    .catch();

  console.log({ payload });

  if (!payload) return onError(new Error("Invalid payload"));

  const { description, exclude } = payload;
  if (!description) return onError(new Error("Invalid payload"));
  if (!(exclude && Array.isArray(exclude)))
    return onError(new Error("Invalid payload"));

  const guessResponse = await getCompletion(description, exclude).catch();
  if (!guessResponse)
    return onError(new Error("Null guess response received "));

  console.log({ guessResponse, requestPayload: payload });
  return NextResponse.json(guessResponse);
};
