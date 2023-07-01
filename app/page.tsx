"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { InputView } from "./components/input-view";
import { useAppStore } from "./app-store";
import { LoadingView } from "./components/loading-view";
import { ResultsView } from "./components/results-view";
import { ErrorView } from "./components/error-view";

export default function Home() {
  const { status, error } = useAppStore();
  return (
    <div className={styles.pageContainer}>
      {status}
      <header className={styles.header}>LOGO</header>
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
  );
}
