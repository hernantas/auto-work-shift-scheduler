using System.Security.Cryptography;
using Scheduler.Assignment;
using Scheduler.Util;

namespace Scheduler.Solver
{
    public class HashTable
    {
        private readonly SafeDictionary<TimeSlot, SafeDictionary<Employee, Hash>> tables = new(
            slot => new(employee => new Hash())
        );

        public Hash this[TimeSlot slot, Employee employee]
        {
            get => tables[slot][employee];
        }

        public HashTable(TimeSlot[] slots, Employee[] employees)
        {
            for (var i = 0; i < slots.Length; i++)
            {
                for (var j = 0; j < employees.Length; j++)
                {
                    var slot = slots[i];
                    var employee = employees[j];
                    var bytes = RandomNumberGenerator.GetBytes(4);
                    var number = BitConverter.ToUInt32(bytes);
                    var hash = new Hash(number);
                    tables[slot][employee] = hash;
                }
            }
        }
    }
}
