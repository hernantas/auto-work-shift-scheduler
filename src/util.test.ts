import { expect } from "@std/expect";
import { getCircularNumber, SafeMap, sum, zeroPad } from "./util.ts";

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

Deno.test("`sum` should return the sum of all values", () => {
  const result = sum(1, 2, 3, 4, 5);
  expect(result).toBe(15);
});

Deno.test("`SafeMap` should return default value when given unknown key", () => {
  const map = new SafeMap<string, string>(() => "");
  const value = map.get("key");
  expect(value).not.toBe(undefined);
  expect(value).toBe("");
});

Deno.test("`SafeMap` should return existing set when key is known", () => {
  const map = new SafeMap<string, string>(() => "");
  map.set("key", "value");
  const value = map.get("key");
  expect(value).toBe("value");
});
