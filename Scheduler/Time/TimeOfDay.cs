using Scheduler.Util;

namespace Scheduler.Time
{
    public class TimeOfDay
    {
        public Duration Duration { get; }

        public int Timestamp
        {
            get => Duration.Timestamp;
        }
        public int Second
        {
            get => Duration.Second;
        }
        public int Minute
        {
            get => Duration.Minute;
        }
        public int Hour
        {
            get => Duration.Hour;
        }

        public TimeOfDay(int timestamp)
        {
            int normalisedTimestamp = CircularNumber.Get(timestamp, Duration.SECOND_IN_DAY);
            Duration = new Duration(normalisedTimestamp);
        }
    }
}
