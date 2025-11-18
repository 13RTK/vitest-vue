import { expect, test } from "vitest";
import { sum } from "@/utils/sum";

test("expect sum function return correct result", () => {
  // expect(result).matcher
  expect(sum(1, 2)).toBe(3);
});
