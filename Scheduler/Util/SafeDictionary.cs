namespace Scheduler.Util
{
    public class SafeDictionary<TKey, TValue>
        where TKey : notnull
        where TValue : notnull
    {
        private readonly Dictionary<TKey, TValue> _dictionary = new Dictionary<TKey, TValue>();

        private readonly Func<TKey, TValue> factory;

        public SafeDictionary(Func<TKey, TValue> factory)
        {
            this.factory = factory;
        }

        public TValue this[TKey key]
        {
            get
            {
                if (!_dictionary.TryGetValue(key, out TValue? value))
                {
                    value = factory(key);
                    _dictionary[key] = value;
                }

                return value;
            }
            set { _dictionary[key] = value; }
        }

        public void Clear() => _dictionary.Clear();
    }
}
