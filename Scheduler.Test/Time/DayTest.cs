using Scheduler.Time;

namespace Scheduler.Test.Time
{
    public class DayTest
    {
        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        public void Get_ValidIndex_ReturnsCorrectDay(int index)
        {
            var day = Day.Get(index);
            Assert.Equal(index, day.Index);
        }

        [Theory]
        [InlineData(-1, 6)]
        [InlineData(-2, 5)]
        [InlineData(7, 0)]
        [InlineData(8, 1)]
        public void Get_OutOfRangeIndex_ReturnsWrappedDay(int index, int expectedIndex)
        {
            var day = Day.Get(index);
            Assert.Equal(expectedIndex, day.Index);
            Assert.Equal(Day.All[expectedIndex].Name, day.Name);
        }
    }
}
