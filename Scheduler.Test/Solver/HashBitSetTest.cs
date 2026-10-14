using Scheduler.Solver;

namespace Scheduler.Test.Solver
{
    public class HashBitSetTest
    {
        [Theory]
        [InlineData(12345)]
        [InlineData(514353851)]
        [InlineData(2008854244)]
        [InlineData(1358810445)]
        [InlineData(2145345254)]
        [InlineData(3285548026)]
        [InlineData(2226766562)]
        [InlineData(3564912300)]
        [InlineData(3782777029)]
        [InlineData(2326619925)]
        [InlineData(326101165)]
        [InlineData(1365510041)]
        [InlineData(1867313258)]
        [InlineData(2369153912)]
        [InlineData(3023321325)]
        [InlineData(633035925)]
        [InlineData(519519209)]
        [InlineData(2019995334)]
        [InlineData(3440812081)]
        [InlineData(271767651)]
        [InlineData(898662270)]
        [InlineData(1234249178)]
        [InlineData(607903051)]
        [InlineData(3378702690)]
        [InlineData(1473013437)]
        [InlineData(3891238054)]
        [InlineData(384191582)]
        [InlineData(1992183469)]
        [InlineData(4288269119)]
        [InlineData(1608566710)]
        [InlineData(1783586141)]
        [InlineData(3283871532)]
        public void Add_AddingHashes_ReturnsTrueAtFristThenFalse(uint hash)
        {
            var bitset = new HashBitSet();
            Assert.True(bitset.Add(hash));
            Assert.False(bitset.Add(hash));
        }
    }
}
