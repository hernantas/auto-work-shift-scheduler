using Scheduler.Time;

namespace Scheduler.Test.Time
{
    public class TimeOfDayTest
    {
        [Theory]
        [InlineData(0, 0)]
        [InlineData(1, 1)]
        [InlineData(Duration.SECOND_IN_MINUTE, Duration.SECOND_IN_MINUTE)]
        [InlineData(Duration.SECOND_IN_HOUR - 1, Duration.SECOND_IN_HOUR - 1)]
        public void TimeOfDay_WithinAWeek_ReturnsNormalDayTime(int timestamp, int expectedTimestamp)
        {
            TimeOfDay time = new TimeOfDay(timestamp);
            Assert.Equal(expectedTimestamp, time.Timestamp);
        }

        [Theory]
        [InlineData(Duration.SECOND_IN_DAY, 0)]
        [InlineData(Duration.SECOND_IN_DAY + 1, 1)]
        [InlineData(Duration.SECOND_IN_MINUTE + Duration.SECOND_IN_DAY, Duration.SECOND_IN_MINUTE)]
        [InlineData(Duration.SECOND_IN_HOUR + Duration.SECOND_IN_DAY, Duration.SECOND_IN_HOUR)]
        public void TimeOfDay_AfterAWeek_ReturnsWarpAroundDayTime(
            int timestamp,
            int expectedTimestamp
        )
        {
            TimeOfDay time = new TimeOfDay(timestamp);
            Assert.Equal(expectedTimestamp, time.Timestamp);
        }

        [Theory]
        [InlineData(-1, Duration.SECOND_IN_DAY - 1)]
        [InlineData(-Duration.SECOND_IN_DAY, 0)]
        public void TimeOfDay_BeforeAWeek_ReturnsWarpAroundDayTime(
            int timestamp,
            int expectedTimestamp
        )
        {
            TimeOfDay time = new TimeOfDay(timestamp);
            Assert.Equal(expectedTimestamp, time.Timestamp);
        }
    }
}
