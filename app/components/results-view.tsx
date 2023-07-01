import { FC } from "react";
import { useAppStore } from "../app-store";
import { Guess } from "../types";
import { Button } from "./button";
import styles from "./results-view.module.css";

export const ResultsView: FC = () => {
  const { lastGuessResponse, requestGuesses, restart } = useAppStore();

  const handleRetryClick = () => requestGuesses();
  const handleBackClick = () => restart();

  const renderGuesses = (guesses: Guess[]) =>
    guesses.map((guess, index) => <li key={guess.label}>{guess.label}</li>);

  return (
    <div className={styles.container}>
      <h2>Does any of those ring a bell?</h2>

      {lastGuessResponse?.guesses ? (
        <ul className={styles.guesses}>
          {renderGuesses(lastGuessResponse.guesses)}
        </ul>
      ) : null}

      <div className={styles.actions}>
        <Button level="negative" onClick={handleRetryClick}>
          Nope, guess again
        </Button>
        <Button level="negative" onClick={handleBackClick}>
          Nope, let me rephrase
        </Button>
      </div>
    </div>
  );
};
