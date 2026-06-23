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
