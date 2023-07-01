"use client";

import styles from "./page.module.css";
import { InputView } from "./components/input-view";
import { useAppStore } from "./app-store";
import { LoadingView } from "./components/loading-view";
import { ResultsView } from "./components/results-view";
import { ErrorView } from "./components/error-view";
import { Logo } from "./components/logo";

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
          Made by 🐐 and <a href="https://sonnet.io">Rafal</a>.
        </footer>
      </div>
    </div>
  );
}
