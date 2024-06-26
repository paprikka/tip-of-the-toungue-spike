import { FC } from "react";
import { useAppStore } from "../app-store";
import { Guess } from "../types";
import { Button } from "./button";
import styles from "./results-view.module.css";

export const ResultsView: FC = () => {
  const { lastGuessResponse, requestGuesses, restart, setExclude, setIsHappy } =
    useAppStore();

  const handleRetryClick = () => {
    setExclude(lastGuessResponse?.guesses.map((guess) => guess.label) || []);
    requestGuesses();
  };
  const handleBackClick = () => restart();

  const handleFoundClick = async () => {
    setIsHappy(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsHappy(false);
    // location.reload();
  };

  const renderGuesses = (guesses: Guess[]) =>
    guesses.map((guess) => (
      <li key={guess.label}>
        {guess.label}{" "}
        <a
          href={`https://duckduckgo.com/?va=v&t=ha&q=${encodeURIComponent(
            guess.label
          )}&ia=web`}
        >
          🔎
        </a>
      </li>
    ));

  return (
    <div className={styles.container}>
      <h2>Does any of those ring a bell?</h2>
      {lastGuessResponse?.guesses ? (
        <ul className={styles.guesses}>
          {renderGuesses(lastGuessResponse.guesses)}
        </ul>
      ) : null}

      <div className={styles.actions}>
        <Button onClick={handleFoundClick}>Yes!</Button>
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
