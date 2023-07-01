import styles from "./error-view.module.css";
import { FC } from "react";
import { useAppStore } from "../app-store";
import { Button } from "./button";

export const ErrorView: FC = () => {
  const { error } = useAppStore();

  return (
    <div className={styles.container}>
      <h2>Something's wrong :(</h2>
      <Button onClick={() => window.location.reload()}>Try again</Button>
      <details>
        <summary>Details</summary>
        <pre>{error}</pre>
      </details>
    </div>
  );
};
