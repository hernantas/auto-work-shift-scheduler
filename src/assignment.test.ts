import { expect } from "@std/expect";
import { TimeSlot } from "./assignment.ts";
import { Day, DayTime, Duration } from "./time.ts";
import { isWindows } from "jsr:@std/internal@^1.0.14/os";

Deno.test("`TimeSlot` should generate correct end time based on start time and duration", () => {
  const slotDay = new TimeSlot(
    "working-day",
    DayTime.from(0, 0, 0, 0),
    Duration.fromDay(1),
  );
  const slotWorkHour = new TimeSlot(
    "working-hour",
    DayTime.from(0, 0, 0, 0),
    Duration.fromHour(8),
  );
  expect(slotDay.end.day.index).toBe(1);
  expect(slotDay.end.hour).toBe(0);
  expect(slotDay.end.minute).toBe(0);
  expect(slotDay.end.second).toBe(0);
  expect(slotWorkHour.end.day.index).toBe(0);
  expect(slotWorkHour.end.hour).toBe(8);
  expect(slotWorkHour.end.minute).toBe(0);
  expect(slotWorkHour.end.second).toBe(0);
});

Deno.test("`TimeSlot` should generate several time slot over given days", () => {
  const slots = TimeSlot.generate(
    "morning-work-hour",
    Duration.fromHour(8),
    Duration.fromHour(9),
    Day.all,
  );
  expect(slots.length).toBe(Day.size);
  for (let index = 0; index < Day.size; index++) {
    const slot = slots[index];
    expect(slot.name).toBe("morning-work-hour");
    expect(slot.start.day).toBe(Day.get(index));
    expect(slot.start.hour).toBe(8);
    expect(slot.start.minute).toBe(0);
    expect(slot.start.second).toBe(0);
    expect(slot.end.day).toBe(Day.get(index));
    expect(slot.end.hour).toBe(17);
    expect(slot.end.minute).toBe(0);
    expect(slot.end.second).toBe(0);
  }
});
