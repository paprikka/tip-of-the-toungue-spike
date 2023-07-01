import { FC } from "react";
import styles from "./textarea.module.css";

export const TextArea: FC<{
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}> = ({ onChange, value, placeholder }) => (
  <textarea
    className={styles.container}
    value={value}
    onChange={(e) => {
      onChange(e.target.value);
    }}
    placeholder={placeholder}
  />
);
