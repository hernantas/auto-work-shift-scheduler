using Scheduler.Assignment;
using Scheduler.Time;

namespace Scheduler.Test.Assignment
{
    public class EligibilityTest
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
        public void Assign_AssigningTimeSlotOrEmployee_AddedToBothCollections()
        {
            var registry = new Eligibility();

            registry.Assign(morning, morningEmployees);
            registry.Assign(noon, noonEmployees);
            registry.Assign(night, nightEmployees);

            Assert.Equivalent(registry[morning], morningEmployees);
            Assert.Equivalent(registry[noon], noonEmployees);
            Assert.Equivalent(registry[night], nightEmployees);

            Assert.All(
                morningEmployees,
                employee => Assert.Equivalent(registry[employee].Contains(morning), true)
            );
            Assert.All(
                noonEmployees,
                employee => Assert.Equivalent(registry[employee].Contains(noon), true)
            );
            Assert.All(
                nightEmployees,
                employee => Assert.Equivalent(registry[employee].Contains(night), true)
            );
        }
    }
}
