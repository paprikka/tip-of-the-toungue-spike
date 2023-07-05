import {
  getByRole,
  render,
  cleanup,
  fireEvent,
  findByText,
  getByLabelText,
  getByText,
} from "@testing-library/react";
import Home from "./page";

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  cleanup();
  jest.clearAllTimers();
});

it("should render the page", () => {
  const { container } = render(<Home />);

  // 1. use getByText to find an element with text starting with 'Arrgh'. The element contains children  so dont match using a string

  expect(getByRole(container, "main").textContent).toMatchInlineSnapshot(`"Arrgh, there’s a phrase on the tip of my tongue, but can’t remember what it is... it’s a(n): Let Rafal read this to learnGuess"`

);
});

it("should guess the phrase", async () => {
  const { container } = render(<Home />);

  // 1. type 'a relatable cat' into the textarea
  // 2. click the button
  // 3. assert that the loading screen is displayed with the text 'OK, let me think...'
  // 4. push the timer forward by 3 seconds
  // 5. assert that the results screen is displayed with the text 'garfield'

  const submitButton = getByRole(container, "button");

  expect(submitButton).toBeDisabled();

  fireEvent.change(getByRole(container, "textbox"), {
    target: { value: "a relatable cat" },
  });

  expect(submitButton).toBeEnabled();

  fireEvent.click(submitButton);

  await findByText(container, "OK, let me think...");

  jest.advanceTimersByTime(3000);
  await findByText(container, "Does any of those ring a bell?");

  expect(getByRole(container, "list").textContent).toMatchInlineSnapshot(
    `"garfield 🔎lesser garfield 🔎ice garfield 🔎fire garfield 🔎"`
  );

  const tryAgainButton = getByText(container, "Nope, guess again");

  fireEvent.click(tryAgainButton);

  await findByText(container, "OK, let me think...");
  jest.advanceTimersByTime(3000);

  await findByText(container, "Does any of those ring a bell?");

  expect(getByRole(container, "list").textContent).toMatchInlineSnapshot(
    `"NOT: garfield 🔎NOT: lesser garfield 🔎NOT: ice garfield 🔎NOT: fire garfield 🔎"`
  );
});
