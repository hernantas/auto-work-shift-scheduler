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

        [Theory]
        [InlineData(3600, 1800, 5400)]
        [InlineData(1800, 3600, 5400)]
        public void Add_ShouldReturnCorrectDuration(
            int timestamp1,
            int timestamp2,
            int expectedTimestamp
        )
        {
            var duration1 = new Duration(timestamp1);
            var duration2 = new Duration(timestamp2);
            var result = duration1.Add(duration2);
            Assert.Equal(expectedTimestamp, result.Timestamp);
        }

        [Theory]
        [InlineData(5400, 1800, 3600)]
        [InlineData(3600, 1800, 1800)]
        public void Subtract_ShouldReturnCorrectDuration(
            int timestamp1,
            int timestamp2,
            int expectedTimestamp
        )
        {
            var duration1 = new Duration(timestamp1);
            var duration2 = new Duration(timestamp2);
            var result = duration1.Subtract(duration2);
            Assert.Equal(expectedTimestamp, result.Timestamp);
        }
    }
}
