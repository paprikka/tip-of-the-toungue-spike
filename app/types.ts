export type Guess = {
  label: string;
};

export type APIGuessResponsePayload = {
  guesses: Guess[];
};

export type APIGuessRequestPayload = {
  description: string;
};
