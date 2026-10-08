namespace Scheduler.Time
{
    public class Duration
    {
        public const int DAY_IN_WEEK = 7;
        public const int HOUR_IN_DAY = 24;
        public const int HOUR_IN_WEEK = DAY_IN_WEEK * HOUR_IN_DAY;
        public const int MINUTE_IN_HOUR = 60;
        public const int MINUTE_IN_DAY = HOUR_IN_DAY * MINUTE_IN_HOUR;
        public const int MINUTE_IN_WEEK = HOUR_IN_WEEK * MINUTE_IN_HOUR;
        public const int SECOND_IN_MINUTE = 60;
        public const int SECOND_IN_HOUR = MINUTE_IN_HOUR * SECOND_IN_MINUTE;
        public const int SECOND_IN_DAY = MINUTE_IN_DAY * SECOND_IN_MINUTE;
        public const int SECOND_IN_WEEK = MINUTE_IN_WEEK * SECOND_IN_MINUTE;

        public static readonly Duration Zero = new Duration(0);

        public static Duration OfSecond(int second) => new Duration(second);

        public static Duration OfMinute(int minute) => new Duration(minute * SECOND_IN_MINUTE);

        public static Duration OfHour(int hour) => new Duration(hour * SECOND_IN_HOUR);

        public static Duration OfDay(int day) => new Duration(day * SECOND_IN_DAY);

        public static Duration OfWeek(int week) => new Duration(week * SECOND_IN_WEEK);

        public int Timestamp { get; }
        public int Second { get; }
        public int Minute { get; }
        public int Hour { get; }
        public Day Day { get; }
        public int Week { get; }

        public Duration(int timestamp)
        {
            Timestamp = timestamp;
            Second = timestamp % SECOND_IN_MINUTE;
            Minute = timestamp / SECOND_IN_MINUTE % MINUTE_IN_HOUR;
            Hour = timestamp / SECOND_IN_HOUR % HOUR_IN_DAY;
            Day = Day.Get(timestamp / SECOND_IN_DAY);
            Week = timestamp / SECOND_IN_WEEK;
        }

        public Duration Add(Duration duration) => new Duration(Timestamp + duration.Timestamp);

        public Duration Subtract(Duration duration) => new Duration(Timestamp - duration.Timestamp);
    }
}
