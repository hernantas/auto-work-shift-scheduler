using System.Collections;
using System.Diagnostics.CodeAnalysis;

namespace Scheduler.Util
{
    public class SafeDictionary<TKey, TValue> : IDictionary<TKey, TValue>
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

        public ICollection<TKey> Keys => _dictionary.Keys;

        public ICollection<TValue> Values => _dictionary.Values;

        public int Count => _dictionary.Count;

        public bool IsReadOnly => false;

        public void Add(TKey key, TValue value) => _dictionary.Add(key, value);

        public void Add(KeyValuePair<TKey, TValue> item) => _dictionary.Add(item.Key, item.Value);

        public void Clear() => _dictionary.Clear();

        public bool Contains(KeyValuePair<TKey, TValue> item) => _dictionary.Contains(item);

        public bool ContainsKey(TKey key) => _dictionary.ContainsKey(key);

        public void CopyTo(KeyValuePair<TKey, TValue>[] array, int arrayIndex) =>
            throw new NotImplementedException();

        public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator() =>
            _dictionary.GetEnumerator();

        public bool Remove(TKey key) => _dictionary.Remove(key);

        public bool Remove(KeyValuePair<TKey, TValue> item) => _dictionary.Remove(item.Key);

        public bool TryGetValue(TKey key, [MaybeNullWhen(false)] out TValue value) =>
            _dictionary.TryGetValue(key, out value);

        IEnumerator IEnumerable.GetEnumerator() => _dictionary.GetEnumerator();
    }
}
