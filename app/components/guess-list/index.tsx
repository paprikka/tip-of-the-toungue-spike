import { FC } from "react";
import styles from "./index.module.css";

export const GuessList: FC<{ guesses: string[]; excluded: string[] }> = ({
  excluded,
  guesses,
}) => {
  return (
    <ul className={styles.container}>
      {guesses.map((guess) => (
        <li
          className={excluded.includes(guess) ? styles.isExcluded : ""}
          key={guess}
        >
          <span>{guess}</span>
        </li>
      ))}
    </ul>
  );
};
