import Image from "next/image";
import styles from "./logo.module.css";
import logoIMG from "./logo.png";
import { useAppStore } from "../app-store";
import c from "classnames";

export const Logo = () => {
  const { status, isHappy } = useAppStore();

  return (
    <div
      className={c({
        [styles.container]: true,
        [styles.isActive]: status === "loading",
        [styles.isHappy]: isHappy,
      })}
    >
      <Image src={logoIMG} alt="logo" />
    </div>
  );
};
