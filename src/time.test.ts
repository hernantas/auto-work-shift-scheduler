import { expect } from "@std/expect";
import { Day } from "./time.ts";

Deno.test("'Day.get' should return the correct day", () => {
  const firstDay = Day.get(0);
  const lastDay = Day.get(6);
  const outsideBeforeDay = Day.get(-4);
  const outsideAfterDay = Day.get(10);

  expect(firstDay.index).toBe(0);
  expect(firstDay.name).toBe(Day.names[0]);
  expect(lastDay.index).toBe(6);
  expect(lastDay.name).toBe(Day.names[6]);
  expect(outsideAfterDay.index).toBe(3);
  expect(outsideAfterDay.name).toBe(Day.names[3]);
  expect(outsideBeforeDay.index).toBe(3);
  expect(outsideBeforeDay.name).toBe(Day.names[3]);
});

Deno.test("'Day.forward' should add the correct day", () => {
  const currentDay = Day.get(0);
  const forwardDay = currentDay.forward(3);
  const forwardCircularDay = currentDay.forward(10);

  expect(Day.get(3).equals(forwardDay)).toBe(true);
  expect(Day.get(3).equals(forwardCircularDay)).toBe(true);
});

Deno.test("'Day.backward' should subtract the correct day", () => {
  const currentDay = Day.get(6);
  const backwardDay = currentDay.backward(3);
  const backwardCircularDay = currentDay.backward(10);

  expect(Day.get(3).equals(backwardDay)).toBe(true);
  expect(Day.get(3).equals(backwardCircularDay)).toBe(true);
});

Deno.test("'Day.before' should compare days correctly", () => {
  const firstDay = Day.get(0);
  const middleDay = Day.get(3);
  const lastDay = Day.get(6);

  expect(firstDay.before(firstDay)).toBe(false);
  expect(firstDay.before(middleDay)).toBe(true);
  expect(firstDay.before(lastDay)).toBe(true);
  expect(middleDay.before(firstDay)).toBe(false);
  expect(middleDay.before(middleDay)).toBe(false);
  expect(middleDay.before(lastDay)).toBe(true);
  expect(lastDay.before(firstDay)).toBe(false);
  expect(lastDay.before(middleDay)).toBe(false);
  expect(lastDay.before(middleDay)).toBe(false);
});

Deno.test("'Day.equals' should compare days correctly", () => {
  const firstDay = Day.get(0);
  const middleDay = Day.get(3);
  const lastDay = Day.get(6);

  expect(firstDay.equals(firstDay)).toBe(true);
  expect(firstDay.equals(middleDay)).toBe(false);
  expect(firstDay.equals(lastDay)).toBe(false);
  expect(middleDay.equals(firstDay)).toBe(false);
  expect(middleDay.equals(middleDay)).toBe(true);
  expect(middleDay.equals(lastDay)).toBe(false);
  expect(lastDay.equals(firstDay)).toBe(false);
  expect(lastDay.equals(middleDay)).toBe(false);
  expect(lastDay.equals(lastDay)).toBe(true);
});

Deno.test("'Day.after' should compare days correctly", () => {
  const firstDay = Day.get(0);
  const middleDay = Day.get(3);
  const lastDay = Day.get(6);

  expect(firstDay.after(firstDay)).toBe(false);
  expect(firstDay.after(middleDay)).toBe(false);
  expect(firstDay.after(lastDay)).toBe(false);
  expect(middleDay.after(firstDay)).toBe(true);
  expect(middleDay.after(middleDay)).toBe(false);
  expect(middleDay.after(lastDay)).toBe(false);
  expect(lastDay.after(firstDay)).toBe(true);
  expect(lastDay.after(middleDay)).toBe(true);
  expect(lastDay.after(lastDay)).toBe(false);
});
