using Scheduler.Time;

namespace Scheduler.Assignment
{
    public class Employee
    {
        public string Name { get; }
        public int MaxSlot { get; init; } = 6;
        public Duration Rest { get; init; } = Duration.OfHour(8);

        public Employee(string name)
        {
            Name = name;
        }
    }
}
