import { create } from "zustand";
import { APIGuessRequestPayload, APIGuessResponsePayload } from "./types";

export type AppState = {
  description: string;
  canShareDescriptions: boolean;
  exclude: string[];
  lastGuessResponse?: APIGuessResponsePayload;
  error?: string;
  isHappy: boolean;
  status: "idle" | "loading" | "results" | "error";
  setDescription: (description: string) => void;
  setExclude: (guessLabels: string[]) => void;
  setCanShareDescriptions: (canShare: boolean) => void;
  requestGuesses: () => Promise<void>;

  restart: () => void;
  setIsHappy: (isHappy: boolean) => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  description: "",
  canShareDescriptions: true,
  exclude: [],
  lastGuessResponse: undefined,
  error: undefined,
  isHappy: false,
  status: "idle",

  setDescription: (description: string) => set({ description }),
  setExclude: (guessLabels: string[]) =>
    set({ exclude: [...get().exclude, ...guessLabels] }),
  setCanShareDescriptions: (canShareDescriptions: boolean) =>
    set({ canShareDescriptions }),
  requestGuesses: async () => {
    set({ status: "loading", error: undefined });
    try {
      const body: APIGuessRequestPayload = {
        description: get().description,
        exclude: get().exclude,
        canShareDescriptions: get().canShareDescriptions,
      };
      const fetchPromise = fetch("/api/guess", {
        method: "POST",
        body: JSON.stringify(body),
      }).then((res) =>
        res.ok ? res : Promise.reject(new Error(res.statusText))
      );

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
  setIsHappy: (isHappy: boolean) => set({ isHappy }),
}));
