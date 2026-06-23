import { getCircularNumber } from "./util.ts";

export class Day {
  public static readonly names: string[] = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
    "Minggu",
  ];

  public static readonly size: number = Day.names.length;

  public static readonly all: Day[] = Day.names.map(
    (name, index) => new Day(index, name),
  );

  public static get(index: number) {
    const nIndex = getCircularNumber(index, Day.size);
    return Day.all[nIndex];
  }

  private constructor(
    public readonly index: number,
    public readonly name: string,
  ) {}

  public backward(skip: number = 1): Day {
    return Day.get(this.index - Math.abs(skip));
  }

  public forward(skip: number = 1): Day {
    return Day.get(this.index + Math.abs(skip));
  }

  public before(day: Day): boolean {
    return this.index < day.index;
  }

  public equals(day: Day): boolean {
    return this.index === day.index;
  }

  public after(day: Day): boolean {
    return this.index > day.index;
  }
}

export interface Time {
  readonly timestamp: number;
}

export function getTimestamp(time: number | Time): number {
  return typeof time === "number" ? time : time.timestamp;
}

export type NumberSign = -1 | 0 | 1;

export class Duration implements Time {
  public static readonly DAY_IN_WEEK: number = Day.size;
  public static readonly HOUR_IN_DAY: number = 24;
  public static readonly HOUR_IN_WEEK: number =
    Duration.DAY_IN_WEEK * Duration.HOUR_IN_DAY;
  public static readonly MINUTES_IN_HOUR: number = 60;
  public static readonly MINUTES_IN_DAY: number =
    Duration.HOUR_IN_DAY * Duration.MINUTES_IN_HOUR;
  public static readonly MINUTES_IN_WEEK: number =
    Duration.HOUR_IN_WEEK * Duration.MINUTES_IN_HOUR;
  public static readonly SECONDS_IN_MINUTE: number = 60;
  public static readonly SECONDS_IN_HOUR: number =
    Duration.MINUTES_IN_HOUR * Duration.SECONDS_IN_MINUTE;
  public static readonly SECONDS_IN_DAY: number =
    Duration.MINUTES_IN_DAY * Duration.SECONDS_IN_MINUTE;
  public static readonly SECONDS_IN_WEEK: number =
    Duration.MINUTES_IN_WEEK * Duration.SECONDS_IN_MINUTE;

  public static readonly origin = new Duration(0);

  public static from(
    week: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
  ): Duration {
    return new Duration(
      week * Duration.SECONDS_IN_WEEK +
        day * Duration.SECONDS_IN_DAY +
        hour * Duration.SECONDS_IN_HOUR +
        minute * Duration.SECONDS_IN_MINUTE +
        second,
    );
  }

  public static fromWeek(value: number): Duration {
    return Duration.from(value, 0, 0, 0, 0);
  }

  public static fromDay(value: number): Duration {
    return Duration.from(0, value, 0, 0, 0);
  }

  public static fromHour(value: number): Duration {
    return Duration.from(0, 0, value, 0, 0);
  }

  public static fromMinute(value: number): Duration {
    return Duration.from(0, 0, 0, value, 0);
  }

  public static fromSecond(value: number): Duration {
    return Duration.from(0, 0, 0, 0, value);
  }

  public readonly sign: NumberSign;
  public readonly week: number;
  public readonly day: number;
  public readonly hour: number;
  public readonly minute: number;
  public readonly second: number;
  public readonly timestamp: number;

  public constructor(time: number | Duration) {
    this.timestamp = getTimestamp(time);
    this.sign = this.timestamp === 0 ? 0 : this.timestamp < 0 ? -1 : 1;

    const value = Math.abs(this.timestamp);
    this.week = Math.floor(value / Duration.SECONDS_IN_WEEK) * this.sign;
    this.day =
      Math.floor((value % Duration.SECONDS_IN_WEEK) / Duration.SECONDS_IN_DAY) *
      this.sign;
    this.hour =
      Math.floor((value % Duration.SECONDS_IN_DAY) / Duration.SECONDS_IN_HOUR) *
      this.sign;
    this.minute =
      Math.floor(
        (value % Duration.SECONDS_IN_HOUR) / Duration.SECONDS_IN_MINUTE,
      ) * this.sign;
    this.second = Math.floor(value % Duration.SECONDS_IN_MINUTE) * this.sign;
  }

