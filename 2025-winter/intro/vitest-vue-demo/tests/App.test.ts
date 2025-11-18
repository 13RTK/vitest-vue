import { expect, test } from "vitest";
import App from "@/App.vue";
import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom/vitest";

test("expect App component to be in the document", () => {
  render(App);

  const headingElement = screen.getByRole("heading");
  const buttonElement = screen.getByRole("button");

  // expect(result).matcher
  expect(headingElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
