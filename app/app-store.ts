import { create } from "zustand";
import { APIGuessResponsePayload } from "./types";

export type AppState = {
  description: string;
  lastGuessResponse?: APIGuessResponsePayload;
  error?: string;
  status: "idle" | "loading" | "results" | "error";
  setDescription: (description: string) => void;
  requestGuesses: () => Promise<void>;

  restart: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  description:
    "a song by Bjork, where she is running through a forest. She's surrounded by forest creatures (bears, etc...)",
  lastGuessResponse: undefined,
  error: undefined,
  status: "idle",

  setDescription: (description: string) => set({ description }),
  requestGuesses: async () => {
    set({ status: "loading", error: undefined });
    try {
      const fetchPromise = fetch("/api/guess", {
        method: "POST",
        body: JSON.stringify({
          description: get().description,
        }),
      });

      const [response] = await Promise.all([
        fetchPromise,
        new Promise((r) => setTimeout(r, 2000)),
      ]);

      const json = (await response.json()) as APIGuessResponsePayload;
      set({ lastGuessResponse: json, status: "results" });
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Unknown error";
      set({ error: message, status: "error" });
    }
  },
  restart: () => {
    set({ status: "idle" });
  },
}));
