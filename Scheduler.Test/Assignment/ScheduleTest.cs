using Scheduler.Assignment;
using Scheduler.Time;

namespace Scheduler.Test.Assignment
{
    public class ScheduleTest
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

        public void Assign_AssigningTimeSlotOrEmployee_AddedToBothCollectionsIfEligible()
        {
            Employee[] employees = morningEmployees
                .Concat(noonEmployees)
                .Concat(nightEmployees)
                .ToArray();

            var eligibility = new Eligibility();
            eligibility.Assign(morning, morningEmployees);
            eligibility.Assign(noon, noonEmployees);
            eligibility.Assign(night, nightEmployees);

            var schedule = new Schedule(eligibility);
            schedule.Assign(morning, employees);
            schedule.Assign(noon, employees);
            schedule.Assign(night, employees);

            Assert.Equivalent(schedule[morning], morningEmployees);
            Assert.Equivalent(schedule[noon], noonEmployees);
            Assert.Equivalent(schedule[night], nightEmployees);

            Assert.All(
                morningEmployees,
                employee => Assert.Equivalent(schedule[employee].Contains(morning), true)
            );
            Assert.All(
                noonEmployees,
                employee => Assert.Equivalent(schedule[employee].Contains(noon), true)
            );
            Assert.All(
                nightEmployees,
                employee => Assert.Equivalent(schedule[employee].Contains(night), true)
            );
        }
    }
}
