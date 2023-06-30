"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { GuessResponsePayload } from "./api/guess/route";

const makeUnique = (arr: string[]) => Array.from(new Set(arr));
export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [excluded, setExcluded] = useState<string[]>([]);

  const guess = (phrase: string, excluded: string[]) => {
    setStatus("loading");
    fetch("/api/guess", {
      method: "POST",
      body: JSON.stringify({ phrase, excluded }),
    })
      .then((_) => (_.ok ? _.json() : Promise.reject()))
      .then((result: GuessResponsePayload) => {
        setGuesses(makeUnique([...result.guesses, ...guesses]));
        setStatus("idle");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExcluded([]);
    guess(phrase, excluded);
  };

  const [phrase, setPhrase] = useState<string>(
    "A movie in which a girl finds an expensive dress for cheap (pink or red) and uses it to fit in with rich people. She struggles to find other expensive clothes and transforms the dress several times to pretend it's different outfits"
  );

  return (
    <main className={styles.main}>
      <h1>Tip of the tongue</h1>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <p>Argghh... I have a phrase on the tip of my tongue. It's a(n):</p>
        <p>
          <textarea
            value={phrase}
            onChange={(e) => {
              setPhrase(e.target.value);
            }}
          />
        </p>
        <button>Figure it out!</button>
        {status === "loading" ? <span> loading...</span> : null}
      </form>

      {guesses.length ? (
        <div className={styles.response}>
          <div className={styles.responseContent}>
            {guesses ? (
              <ul>
                {guesses.map((guess) => (
                  <li
                    className={
                      excluded.includes(guess) ? styles.resultExcluded : ""
                    }
                    key={guess}
                  >
                    {guess}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className={styles.responseActions}>
              <button onClick={() => setGuesses([])}>Yes, that's it!</button>
              <button
                onClick={() => {
                  const newExcluded = [...excluded, ...guesses];
                  setExcluded(newExcluded);
                  guess(phrase, newExcluded);
                }}
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "loading..."
                  : "No, that's not it... give me more"}
              </button>
              <button onClick={() => setGuesses([])}>
                Nope, let me rephrase
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
