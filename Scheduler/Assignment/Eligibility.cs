using Scheduler.Util;

namespace Scheduler.Assignment
{
    public class Eligibility
    {
        private readonly SafeDictionary<TimeSlot, HashSet<Employee>> slots = new(
            key => new HashSet<Employee>()
        );
        private readonly SafeDictionary<Employee, HashSet<TimeSlot>> employees = new(
            key => new HashSet<TimeSlot>()
        );

        public Employee[] this[TimeSlot slot] => slots[slot].ToArray();
        public TimeSlot[] this[Employee employee] => employees[employee].ToArray();

        public void Assign(TimeSlot slot, params Employee[] employees)
        {
            foreach (var employee in employees)
            {
                slots[slot].Add(employee);
                this.employees[employee].Add(slot);
            }
        }

        public void Assign(Employee employee, params TimeSlot[] slots)
        {
            foreach (var slot in slots)
            {
                this.slots[slot].Add(employee);
                employees[employee].Add(slot);
            }
        }

        public void Unassign(TimeSlot slot, params Employee[] employees)
        {
            foreach (var employee in employees)
            {
                slots[slot].Remove(employee);
                this.employees[employee].Remove(slot);
            }
        }

        public void Unassign(Employee employee, params TimeSlot[] slots)
        {
            foreach (var slot in slots)
            {
                this.slots[slot].Remove(employee);
                employees[employee].Remove(slot);
            }
        }
    }
}
