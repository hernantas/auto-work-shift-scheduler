using Scheduler.Util;

namespace Scheduler.Time
{
    public class DayTime
    {
        public Duration Duration { get; }

        public int Timestamp
        {
            get => Duration.Timestamp;
        }
        public int Hour
        {
            get => Duration.Hour;
        }
        public int Second
        {
            get => Duration.Second;
        }
        public int Minute
        {
            get => Duration.Minute;
        }
        public Day Day
        {
            get => Duration.Day;
        }

        public DayTime(int timestamp)
        {
            int normalisedTimestamp = CircularNumber.Get(timestamp, Duration.SECOND_IN_WEEK);
            Duration = new Duration(normalisedTimestamp);
        }

        public DayTime Add(Duration duration)
        {
            return new DayTime(Duration.Timestamp + duration.Timestamp);
        }

        public DayTime Subtract(Duration duration)
        {
            return new DayTime(Duration.Timestamp - duration.Timestamp);
        }
    }
}
