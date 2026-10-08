using Scheduler.Util;

namespace Scheduler.Test.Util
{
    public class CircularNumberTest
    {
        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        public void Get_WithinRange_ReturnAsIs(int value)
        {
            Assert.Equal(value, CircularNumber.Get(value, 7));
        }

        [Theory]
        [InlineData(7)]
        [InlineData(8)]
        public void Get_AboveRange_ReturnWrapped(int value)
        {
            Assert.Equal(value - 7, CircularNumber.Get(value, 7));
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(-2)]
        public void Get_BelowRange_ReturnWrapped(int value)
        {
            Assert.Equal(value + 7, CircularNumber.Get(value, 7));
        }
    }
}
