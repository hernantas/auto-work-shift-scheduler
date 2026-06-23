import { expect } from "@std/expect";
import { Day, DayTime, Duration } from "./time.ts";

Deno.test("`Day.get` should return the correct day", () => {
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

Deno.test("`Day.forward` should add the correct day", () => {
  const currentDay = Day.get(0);
  const forwardDay = currentDay.forward(3);
  const forwardCircularDay = currentDay.forward(10);

  expect(Day.get(3).equals(forwardDay)).toBe(true);
  expect(Day.get(3).equals(forwardCircularDay)).toBe(true);
});

Deno.test("`Day.backward` should subtract the correct day", () => {
  const currentDay = Day.get(6);
  const backwardDay = currentDay.backward(3);
  const backwardCircularDay = currentDay.backward(10);

  expect(Day.get(3).equals(backwardDay)).toBe(true);
  expect(Day.get(3).equals(backwardCircularDay)).toBe(true);
});

Deno.test("`Day.before` should compare days correctly", () => {
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

Deno.test("`Day.equals` should compare days correctly", () => {
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

Deno.test("`Day.after` should compare days correctly", () => {
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

Deno.test("`Duration` constants should be set correctly", () => {
  expect(Duration.DAY_IN_WEEK).toBe(7);
  expect(Duration.HOUR_IN_DAY).toBe(24);
  expect(Duration.HOUR_IN_WEEK).toBe(7 * 24);
  expect(Duration.MINUTES_IN_HOUR).toBe(60);
  expect(Duration.MINUTES_IN_DAY).toBe(24 * 60);
  expect(Duration.MINUTES_IN_WEEK).toBe(7 * 24 * 60);
  expect(Duration.SECONDS_IN_MINUTE).toBe(60);
  expect(Duration.SECONDS_IN_HOUR).toBe(60 * 60);
  expect(Duration.SECONDS_IN_DAY).toBe(24 * 60 * 60);
  expect(Duration.SECONDS_IN_WEEK).toBe(7 * 24 * 60 * 60);
});

Deno.test(
  "`Duration.fromSecond` should return the correct positive time when set with positive value",
  () => {
    const firstSecond = Duration.fromSecond(1);
    const lastSecond = Duration.fromSecond(59);
    const overSecond = Duration.fromSecond(61);

    expect(firstSecond.second).toBe(1);
    expect(firstSecond.minute).toBe(0);
    expect(firstSecond.hour).toBe(0);
    expect(firstSecond.day).toBe(0);
    expect(firstSecond.week).toBe(0);
    expect(lastSecond.second).toBe(59);
    expect(lastSecond.minute).toBe(0);
    expect(lastSecond.hour).toBe(0);
    expect(lastSecond.day).toBe(0);
    expect(lastSecond.week).toBe(0);
    expect(overSecond.second).toBe(1);
    expect(overSecond.minute).toBe(1);
    expect(overSecond.hour).toBe(0);
    expect(overSecond.day).toBe(0);
    expect(overSecond.week).toBe(0);
  },
);

Deno.test(
  "`Duration.fromSecond` should return the correct negative time when set with negative value",
  () => {
    const firstSecond = Duration.fromSecond(-1);
    const lastSecond = Duration.fromSecond(-59);
    const overSecond = Duration.fromSecond(-61);

    expect(firstSecond.second).toEqual(-1);
    expect(firstSecond.minute).toEqual(0);
    expect(firstSecond.hour).toEqual(0);
    expect(firstSecond.day).toEqual(0);
    expect(firstSecond.week).toEqual(0);
    expect(lastSecond.second).toEqual(-59);
    expect(lastSecond.minute).toEqual(0);
    expect(lastSecond.hour).toEqual(0);
    expect(lastSecond.day).toEqual(0);
    expect(lastSecond.week).toEqual(0);
    expect(overSecond.second).toEqual(-1);
    expect(overSecond.minute).toEqual(-1);
    expect(overSecond.hour).toEqual(0);
    expect(overSecond.day).toEqual(0);
    expect(overSecond.week).toEqual(0);
  },
);

Deno.test(
  "`Duration.fromMinute` should return the correct positive time when set with positive value",
  () => {
    const firstMinute = Duration.fromMinute(1);
    const lastMinute = Duration.fromMinute(59);
    const overMinute = Duration.fromMinute(61);

    expect(firstMinute.second).toBe(0);
    expect(firstMinute.minute).toBe(1);
    expect(firstMinute.hour).toBe(0);
    expect(firstMinute.day).toBe(0);
    expect(firstMinute.week).toBe(0);
    expect(lastMinute.second).toBe(0);
    expect(lastMinute.minute).toBe(59);
    expect(lastMinute.hour).toBe(0);
    expect(lastMinute.day).toBe(0);
    expect(lastMinute.week).toBe(0);
    expect(overMinute.second).toBe(0);
    expect(overMinute.minute).toBe(1);
    expect(overMinute.hour).toBe(1);
    expect(overMinute.day).toBe(0);
    expect(overMinute.week).toBe(0);
  },
);

Deno.test(
  "`Duration.fromMinute` should return the correct negative time when set with negative value",
  () => {
    const firstMinute = Duration.fromMinute(-1);
    const lastMinute = Duration.fromMinute(-59);
    const overMinute = Duration.fromMinute(-61);

    expect(firstMinute.second).toEqual(0);
    expect(firstMinute.minute).toEqual(-1);
    expect(firstMinute.hour).toEqual(0);
    expect(firstMinute.day).toEqual(0);
    expect(firstMinute.week).toEqual(0);
    expect(lastMinute.second).toEqual(0);
    expect(lastMinute.minute).toEqual(-59);
    expect(lastMinute.hour).toEqual(0);
    expect(lastMinute.day).toEqual(0);
    expect(lastMinute.week).toEqual(0);
    expect(overMinute.second).toEqual(0);
    expect(overMinute.minute).toEqual(-1);
    expect(overMinute.hour).toEqual(-1);
    expect(overMinute.day).toEqual(0);
    expect(overMinute.week).toEqual(0);
  },
);

Deno.test(
  "`Duration.fromHour` should return the correct positive time when set with positive value",
  () => {
    const firstHour = Duration.fromHour(1);
    const lastHour = Duration.fromHour(23);
    const overHour = Duration.fromHour(25);

    expect(firstHour.second).toBe(0);
    expect(firstHour.minute).toBe(0);
    expect(firstHour.hour).toBe(1);
    expect(firstHour.day).toBe(0);
    expect(firstHour.week).toBe(0);
    expect(lastHour.second).toBe(0);
    expect(lastHour.minute).toBe(0);
    expect(lastHour.hour).toBe(23);
    expect(lastHour.day).toBe(0);
    expect(lastHour.week).toBe(0);
    expect(overHour.second).toBe(0);
    expect(overHour.minute).toBe(0);
    expect(overHour.hour).toBe(1);
    expect(overHour.day).toBe(1);
    expect(overHour.week).toBe(0);
  },
);

Deno.test(
  "`Duration.fromHour` should return the correct negative time when set with negative value",
  () => {
    const firstHour = Duration.fromHour(-1);
    const lastHour = Duration.fromHour(-23);
    const overHour = Duration.fromHour(-25);

    expect(firstHour.second).toEqual(0);
    expect(firstHour.minute).toEqual(0);
    expect(firstHour.hour).toEqual(-1);
    expect(firstHour.day).toEqual(0);
    expect(firstHour.week).toEqual(0);
    expect(lastHour.second).toEqual(0);
    expect(lastHour.minute).toEqual(0);
    expect(lastHour.hour).toEqual(-23);
    expect(lastHour.day).toEqual(0);
    expect(lastHour.week).toEqual(0);
    expect(overHour.second).toEqual(0);
    expect(overHour.minute).toEqual(0);
    expect(overHour.hour).toEqual(-1);
    expect(overHour.day).toEqual(-1);
    expect(overHour.week).toEqual(0);
  },
);

Deno.test(
  "`Duration.fromDay` should return the correct positive time when set with positive value",
  () => {
    const firstDay = Duration.fromDay(1);
    const lastDay = Duration.fromDay(6);
    const overDay = Duration.fromDay(8);

    expect(firstDay.second).toBe(0);
    expect(firstDay.minute).toBe(0);
    expect(firstDay.hour).toBe(0);
    expect(firstDay.day).toBe(1);
    expect(firstDay.week).toBe(0);
    expect(lastDay.second).toBe(0);
    expect(lastDay.minute).toBe(0);
    expect(lastDay.hour).toBe(0);
    expect(lastDay.day).toBe(6);
    expect(lastDay.week).toBe(0);
    expect(overDay.second).toBe(0);
    expect(overDay.minute).toBe(0);
    expect(overDay.hour).toBe(0);
    expect(overDay.day).toBe(1);
    expect(overDay.week).toBe(1);
  },
);

Deno.test(
  "`Duration.fromDay` should return the correct negative time when set with negative value",
  () => {
    const firstDay = Duration.fromDay(-1);
    const lastDay = Duration.fromDay(-6);
    const overDay = Duration.fromDay(-8);

    expect(firstDay.second).toEqual(0);
    expect(firstDay.minute).toEqual(0);
    expect(firstDay.hour).toEqual(0);
    expect(firstDay.day).toEqual(-1);
    expect(firstDay.week).toEqual(0);
    expect(lastDay.second).toEqual(0);
    expect(lastDay.minute).toEqual(0);
    expect(lastDay.hour).toEqual(0);
    expect(lastDay.day).toEqual(-6);
    expect(lastDay.week).toEqual(0);
    expect(overDay.second).toEqual(0);
    expect(overDay.minute).toEqual(0);
    expect(overDay.hour).toEqual(0);
    expect(overDay.day).toEqual(-1);
    expect(overDay.week).toEqual(-1);
  },
);

Deno.test(
  "`Duration.fromWeek` should return the correct time when set with value",
  () => {
    const positiveWeek = Duration.fromWeek(1);
    const negativeWeek = Duration.fromWeek(-1);

    expect(positiveWeek.second).toBe(0);
    expect(positiveWeek.minute).toBe(0);
    expect(positiveWeek.hour).toBe(0);
    expect(positiveWeek.day).toBe(0);
    expect(positiveWeek.week).toBe(1);
    expect(negativeWeek.second).toEqual(0);
    expect(negativeWeek.minute).toEqual(0);
    expect(negativeWeek.hour).toEqual(0);
    expect(negativeWeek.day).toEqual(0);
    expect(negativeWeek.week).toEqual(-1);
  },
);

Deno.test("`Duration.before` should compare two durations correctly", () => {
  const firstDuration = new Duration(10);
  const secondDuration = new Duration(20);
  const thirdDuration = new Duration(30);
  expect(firstDuration.before(firstDuration)).toBe(false);
  expect(firstDuration.before(secondDuration)).toBe(true);
  expect(firstDuration.before(thirdDuration)).toBe(true);
  expect(secondDuration.before(firstDuration)).toBe(false);
  expect(secondDuration.before(secondDuration)).toBe(false);
  expect(secondDuration.before(thirdDuration)).toBe(true);
  expect(thirdDuration.before(firstDuration)).toBe(false);
  expect(thirdDuration.before(secondDuration)).toBe(false);
  expect(thirdDuration.before(thirdDuration)).toBe(false);
});

Deno.test("`Duration.equals` should compare two durations correctly", () => {
  const firstDuration = new Duration(10);
  const secondDuration = new Duration(20);
  const thirdDuration = new Duration(30);
  expect(firstDuration.equals(firstDuration)).toBe(true);
  expect(firstDuration.equals(secondDuration)).toBe(false);
  expect(firstDuration.equals(thirdDuration)).toBe(false);
  expect(secondDuration.equals(firstDuration)).toBe(false);
  expect(secondDuration.equals(secondDuration)).toBe(true);
  expect(secondDuration.equals(thirdDuration)).toBe(false);
  expect(thirdDuration.equals(firstDuration)).toBe(false);
  expect(thirdDuration.equals(secondDuration)).toBe(false);
  expect(thirdDuration.equals(thirdDuration)).toBe(true);
});

Deno.test("`Duration.after` should compare two durations correctly", () => {
  const firstDuration = new Duration(10);
  const secondDuration = new Duration(20);
  const thirdDuration = new Duration(30);
  expect(firstDuration.after(firstDuration)).toBe(false);
  expect(firstDuration.after(secondDuration)).toBe(false);
  expect(firstDuration.after(thirdDuration)).toBe(false);
  expect(secondDuration.after(firstDuration)).toBe(true);
  expect(secondDuration.after(secondDuration)).toBe(false);
  expect(secondDuration.after(thirdDuration)).toBe(false);
  expect(thirdDuration.after(firstDuration)).toBe(true);
  expect(thirdDuration.after(secondDuration)).toBe(true);
  expect(thirdDuration.after(thirdDuration)).toBe(false);
});

Deno.test("`Duration.forward` should add two durations correctly", () => {
  const forwardSecond = Duration.origin.forward(Duration.fromSecond(1));
  const forwardMinute = Duration.origin.forward(Duration.fromMinute(1));
  const forwardHour = Duration.origin.forward(Duration.fromHour(1));
  const forwardDay = Duration.origin.forward(Duration.fromDay(1));
  const forwardWeek = Duration.origin.forward(Duration.fromWeek(1));

  expect(forwardSecond.second).toBe(1);
  expect(forwardSecond.minute).toBe(0);
  expect(forwardSecond.hour).toBe(0);
  expect(forwardSecond.day).toBe(0);
  expect(forwardSecond.week).toBe(0);
  expect(forwardMinute.second).toBe(0);
  expect(forwardMinute.minute).toBe(1);
  expect(forwardMinute.hour).toBe(0);
  expect(forwardMinute.day).toBe(0);
  expect(forwardMinute.week).toBe(0);
  expect(forwardHour.second).toBe(0);
  expect(forwardHour.minute).toBe(0);
  expect(forwardHour.hour).toBe(1);
  expect(forwardHour.day).toBe(0);
  expect(forwardHour.week).toBe(0);
  expect(forwardDay.second).toBe(0);
  expect(forwardDay.minute).toBe(0);
  expect(forwardDay.hour).toBe(0);
  expect(forwardDay.day).toBe(1);
  expect(forwardDay.week).toBe(0);
  expect(forwardWeek.second).toBe(0);
  expect(forwardWeek.minute).toBe(0);
  expect(forwardWeek.hour).toBe(0);
  expect(forwardWeek.day).toBe(0);
  expect(forwardWeek.week).toBe(1);
});

Deno.test("`Duration.backward` should add two durations correctly", () => {
  const backwardSecond = Duration.origin.backward(Duration.fromSecond(1));
  const backwardMinute = Duration.origin.backward(Duration.fromMinute(1));
  const backwardHour = Duration.origin.backward(Duration.fromHour(1));
  const backwardDay = Duration.origin.backward(Duration.fromDay(1));
  const backwardWeek = Duration.origin.backward(Duration.fromWeek(1));

  expect(backwardSecond.second).toEqual(-1);
  expect(backwardSecond.minute).toEqual(0);
  expect(backwardSecond.hour).toEqual(0);
  expect(backwardSecond.day).toEqual(0);
  expect(backwardSecond.week).toEqual(0);
  expect(backwardMinute.second).toEqual(0);
  expect(backwardMinute.minute).toEqual(-1);
  expect(backwardMinute.hour).toEqual(0);
  expect(backwardMinute.day).toEqual(0);
  expect(backwardMinute.week).toEqual(0);
  expect(backwardHour.second).toEqual(0);
  expect(backwardHour.minute).toEqual(0);
  expect(backwardHour.hour).toEqual(-1);
  expect(backwardHour.day).toEqual(0);
  expect(backwardHour.week).toEqual(0);
  expect(backwardDay.second).toEqual(0);
  expect(backwardDay.minute).toEqual(0);
  expect(backwardDay.hour).toEqual(0);
  expect(backwardDay.day).toEqual(-1);
  expect(backwardDay.week).toEqual(0);
  expect(backwardWeek.second).toEqual(0);
  expect(backwardWeek.minute).toEqual(0);
  expect(backwardWeek.hour).toEqual(0);
  expect(backwardWeek.day).toEqual(0);
  expect(backwardWeek.week).toEqual(-1);
});

Deno.test("`Duration.setWeek` should only set the week correctly", () => {
  const duration = Duration.from(1, 1, 1, 1, 1).setWeek(2);
  expect(duration.week).toEqual(2);
  expect(duration.day).toEqual(1);
  expect(duration.hour).toEqual(1);
  expect(duration.minute).toEqual(1);
  expect(duration.second).toEqual(1);
});

Deno.test("`Duration.setDay` should only set the day correctly", () => {
  const duration = Duration.from(1, 1, 1, 1, 1).setDay(2);
  expect(duration.week).toEqual(1);
  expect(duration.day).toEqual(2);
  expect(duration.hour).toEqual(1);
  expect(duration.minute).toEqual(1);
  expect(duration.second).toEqual(1);
});

Deno.test("`Duration.setHour` should only set the hour correctly", () => {
  const duration = Duration.from(1, 1, 1, 1, 1).setHour(2);
  expect(duration.week).toEqual(1);
  expect(duration.day).toEqual(1);
  expect(duration.hour).toEqual(2);
  expect(duration.minute).toEqual(1);
  expect(duration.second).toEqual(1);
});

Deno.test("`Duration.setMinute` should only set the minute correctly", () => {
  const duration = Duration.from(1, 1, 1, 1, 1).setMinute(2);
  expect(duration.week).toEqual(1);
  expect(duration.day).toEqual(1);
  expect(duration.hour).toEqual(1);
  expect(duration.minute).toEqual(2);
  expect(duration.second).toEqual(1);
});

Deno.test("`Duration.setSecond` should only set the second correctly", () => {
  const duration = Duration.from(1, 1, 1, 1, 1).setSecond(2);
  expect(duration.week).toEqual(1);
  expect(duration.day).toEqual(1);
  expect(duration.hour).toEqual(1);
  expect(duration.minute).toEqual(1);
  expect(duration.second).toEqual(2);
});

Deno.test(
  "`Duration.distanceTo` should calculate the distance correctly",
  () => {
    const withSecond = Duration.fromSecond(1);
    const withMinute = Duration.fromMinute(1);
    const withHour = Duration.fromHour(1);
    const withDay = Duration.fromDay(1);
    const withWeek = Duration.fromWeek(1);

    expect(withSecond.second).toBe(1);
    expect(withSecond.minute).toBe(0);
    expect(withSecond.hour).toBe(0);
    expect(withSecond.day).toBe(0);
    expect(withSecond.week).toBe(0);
    expect(withMinute.second).toBe(0);
    expect(withMinute.minute).toBe(1);
    expect(withMinute.hour).toBe(0);
    expect(withMinute.day).toBe(0);
    expect(withMinute.week).toBe(0);
    expect(withHour.second).toBe(0);
    expect(withHour.minute).toBe(0);
    expect(withHour.hour).toBe(1);
    expect(withHour.day).toBe(0);
    expect(withHour.week).toBe(0);
    expect(withDay.second).toBe(0);
    expect(withDay.minute).toBe(0);
    expect(withDay.hour).toBe(0);
    expect(withDay.day).toBe(1);
    expect(withDay.week).toBe(0);
    expect(withWeek.second).toBe(0);
    expect(withWeek.minute).toBe(0);
    expect(withWeek.hour).toBe(0);
    expect(withWeek.day).toBe(0);
    expect(withWeek.week).toBe(1);
  },
);

Deno.test(
  "`DayTime.fromSecond` should return the correct time when set with positive value",
  () => {
    const firstSecond = DayTime.fromSecond(1);
    const lastSecond = DayTime.fromSecond(59);
    const overSecond = DayTime.fromSecond(61);

    expect(firstSecond.second).toBe(1);
    expect(firstSecond.minute).toBe(0);
    expect(firstSecond.hour).toBe(0);
    expect(firstSecond.day).toBe(Day.get(0));
    expect(lastSecond.second).toBe(59);
    expect(lastSecond.minute).toBe(0);
    expect(lastSecond.hour).toBe(0);
    expect(lastSecond.day).toBe(Day.get(0));
    expect(overSecond.second).toBe(1);
    expect(overSecond.minute).toBe(1);
    expect(overSecond.hour).toBe(0);
    expect(overSecond.day).toBe(Day.get(0));
  },
);

Deno.test(
  "`DayTime.fromSecond` should return the correct time when set with negative value",
  () => {
    const firstSecond = DayTime.fromSecond(-1);
    const lastSecond = DayTime.fromSecond(-60);
    const overSecond = DayTime.fromSecond(-61);

    expect(firstSecond.second).toBe(59);
    expect(firstSecond.minute).toBe(59);
    expect(firstSecond.hour).toBe(23);
    expect(firstSecond.day).toBe(Day.get(6));
    expect(lastSecond.second).toBe(0);
    expect(lastSecond.minute).toBe(59);
    expect(lastSecond.hour).toBe(23);
    expect(lastSecond.day).toBe(Day.get(6));
    expect(overSecond.second).toBe(59);
    expect(overSecond.minute).toBe(58);
    expect(overSecond.hour).toBe(23);
    expect(overSecond.day).toBe(Day.get(6));
  },
);

Deno.test(
  "`DayTime.fromMinute` should return the correct time when set with positive value",
  () => {
    const firstMinute = DayTime.fromMinute(1);
    const lastMinute = DayTime.fromMinute(59);
    const overMinute = DayTime.fromMinute(61);

    expect(firstMinute.second).toBe(0);
    expect(firstMinute.minute).toBe(1);
    expect(firstMinute.hour).toBe(0);
    expect(firstMinute.day).toBe(Day.get(0));
    expect(lastMinute.second).toBe(0);
    expect(lastMinute.minute).toBe(59);
    expect(lastMinute.hour).toBe(0);
    expect(lastMinute.day).toBe(Day.get(0));
    expect(overMinute.second).toBe(0);
    expect(overMinute.minute).toBe(1);
    expect(overMinute.hour).toBe(1);
    expect(overMinute.day).toBe(Day.get(0));
  },
);

Deno.test(
  "`DayTime.fromMinute` should return the correct time when set with negative value",
  () => {
    const firstMinute = DayTime.fromMinute(-1);
    const lastMinute = DayTime.fromMinute(-60);
    const overMinute = DayTime.fromMinute(-61);

    expect(firstMinute.second).toBe(0);
    expect(firstMinute.minute).toBe(59);
    expect(firstMinute.hour).toBe(23);
    expect(firstMinute.day).toBe(Day.get(6));
    expect(lastMinute.second).toBe(0);
    expect(lastMinute.minute).toBe(0);
    expect(lastMinute.hour).toBe(23);
    expect(lastMinute.day).toBe(Day.get(6));
    expect(overMinute.second).toBe(0);
    expect(overMinute.minute).toBe(59);
    expect(overMinute.hour).toBe(22);
    expect(overMinute.day).toBe(Day.get(6));
  },
);

Deno.test(
  "`DayTime.fromHour` should return the correct time when set with positive value",
  () => {
    const firstHour = DayTime.fromHour(1);
    const lastHour = DayTime.fromHour(23);
    const overHour = DayTime.fromHour(25);

    expect(firstHour.second).toBe(0);
    expect(firstHour.minute).toBe(0);
    expect(firstHour.hour).toBe(1);
    expect(firstHour.day).toBe(Day.get(0));
    expect(lastHour.second).toBe(0);
    expect(lastHour.minute).toBe(0);
    expect(lastHour.hour).toBe(23);
    expect(lastHour.day).toBe(Day.get(0));
    expect(overHour.second).toBe(0);
    expect(overHour.minute).toBe(0);
    expect(overHour.hour).toBe(1);
    expect(overHour.day).toBe(Day.get(1));
  },
);

Deno.test(
  "`DayTime.fromHour` should return the correct time when set with negative value",
  () => {
    const firstHour = DayTime.fromHour(-1);
    const lastHour = DayTime.fromHour(-24);
    const overHour = DayTime.fromHour(-25);

    expect(firstHour.second).toBe(0);
    expect(firstHour.minute).toBe(0);
    expect(firstHour.hour).toBe(23);
    expect(firstHour.day).toBe(Day.get(6));
    expect(lastHour.second).toBe(0);
    expect(lastHour.minute).toBe(0);
    expect(lastHour.hour).toBe(0);
    expect(lastHour.day).toBe(Day.get(6));
    expect(overHour.second).toBe(0);
    expect(overHour.minute).toBe(0);
    expect(overHour.hour).toBe(23);
    expect(overHour.day).toBe(Day.get(5));
  },
);

Deno.test(
  "`DayTime.fromDay` should return the correct time when set with positive value",
  () => {
    const firstDay = DayTime.fromDay(1);
    const lastDay = DayTime.fromDay(6);
    const overDay = DayTime.fromDay(8);

    expect(firstDay.second).toBe(0);
    expect(firstDay.minute).toBe(0);
    expect(firstDay.hour).toBe(0);
    expect(firstDay.day).toBe(Day.get(1));
    expect(lastDay.second).toBe(0);
    expect(lastDay.minute).toBe(0);
    expect(lastDay.hour).toBe(0);
    expect(lastDay.day).toBe(Day.get(6));
    expect(overDay.second).toBe(0);
    expect(overDay.minute).toBe(0);
    expect(overDay.hour).toBe(0);
    expect(overDay.day).toBe(Day.get(1));
  },
);

Deno.test(
  "`DayTime.fromDay` should return the correct time when set with negative value",
  () => {
    const firstDay = DayTime.fromDay(-1);
    const lastDay = DayTime.fromDay(-7);
    const overDay = DayTime.fromDay(-8);

    expect(firstDay.second).toBe(0);
    expect(firstDay.minute).toBe(0);
    expect(firstDay.hour).toBe(0);
    expect(firstDay.day).toBe(Day.get(6));
    expect(lastDay.second).toBe(0);
    expect(lastDay.minute).toBe(0);
    expect(lastDay.hour).toBe(0);
    expect(lastDay.day).toBe(Day.get(0));
    expect(overDay.second).toBe(0);
    expect(overDay.minute).toBe(0);
    expect(overDay.hour).toBe(0);
    expect(overDay.day).toBe(Day.get(6));
  },
);

Deno.test("`DayTime.before` should compare two durations correctly", () => {
  const firstDuration = DayTime.fromDay(0);
  const secondDuration = DayTime.fromDay(3);
  const thirdDuration = DayTime.fromDay(6);
  expect(firstDuration.before(firstDuration)).toBe(false);
  expect(firstDuration.before(secondDuration)).toBe(true);
  expect(firstDuration.before(thirdDuration)).toBe(true);
  expect(secondDuration.before(firstDuration)).toBe(false);
  expect(secondDuration.before(secondDuration)).toBe(false);
  expect(secondDuration.before(thirdDuration)).toBe(true);
  expect(thirdDuration.before(firstDuration)).toBe(false);
  expect(thirdDuration.before(secondDuration)).toBe(false);
  expect(thirdDuration.before(thirdDuration)).toBe(false);
});

Deno.test("`DayTime.equals` should compare two durations correctly", () => {
  const firstDuration = DayTime.fromDay(0);
  const secondDuration = DayTime.fromDay(3);
  const thirdDuration = DayTime.fromDay(6);
  expect(firstDuration.equals(firstDuration)).toBe(true);
  expect(firstDuration.equals(secondDuration)).toBe(false);
  expect(firstDuration.equals(thirdDuration)).toBe(false);
  expect(secondDuration.equals(firstDuration)).toBe(false);
  expect(secondDuration.equals(secondDuration)).toBe(true);
  expect(secondDuration.equals(thirdDuration)).toBe(false);
  expect(thirdDuration.equals(firstDuration)).toBe(false);
  expect(thirdDuration.equals(secondDuration)).toBe(false);
  expect(thirdDuration.equals(thirdDuration)).toBe(true);
});

Deno.test("`DayTime.after` should compare two durations correctly", () => {
  const firstDuration = DayTime.fromDay(0);
  const secondDuration = DayTime.fromDay(3);
  const thirdDuration = DayTime.fromDay(6);
  expect(firstDuration.after(firstDuration)).toBe(false);
  expect(firstDuration.after(secondDuration)).toBe(false);
  expect(firstDuration.after(thirdDuration)).toBe(false);
  expect(secondDuration.after(firstDuration)).toBe(true);
  expect(secondDuration.after(secondDuration)).toBe(false);
  expect(secondDuration.after(thirdDuration)).toBe(false);
  expect(thirdDuration.after(firstDuration)).toBe(true);
  expect(thirdDuration.after(secondDuration)).toBe(true);
  expect(thirdDuration.after(thirdDuration)).toBe(false);
});

Deno.test("`DayTime.forward` should add two durations correctly", () => {
  const origin = DayTime.from(0, 0, 0, 0);
  const forwardSecond = origin.forward(Duration.fromSecond(1));
  const forwardMinute = origin.forward(Duration.fromMinute(1));
  const forwardHour = origin.forward(Duration.fromHour(1));
  const forwardDay = origin.forward(Duration.fromDay(1));

  expect(forwardSecond.second).toBe(1);
  expect(forwardSecond.minute).toBe(0);
  expect(forwardSecond.hour).toBe(0);
  expect(forwardSecond.day).toBe(Day.get(0));
  expect(forwardMinute.second).toBe(0);
  expect(forwardMinute.minute).toBe(1);
  expect(forwardMinute.hour).toBe(0);
  expect(forwardMinute.day).toBe(Day.get(0));
  expect(forwardHour.second).toBe(0);
  expect(forwardHour.minute).toBe(0);
  expect(forwardHour.hour).toBe(1);
  expect(forwardHour.day).toBe(Day.get(0));
  expect(forwardDay.second).toBe(0);
  expect(forwardDay.minute).toBe(0);
  expect(forwardDay.hour).toBe(0);
  expect(forwardDay.day).toBe(Day.get(1));
});

Deno.test("`DayTime.backward` should add two durations correctly", () => {
  const origin = DayTime.from(0, 0, 0, 0);
  const backwardSecond = origin.backward(Duration.fromSecond(1));
  const backwardMinute = origin.backward(Duration.fromMinute(1));
  const backwardHour = origin.backward(Duration.fromHour(1));
  const backwardDay = origin.backward(Duration.fromDay(1));
  const backwardWeek = origin.backward(Duration.fromWeek(1));

  expect(backwardSecond.second).toBe(59);
  expect(backwardSecond.minute).toBe(59);
  expect(backwardSecond.hour).toBe(23);
  expect(backwardSecond.day).toBe(Day.get(6));
  expect(backwardMinute.second).toBe(0);
  expect(backwardMinute.minute).toBe(59);
  expect(backwardMinute.hour).toBe(23);
  expect(backwardMinute.day).toBe(Day.get(6));
  expect(backwardHour.second).toBe(0);
  expect(backwardHour.minute).toBe(0);
  expect(backwardHour.hour).toBe(23);
  expect(backwardHour.day).toBe(Day.get(6));
  expect(backwardDay.second).toBe(0);
  expect(backwardDay.minute).toBe(0);
  expect(backwardDay.hour).toBe(0);
  expect(backwardHour.day).toBe(Day.get(6));
  expect(backwardWeek.second).toBe(0);
  expect(backwardWeek.minute).toBe(0);
  expect(backwardWeek.hour).toBe(0);
  expect(backwardWeek.day).toBe(Day.get(0));
});

Deno.test("`DayTime.setDay` should only set the day correctly", () => {
  const dt = DayTime.from(1, 1, 1, 1).setDay(2);
  expect(dt.day).toBe(Day.get(2));
  expect(dt.hour).toBe(1);
  expect(dt.minute).toBe(1);
  expect(dt.second).toBe(1);
});

Deno.test("`DayTime.setHour` should only set the hour correctly", () => {
  const dt = DayTime.from(1, 1, 1, 1).setHour(2);
  expect(dt.day).toBe(Day.get(1));
  expect(dt.hour).toBe(2);
  expect(dt.minute).toBe(1);
  expect(dt.second).toBe(1);
});

Deno.test("`DayTime.setMinute` should only set the minute correctly", () => {
  const dt = DayTime.from(1, 1, 1, 1).setMinute(2);
  expect(dt.day).toBe(Day.get(1));
  expect(dt.hour).toBe(1);
  expect(dt.minute).toBe(2);
  expect(dt.second).toBe(1);
});

Deno.test("`DayTime.setSecond` should only set the second correctly", () => {
  const dt = DayTime.from(1, 1, 1, 1).setSecond(2);
  expect(dt.day).toBe(Day.get(1));
  expect(dt.hour).toBe(1);
  expect(dt.minute).toBe(1);
  expect(dt.second).toBe(2);
});

Deno.test(
  "`DayTime.distanceTo` should calculate the distance correctly",
  () => {
    const origin = DayTime.from(0, 0, 0, 0);
    const withSecond = origin.distanceTo(DayTime.fromSecond(1));
    const withMinute = origin.distanceTo(DayTime.fromMinute(1));
    const withHour = origin.distanceTo(DayTime.fromHour(1));
    const withDay = origin.distanceTo(DayTime.fromDay(1));

    expect(withSecond.second).toBe(1);
    expect(withSecond.minute).toBe(0);
    expect(withSecond.hour).toBe(0);
    expect(withSecond.day).toBe(0);
    expect(withMinute.second).toBe(0);
    expect(withMinute.minute).toBe(1);
    expect(withMinute.hour).toBe(0);
    expect(withMinute.day).toBe(0);
    expect(withHour.second).toBe(0);
    expect(withHour.minute).toBe(0);
    expect(withHour.hour).toBe(1);
    expect(withHour.day).toBe(0);
    expect(withDay.second).toBe(0);
    expect(withDay.minute).toBe(0);
    expect(withDay.hour).toBe(0);
    expect(withDay.day).toBe(1);
  },
);

Deno.test(
  "`DayTime.distanceTo` should calculate the distance as if the time wrapped around if the time is before the current time",
  () => {
    const origin = DayTime.from(0, 0, 0, 0);
    const withSecond = origin.distanceTo(DayTime.fromSecond(-1));
    const withMinute = origin.distanceTo(DayTime.fromMinute(-1));
    const withHour = origin.distanceTo(DayTime.fromHour(-1));
    const withDay = origin.distanceTo(DayTime.fromDay(-1));

    expect(withSecond.second).toBe(59);
    expect(withSecond.minute).toBe(59);
    expect(withSecond.hour).toBe(23);
    expect(withSecond.day).toBe(6);
    expect(withMinute.second).toBe(0);
    expect(withMinute.minute).toBe(59);
    expect(withMinute.hour).toBe(23);
    expect(withMinute.day).toBe(6);
    expect(withHour.second).toBe(0);
    expect(withHour.minute).toBe(0);
    expect(withHour.hour).toBe(23);
    expect(withHour.day).toBe(6);
    expect(withDay.second).toBe(0);
    expect(withDay.minute).toBe(0);
    expect(withDay.hour).toBe(0);
    expect(withDay.day).toBe(6);
  },
);
