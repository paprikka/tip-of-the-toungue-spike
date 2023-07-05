export type Guess = {
  label: string;
};

export type APIErrorResponsePayload = {
  error: string;
};

export type APIGuessResponsePayload = {
  guesses: Guess[];
};

export type APIGuessRequestPayload = {
  description: string;
  exclude: string[];
  canShareDescriptions: boolean;
};
