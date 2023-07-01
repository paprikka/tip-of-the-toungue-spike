import { Text } from "./text";
import styles from "./input-view.module.css";
import { TextArea } from "./textarea";

import { useAppStore } from "../app-store";
import { Button } from "./button";
export const InputView = ({}) => {
  const { description, setDescription, requestGuesses } = useAppStore();
  return (
    <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <h2>
        Arrgh, there’s a phrase on the tip of my tongue, but can’t remember what
        it is... it’s a<span className={styles.dimmed}>(n)</span>:
      </h2>

      <TextArea
        value={description}
        onChange={setDescription}
        placeholder="A movie in which a girl finds an expensive dress for cheap (pink or red) and uses it to fit in with rich people. She struggles to find other expensive clothes and transforms the dress several times to pretend it's different outfits"
      ></TextArea>
      <Button
        disabled={description.length < 10}
        onClick={() => requestGuesses()}
      >
        Guess
      </Button>
    </form>
  );
};
