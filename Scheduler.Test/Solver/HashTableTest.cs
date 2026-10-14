using Scheduler.Assignment;
using Scheduler.Solver;
using Scheduler.Time;

namespace Scheduler.Test.Solver
{
    public class HashTableTest
    {
        private readonly TimeSlot morning = new(
            "Morning",
            new DayTime(Duration.OfHour(6)),
            Duration.OfHour(9)
        );
        private readonly TimeSlot noon = new(
            "Noon",
            new DayTime(Duration.OfHour(14)),
            Duration.OfHour(9)
        );
        private readonly TimeSlot night = new(
            "Night",
            new DayTime(Duration.OfHour(22)),
            Duration.OfHour(9)
        );

        private readonly Employee[] morningEmployees = Enumerable
            .Range(1, 3)
            .Select(i => new Employee($"Employee {i}"))
            .ToArray();
        private readonly Employee[] noonEmployees = Enumerable
            .Range(4, 6)
            .Select(i => new Employee($"Employee {i}"))
            .ToArray();
        private readonly Employee[] nightEmployees = Enumerable
            .Range(7, 9)
            .Select(i => new Employee($"Employee {i}"))
            .ToArray();

        [Fact]
        public void HashTable_GenerateUniqueHash()
        {
            TimeSlot[] slots = [morning, noon, night];
            Employee[] employees = morningEmployees
                .Concat(noonEmployees)
                .Concat(nightEmployees)
                .ToArray();
            var table = new HashTable(slots, employees);
            var hashes = slots
                .SelectMany(slot => employees.Select(employee => table[slot, employee]))
                .ToHashSet();

            Assert.Equal(hashes.Count, slots.Length * employees.Length);
        }
    }
}
