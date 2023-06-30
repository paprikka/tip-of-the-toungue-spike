import { NextResponse } from "next/server";

export type GuessResponsePayload = {
  guesses: string[];
  reasoning: string;
};

type OpenAIResponsePayload = GuessResponsePayload;

export type GuessRequestPayload = {
  phrase: string;
  excluded: string[];
};

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const makePrompt = (phrase: string, excluded: string[]) =>
  `
- Guess the word, title, or phrase based on the clues provided below, delimited by ===.
- Guess what is the thing, place, person, idea described using the clues provided.
- Always stick to the clues.
- Base your guess on the specifics of the description, e.g. concrete objects, characters or events mentioned.
- Respond concisely.
${excluded ? `- Exclude the following guesses: ${excluded.join()}` : ""}

===
${phrase}
===
`.trim();

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
  const payload: GuessRequestPayload | undefined = await request.json().catch();
  if (!payload) return onError(new Error("Invalid payload"));

  const { phrase, excluded } = payload;
  if (!phrase) return onError(new Error("Invalid payload"));
  if (!(excluded && Array.isArray(excluded)))
    return onError(new Error("Invalid payload"));

  const chatCompletion = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      temperature: 0.1,
      functions: [
        {
          name: "guess_from_clues",
          description:
            "Guess the word, title, or phrase based on the clues provided",
          parameters: {
            type: "object",
            properties: {
              guesses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              reasoning: {
                type: "string",
              },
            },
            required: ["guesses", "reasoning"],
          },
        },
      ],
      messages: [{ role: "user", content: makePrompt(phrase, excluded) }],
    })
    .catch((error) => {
      console.log(error?.message);
    });

  if (!chatCompletion)
    return onError(new Error("Invalid response from OpenAI"));

  console.dir(chatCompletion.data, { depth: null });
  const promptResponseJSON =
    chatCompletion.data.choices[0]?.message?.function_call?.arguments;

  if (!promptResponseJSON)
    return onError(new Error("Invalid response from OpenAI"));

  let guesses: OpenAIResponsePayload | null = null;
  try {
    guesses = JSON.parse(promptResponseJSON) as OpenAIResponsePayload;
  } catch (error) {
    return onError(new Error("Invalid response from OpenAI"));
  }

  if (!guesses) return onError(new Error("Invalid response from OpenAI"));

  const responsePayload: GuessResponsePayload = guesses;

  return NextResponse.json(responsePayload);
};
