import { expect } from "@std/expect";
import { AssignmentMap, Employee, TimeSlot } from "./assignment.ts";
import { Day, DayTime, Duration } from "./time.ts";

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

Deno.test("`AssignmentMap` should assign `Employee` to given `TimeSlot` if allowed", () => {
  const morningSlots = TimeSlot.generate(
    "morning-work-hour",
    Duration.fromHour(8),
    Duration.fromHour(9),
    Day.all,
  );
  const nightSlots = TimeSlot.generate(
    "night-work-hour",
    Duration.fromHour(15),
    Duration.fromHour(9),
    Day.all,
  );
  const allSlots = [...morningSlots, ...nightSlots];

  const morningWorker = new Employee("morning-worker", ...morningSlots);
  const nightWorker = new Employee("night-worker", ...nightSlots);
  const allDayWorker = new Employee(
    "all-day-worker",
    ...morningSlots,
    ...nightSlots,
  );

  const assignment = new AssignmentMap();
  assignment.assign(allDayWorker, ...allSlots);
  assignment.assign(morningWorker, ...allSlots);
  assignment.assign(nightWorker, ...allSlots);
  for (const slot of morningSlots) {
    expect(assignment.getByEmployee(allDayWorker).has(slot)).toBe(true);
    expect(assignment.getByEmployee(morningWorker).has(slot)).toBe(true);
    expect(assignment.getByEmployee(nightWorker).has(slot)).toBe(false);
  }
  for (const slot of nightSlots) {
    expect(assignment.getByEmployee(allDayWorker).has(slot)).toBe(true);
    expect(assignment.getByEmployee(morningWorker).has(slot)).toBe(false);
    expect(assignment.getByEmployee(nightWorker).has(slot)).toBe(true);
  }
});