  public backward(time: number | Duration): Duration {
    const timestamp = getTimestamp(time);
    return new Duration(this.timestamp - timestamp);
  }

  public forward(time: number | Duration): Duration {
    const timestamp = getTimestamp(time);
    return new Duration(this.timestamp + timestamp);
  }

  public setWeek(week: number): Duration {
    return Duration.from(week, this.day, this.hour, this.minute, this.second);
  }

  public setDay(day: number): Duration {
    return Duration.from(this.week, day, this.hour, this.minute, this.second);
  }

  public setHour(hour: number): Duration {
    return Duration.from(this.week, this.day, hour, this.minute, this.second);
  }

  public setMinute(minute: number): Duration {
    return Duration.from(this.week, this.day, this.hour, minute, this.second);
  }

  public setSecond(second: number): Duration {
    return Duration.from(this.week, this.day, this.hour, this.minute, second);
  }

  public before(time: Duration): boolean {
    return this.timestamp < time.timestamp;
  }

  public equals(time: Duration): boolean {
    return this.timestamp === time.timestamp;
  }

  public after(time: Duration): boolean {
    return this.timestamp > time.timestamp;
  }
}

export class DayTime implements Time {
  public static from(
    day: number,
    hour: number,
    minute: number,
    second: number,
  ): DayTime {
    const duration = Duration.from(0, day, hour, minute, second);
    return new DayTime(duration);
  }

  public static fromDay(value: number): DayTime {
    return DayTime.from(value, 0, 0, 0);
  }

  public static fromHour(value: number): DayTime {
    return DayTime.from(0, value, 0, 0);
  }

  public static fromMinute(value: number): DayTime {
    return DayTime.from(0, 0, value, 0);
  }

  public static fromSecond(value: number): DayTime {
    return DayTime.from(0, 0, 0, value);
  }

  public readonly day: number;
  public readonly hour: number;
  public readonly minute: number;
  public readonly second: number;
  public readonly timestamp: number;
  public readonly duration: Duration;

  public constructor(time: number | Duration) {
    const value = getTimestamp(time);
    const normalizedValue = getCircularNumber(value, Duration.SECONDS_IN_WEEK);

    this.duration = new Duration(normalizedValue);
    this.day = this.duration.day;
    this.hour = this.duration.hour;
    this.minute = this.duration.minute;
    this.second = this.duration.second;
    this.timestamp = this.duration.timestamp;
  }

  public backward(time: number | Duration): DayTime {
    const timestamp = getTimestamp(time);
    return new DayTime(this.timestamp - timestamp);
  }

  public forward(time: number | Duration): DayTime {
    const timestamp = getTimestamp(time);
    return new DayTime(this.timestamp + timestamp);
  }

  public setDay(day: number): DayTime {
    return DayTime.from(day, this.hour, this.minute, this.second);
  }

  public setHour(hour: number): DayTime {
    return DayTime.from(this.day, hour, this.minute, this.second);
  }

  public setMinute(minute: number): DayTime {
    return DayTime.from(this.day, this.hour, minute, this.second);
  }

  public setSecond(second: number): DayTime {
    return DayTime.from(this.day, this.hour, this.minute, second);
  }

  public before(time: DayTime): boolean {
    return this.timestamp < time.timestamp;
  }

  public equals(time: DayTime): boolean {
    return this.timestamp === time.timestamp;
  }

  public after(time: DayTime): boolean {
    return this.timestamp > time.timestamp;
  }
}
