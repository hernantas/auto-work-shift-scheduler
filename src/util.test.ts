import { expect } from "@std/expect";
import { getCircularNumber } from "./util.ts";

Deno.test("'getCircularNumber' within range should return same value", () => {
  const valueMin = getCircularNumber(0, 10);
  const valueRange = getCircularNumber(5, 10);
  const valueMax = getCircularNumber(9, 10);
  expect(valueMin).toBe(0);
  expect(valueRange).toBe(5);
  expect(valueMax).toBe(9);
});

Deno.test(
  "'getCircularNumber' outside minimum range should wrap around",
  () => {
    const value1 = getCircularNumber(-5, 10);
    const value2 = getCircularNumber(-15, 10);
    expect(value1).toBe(5);
    expect(value2).toBe(5);
  },
);

Deno.test(
  "'getCircularNumber' outside maximum range should wrap around",
  () => {
    const value1 = getCircularNumber(15, 10);
    const value2 = getCircularNumber(25, 10);
    expect(value1).toBe(5);
    expect(value2).toBe(5);
  },
);
