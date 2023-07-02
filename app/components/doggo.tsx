import Image from "next/image";
import { useAppStore } from "../app-store";
import styles from "./doggo.module.css";

export const Doggo = () => {
  const { isHappy } = useAppStore();

  return (
    <div className={styles.container}>
      <Image className={styles.top} src={require("./doggo.png")} alt="doggo" />
      <Image
        className={styles.bottom}
        src={require("./doggo.png")}
        alt="doggo"
      />
    </div>
  );
};
