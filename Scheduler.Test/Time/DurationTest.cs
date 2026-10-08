using Scheduler.Time;

namespace Scheduler.Test.Time
{
    public class DurationTest
    {
        [Theory]
        [InlineData(0, 0, 0, 0, 0, 0)]
        [InlineData(1, 1, 0, 0, 0, 0)]
        [InlineData(60, 0, 1, 0, 0, 0)]
        [InlineData(3600, 0, 0, 1, 0, 0)]
        [InlineData(86400, 0, 0, 0, 1, 0)]
        [InlineData(604800, 0, 0, 0, 0, 1)]
        public void Duration_FromTimestamp_ReturnsCorrectValues(
            int timestamp,
            int expectedSecond,
            int expectedMinute,
            int expectedHour,
            int expectedDay,
            int expectedWeek
        )
        {
            var duration = new Duration(timestamp);

            Assert.Equal(expectedSecond, duration.Second);
            Assert.Equal(expectedMinute, duration.Minute);
            Assert.Equal(expectedHour, duration.Hour);
            Assert.Equal(expectedDay, duration.Day.Index);
            Assert.Equal(expectedWeek, duration.Week);
        }
    }
}
