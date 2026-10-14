namespace Scheduler.Solver
{
    public sealed class HashBitSet
    {
        // 2^32 bits / 64 bits per ulong
        private readonly ulong[] bits = new ulong[1 << 26];

        public bool Add(Hash hash)
        {
            int index = (int)(hash.Value >> 6);
            int position = (int)(hash.Value & 63);
            ulong mask = 1UL << position;
            bool exists = (bits[index] & mask) != 0;
            bits[index] |= mask;
            return !exists;
        }

        public bool Contains(Hash hash)
        {
            int index = (int)(hash.Value >> 6);
            int position = (int)(hash.Value & 63);
            ulong mask = 1UL << position;
            return (bits[index] & mask) != 0;
        }

        public void Remove(Hash hash)
        {
            int index = (int)(hash.Value >> 6);
            int position = (int)(hash.Value & 63);

            bits[index] &= ~(1UL << position);
        }
    }
}
