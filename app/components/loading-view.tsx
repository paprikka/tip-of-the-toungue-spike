import { FC } from "react";
import { Button } from "./button";
import styles from "./loading-view.module.css";

export const LoadingView: FC = () => {
  return (
    <div className={styles.container}>
      <h2>OK, let me think...</h2>
    </div>
  );
};
