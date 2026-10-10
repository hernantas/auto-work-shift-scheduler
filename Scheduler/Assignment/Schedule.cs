using Scheduler.Util;

namespace Scheduler.Assignment
{
    public class Schedule
    {
        private readonly SafeDictionary<TimeSlot, HashSet<Employee>> slots = new(
            key => new HashSet<Employee>()
        );
        private readonly SafeDictionary<Employee, HashSet<TimeSlot>> employees = new(
            key => new HashSet<TimeSlot>()
        );
        private readonly Eligibility eligibility;

        public Employee[] this[TimeSlot slot] => slots[slot].ToArray();
        public TimeSlot[] this[Employee employee] => employees[employee].ToArray();

        public Schedule(Eligibility eligibility)
        {
            this.eligibility = eligibility;
        }

        public void Assign(TimeSlot slot, Employee employee)
        {
            if (eligibility[slot].Contains(employee))
            {
                slots[slot].Add(employee);
                employees[employee].Add(slot);
            }
        }

        public void Assign(Employee employee, TimeSlot slot)
        {
            Assign(slot, employee);
        }

        public void Assign(TimeSlot slot, params Employee[] employees)
        {
            foreach (var employee in employees)
            {
                Assign(slot, employee);
            }
        }

        public void Assign(Employee employee, TimeSlot[] slots)
        {
            foreach (var slot in slots)
            {
                Assign(employee, slot);
            }
        }

        public void Assign(Employee[] employees, TimeSlot[] slots)
        {
            foreach (var slot in slots)
            {
                foreach (var employee in employees)
                {
                    Assign(slot, employee);
                }
            }
        }

        public void Assign(TimeSlot[] slots, Employee[] employees)
        {
            foreach (var slot in slots)
            {
                foreach (var employee in employees)
                {
                    Assign(slot, employee);
                }
            }
        }

        public void Unnasign(TimeSlot slot, Employee employee)
        {
            slots[slot].Remove(employee);
            employees[employee].Remove(slot);
        }

        public void Unnasign(Employee employee, TimeSlot slot)
        {
            Unnasign(slot, employee);
        }

        public void Unnasign(TimeSlot slot, params Employee[] employees)
        {
            foreach (var employee in employees)
            {
                Unnasign(slot, employee);
            }
        }

        public void Unnasign(Employee employee, TimeSlot[] slots)
        {
            foreach (var slot in slots)
            {
                Unnasign(employee, slot);
            }
        }

        public void Unnasign(Employee[] employees, TimeSlot[] slots)
        {
            foreach (var slot in slots)
            {
                foreach (var employee in employees)
                {
                    Unnasign(slot, employee);
                }
            }
        }

        public void Unnasign(TimeSlot[] slots, Employee[] employees)
        {
            foreach (var slot in slots)
            {
                foreach (var employee in employees)
                {
                    Unnasign(slot, employee);
                }
            }
        }
    }
}
