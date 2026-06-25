import { Day, DayTime, Duration } from "./time.ts";

export class TimeSlot {
  public static generate(
    name: string,
    start: number | Duration,
    duration: number | Duration,
    days: Day[],
  ): TimeSlot[] {
    return days.map((day) =>
      new TimeSlot(name, DayTime.fromDay(day).forward(start), duration)
    );
  }

  public readonly duration: Duration;
  public readonly end: DayTime;

  public constructor(
    public readonly name: string,
    public readonly start: DayTime,
    duration: number | Duration,
  ) {
    this.duration = typeof duration === "number"
      ? new Duration(duration)
      : duration;
    this.end = this.start.forward(duration);
  }
}
