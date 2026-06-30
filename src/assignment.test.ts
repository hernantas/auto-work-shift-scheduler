import { expect } from "@std/expect";
import {
  AssignmentHashMap,
  AssignmentMap,
  Employee,
  TimeSlot,
} from "./assignment.ts";
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

Deno.test("`TimeSlot` should return true if given time is within the slot", () => {
  const slot = new TimeSlot(
    "working-day",
    DayTime.from(0, 0, 0, 0),
    Duration.fromDay(1),
  );
  expect(slot.inRange(DayTime.from(0, 0, 0, 0))).toBe(true);
  expect(slot.inRange(DayTime.from(0, 12, 0, 0))).toBe(true);
  expect(slot.inRange(DayTime.from(1, 0, 0, 0))).toBe(true);
  expect(slot.inRange(DayTime.from(1, 1, 0, 0))).toBe(false);
  expect(slot.inRange(DayTime.from(-1, 0, 0, 0))).toBe(false);
});

Deno.test("`TimeSlot` should return true if given time is within the slot even if slot is circular", () => {
  const slot = new TimeSlot(
    "working-day",
    DayTime.from(6, 0, 0, 0),
    Duration.fromDay(2),
  );
  expect(slot.inRange(DayTime.from(0, 0, 0, 0))).toBe(true);
  expect(slot.inRange(DayTime.from(0, 12, 0, 0))).toBe(true);
  expect(slot.inRange(DayTime.from(1, 0, 0, 0))).toBe(true);
  expect(slot.inRange(DayTime.from(-1, 0, 0, 0))).toBe(true);
  expect(slot.inRange(DayTime.from(-1, 1, 0, 0))).toBe(true);
  expect(slot.inRange(DayTime.from(1, 1, 0, 0))).toBe(false);
  expect(slot.inRange(DayTime.from(-1, -1, 0, 0))).toBe(false);
});

Deno.test("`AssignmentMap`", async (t) => {
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

  await t.step(
    "should assign `Employee` to given `TimeSlot` if allowed",
    () => {
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
    },
  );

  await t.step(
    "should clone correctly",
    () => {
      const assignment = new AssignmentMap();
      assignment.assign(allDayWorker, ...allSlots);
      assignment.assign(morningWorker, ...allSlots);
      assignment.assign(nightWorker, ...allSlots);
      const cloned = assignment.clone();

      for (const slot of morningSlots) {
        expect(cloned.getByEmployee(allDayWorker).has(slot)).toBe(true);
        expect(cloned.getByEmployee(morningWorker).has(slot)).toBe(true);
        expect(cloned.getByEmployee(nightWorker).has(slot)).toBe(false);
      }
      for (const slot of nightSlots) {
        expect(cloned.getByEmployee(allDayWorker).has(slot)).toBe(true);
        expect(cloned.getByEmployee(morningWorker).has(slot)).toBe(false);
        expect(cloned.getByEmployee(nightWorker).has(slot)).toBe(true);
      }
    },
  );
});

Deno.test("`AssignmentHashMap` should generate unique value for each `TimeSlot` and employee combination", () => {
  const slots = TimeSlot.generate(
    "test",
    Duration.fromHour(9),
    Duration.fromHour(8),
    Day.all,
  );
  const worker1 = new Employee("worker-1", ...slots);
  const worker2 = new Employee("worker-2", ...slots);
  const workers = [worker1, worker2];

  const hashMap = new AssignmentHashMap(slots, workers);
  const uniqueHashes = new Set<bigint>();
  for (const slot of slots) {
    for (const worker of workers) {
      const hash = hashMap.get(slot).get(worker);
      expect(hash).not.toEqual(0n);
      expect(uniqueHashes.has(hash)).toBe(false);
      uniqueHashes.add(hash);
    }
  }
});
