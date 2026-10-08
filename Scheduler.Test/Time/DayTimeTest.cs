using Scheduler.Time;

namespace Scheduler.Test.Time
{
    public class DayTimeTest
    {
        [Theory]
        [InlineData(0, 0)]
        [InlineData(1, 1)]
        [InlineData(Duration.SECOND_IN_MINUTE, Duration.SECOND_IN_MINUTE)]
        [InlineData(Duration.SECOND_IN_HOUR, Duration.SECOND_IN_HOUR)]
        [InlineData(Duration.SECOND_IN_WEEK - 1, Duration.SECOND_IN_WEEK - 1)]
        public void DayTime_WithinAWeek_ReturnsNormalDayTime(int timestamp, int expectedTimestamp)
        {
            DayTime dayTime = new DayTime(timestamp);
            Assert.Equal(expectedTimestamp, dayTime.Timestamp);
        }

        [Theory]
        [InlineData(Duration.SECOND_IN_WEEK, 0)]
        [InlineData(Duration.SECOND_IN_WEEK + 1, 1)]
        [InlineData(Duration.SECOND_IN_MINUTE + Duration.SECOND_IN_WEEK, Duration.SECOND_IN_MINUTE)]
        [InlineData(Duration.SECOND_IN_HOUR + Duration.SECOND_IN_WEEK, Duration.SECOND_IN_HOUR)]
        public void DayTime_AfterAWeek_ReturnsWarpAroundDayTime(
            int timestamp,
            int expectedTimestamp
        )
        {
            DayTime dayTime = new DayTime(timestamp);
            Assert.Equal(expectedTimestamp, dayTime.Timestamp);
        }

        [Theory]
        [InlineData(-1, Duration.SECOND_IN_WEEK - 1)]
        [InlineData(-Duration.SECOND_IN_WEEK, 0)]
        public void DayTime_BeforeAWeek_ReturnsWarpAroundDayTime(
            int timestamp,
            int expectedTimestamp
        )
        {
            DayTime dayTime = new DayTime(timestamp);
            Assert.Equal(expectedTimestamp, dayTime.Timestamp);
        }
    }
}
