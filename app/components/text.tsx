import React, { FC } from "react";
import c from "classnames";
import styles from "./text.module.css";
export const Text: FC<{
  children: React.ReactNode;
  size?: "hero" | "xxxl" | "xxl" | "xl" | "l" | "m" | "s" | "xs" | "xxs";
  weight?: "normal" | "medium" | "bold";
  dimmed?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}> = ({
  children,
  size = "m",
  weight = "normal",
  dimmed = false,
  as = "span",
}) => {
  const Cmp = as;
  return (
    <Cmp
      className={c({
        [styles.container]: true,
        [styles[`size-${size}`]]: true,
        [styles[`weight-${weight}`]]: true,
        [styles.dimmed]: dimmed,
      })}
    >
      {children}
    </Cmp>
  );
};
