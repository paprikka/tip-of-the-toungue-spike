import { Guess } from "@/app/types";
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
${
  excluded
    ? `
- You must exclude the following guesses: ${excluded.join()}
- never include the excluded guesses in your response.
`.trim()
    : ""
}

===
${phrase}
===
`.trim();

type OpenAIResponsePayload = {
  guesses: Guess[];
};

export const getCompletion = async (
  description: string,
  excluded: string[] = []
) => {
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
                  type: "object",
                  properties: {
                    label: {
                      type: "string",
                    },
                  },
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
      messages: [{ role: "user", content: makePrompt(description, excluded) }],
    })
    .catch((error) => {
      console.log(error?.message);
    });

  if (!chatCompletion)
    return Promise.reject(new Error("Invalid response from OpenAI"));

  console.dir(chatCompletion.data, { depth: null });

  const promptResponseJSON =
    chatCompletion.data.choices[0]?.message?.function_call?.arguments;

  if (!promptResponseJSON)
    return Promise.reject(new Error("Invalid response from OpenAI"));

  let guesses: OpenAIResponsePayload | null = null;
  try {
    guesses = JSON.parse(promptResponseJSON) as OpenAIResponsePayload;
  } catch (error) {
    return Promise.reject(new Error("Invalid response from OpenAI"));
  }

  return guesses;
};
