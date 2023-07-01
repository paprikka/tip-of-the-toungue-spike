import { FC } from "react";
import styles from "./button.module.css";
import c from "classnames";
export const Button: FC<{
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;

  level?: "primary" | "negative";
}> = ({ onClick, children, disabled, level = "primary" }) => (
  <button
    disabled={disabled}
    className={c({
      [styles.container]: true,
      [styles[`level-${level}`]]: true,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);
