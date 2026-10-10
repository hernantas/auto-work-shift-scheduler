using Scheduler.Time;

namespace Scheduler.Assignment
{
    public class TimeSlot
    {
        public static TimeSlot[] Generate(
            string baseName,
            Day[] days,
            TimeOfDay start,
            Duration duration
        ) =>
            days.Select(day =>
                {
                    var startDayTime = new DayTime(Duration.OfDay(day).Add(start.Duration));
                    return new TimeSlot($"{day.Name} {baseName}", startDayTime, duration);
                })
                .ToArray();

        public string Name { get; }
        public DayTime Start { get; }
        public Duration Duration { get; }
        public DayTime End { get; }

        public TimeSlot(string name, DayTime start, Duration duration)
        {
            Name = name;
            Start = start;
            Duration = duration;
            End = Start.Add(duration);
        }
    }
}
