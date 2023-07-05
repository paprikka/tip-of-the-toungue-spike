import { APIGuessRequestPayload } from "@/app/types";
import { kv } from "@vercel/kv";
import { OpenAIResponsePayload } from "./openai";

export const saveGuess = (
  request: APIGuessRequestPayload,
  response: OpenAIResponsePayload
) => {
  return kv
    .set(
      `description:${Date.now()}`,
      JSON.stringify({
        request,
        response,
      })
    )
    .catch((error) => console.error(error));
};
