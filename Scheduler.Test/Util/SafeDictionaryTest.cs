using Scheduler.Util;

namespace Scheduler.Test.Util
{
    public class SafeDictionaryTest
    {
        [Fact]
        public void TestSafeDictionary()
        {
            var dict = new SafeDictionary<int, string>(key => $"Value for {key}");

            // Test that the factory function is called when a key is not present
            Assert.Equal("Value for 1", dict[1]);
            Assert.Equal("Value for 2", dict[2]);

            // Test that the value is stored and retrieved correctly
            dict[3] = "Custom Value";
            Assert.Equal("Custom Value", dict[3]);

            // Test that the factory function is not called again for existing keys
            Assert.Equal("Value for 1", dict[1]);
            Assert.Equal("Value for 2", dict[2]);

            // Test clearing the dictionary
            dict.Clear();
            Assert.Equal("Value for 1", dict[1]); // Should call factory again after clear
        }
    }
}
