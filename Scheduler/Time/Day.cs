using Scheduler.Util;

namespace Scheduler.Time
{
    public class Day
    {
        private static readonly string[] Names =
        [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        public static readonly Day[] All = Names
            .Select((name, index) => new Day(index, name))
            .ToArray();
        public static readonly int Length = All.Length;

        public static Day Get(int index) => All[CircularNumber.Get(index, Length)];

        public static Day[] Get(int[] indexes) => indexes.Select(Get).ToArray();

        public int Index { get; }
        public string Name { get; }

        private Day(int index, string name)
        {
            Index = index;
            Name = name;
        }
    }
}
