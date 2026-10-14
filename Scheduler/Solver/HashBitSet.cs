namespace Scheduler.Solver
{
    public sealed class HashBitSet
    {
        // 2^32 bits / 64 bits per ulong
        private readonly ulong[] bits = new ulong[1 << 26];

        public bool Add(uint hash)
        {
            int index = (int)(hash >> 6);
            int position = (int)(hash & 63);
            ulong mask = 1UL << position;
            bool exists = (bits[index] & mask) != 0;
            bits[index] |= mask;
            return !exists;
        }

        public bool Contains(uint hash)
        {
            int index = (int)(hash >> 6);
            int position = (int)(hash & 63);
            ulong mask = 1UL << position;
            return (bits[index] & mask) != 0;
        }

        public void Remove(uint hash)
        {
            int index = (int)(hash >> 6);
            int position = (int)(hash & 63);

            bits[index] &= ~(1UL << position);
        }
    }
}
