import { expect } from "@std/expect";
import { getCircularNumber, MapSet, zeroPad } from "./util.ts";

Deno.test("`getCircularNumber` within range should return same value", () => {
  const valueMin = getCircularNumber(0, 10);
  const valueRange = getCircularNumber(5, 10);
  const valueMax = getCircularNumber(9, 10);
  expect(valueMin).toBe(0);
  expect(valueRange).toBe(5);
  expect(valueMax).toBe(9);
});

Deno.test(
  "`getCircularNumber` outside minimum range should wrap around",
  () => {
    const value1 = getCircularNumber(-5, 10);
    const value2 = getCircularNumber(-15, 10);
    expect(value1).toBe(5);
    expect(value2).toBe(5);
  },
);

Deno.test(
  "`getCircularNumber` outside maximum range should wrap around",
  () => {
    const value1 = getCircularNumber(15, 10);
    const value2 = getCircularNumber(25, 10);
    expect(value1).toBe(5);
    expect(value2).toBe(5);
  },
);

Deno.test(
  "`zeroPad` should not modify output value if length is not set",
  () => {
    const value = zeroPad(123);
    expect(value).toBe("123");
  },
);

Deno.test(
  "`zeroPad` should not modify output value if length is less than value length",
  () => {
    const value = zeroPad(123, 2);
    expect(value).toBe("123");
  },
);

Deno.test(
  "`zeroPad` should pad zero to the output value if length is more than value length",
  () => {
    const value = zeroPad(123, 5);
    expect(value).toBe("00123");
  },
);

Deno.test("`MapSet` should return empty sets when given unknown key", () => {
  const ms = new MapSet<string, string>();
  const sets = ms.get("key");
  expect(sets).not.toBe(undefined);
  expect(sets.size).toBe(0);
});

Deno.test("`MapSet` should return existing set when collection already exists", () => {
  const ms = new MapSet<string, string>();
  const sets1 = ms.get("key");
  sets1.add("f1");
  sets1.add("f2");

  const sets2 = ms.get("key");
  expect(sets2.has("f1")).toBe(true);
  expect(sets2.has("f2")).toBe(true);
});
