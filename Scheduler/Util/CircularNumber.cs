namespace Scheduler.Util
{
    public static class CircularNumber
    {
        public static int Get(int value, int length)
        {
            return (((value + length) % length) + length) % length;
        }
    }
}
