"use client";

import { useAppStore } from "./app-store";
import { ErrorView } from "./components/error-view";
import { InputView } from "./components/input-view";
import { LoadingView } from "./components/loading-view";
import { Logo } from "./components/logo";
import { ResultsView } from "./components/results-view";
import styles from "./page.module.css";

// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./test/mocks/browser");
//   worker.start();
// }

export default function Home() {
  const { status } = useAppStore();
  return (
    <div className={styles.viewportContainer}>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <Logo />
        </header>
        <main className={styles.main}>
          {status === "idle" ? <InputView /> : null}
          {status === "loading" ? <LoadingView /> : null}
          {status === "results" ? <ResultsView /> : null}
          {status === "error" ? <ErrorView /> : null}
        </main>
        <footer className={styles.footer}>
          Made by 🐐 and{" "}
          <a href="https://sonnet.io" target="_blank">
            Rafal
          </a>
          .
        </footer>
      </div>
    </div>
  );
}
