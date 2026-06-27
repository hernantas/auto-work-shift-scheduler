import { Day, DayTime, Duration } from "./time.ts";
import { MapSet } from "./util.ts";

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

  public inRange(time: DayTime): boolean {
    if (this.start.after(this.end)) {
      return (this.start.before(time) || this.start.equals(time)) ||
        (this.end.after(time) || this.end.equals(time));
    }
    return (this.start.before(time) || this.start.equals(time)) &&
      (this.end.after(time) || this.end.equals(time));
  }
}

export class Employee {
  public readonly allowedSlots: Set<TimeSlot>;

  public constructor(
    public readonly name: string,
    ...allowedSlots: TimeSlot[]
  ) {
    this.allowedSlots = new Set(allowedSlots);
  }
}

export class AssignmentMap {
  private readonly assignedEmployees: MapSet<Employee, TimeSlot> = new MapSet();
  private readonly assignedTimeSlots: MapSet<TimeSlot, Employee> = new MapSet();

  public getByEmployee(employee: Employee): Set<TimeSlot> {
    return this.assignedEmployees.get(employee);
  }

  public getByTimeSlot(slot: TimeSlot): Set<Employee> {
    return this.assignedTimeSlots.get(slot);
  }

  public assign(employee: Employee, ...slots: TimeSlot[]): this {
    for (const slot of slots) {
      if (employee.allowedSlots.has(slot)) {
        this.assignedEmployees.get(employee).add(slot);
        this.assignedTimeSlots.get(slot).add(employee);
      }
    }
    return this;
  }

  public unassign(employee: Employee, slot: TimeSlot): this {
    this.assignedEmployees.get(employee).delete(slot);
    this.assignedTimeSlots.get(slot).delete(employee);
    return this;
  }

  public clone(): AssignmentMap {
    const newAssignments = new AssignmentMap();
    for (const [employee, slots] of this.assignedEmployees.entries()) {
      newAssignments.assign(employee, ...slots);
    }
    return newAssignments;
  }
}
