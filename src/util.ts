export function getCircularNumber(index: number, size: number): number {
  return (((index + size) % size) + size) % size;
}

export function zeroPad(value: number, length?: number) {
  return value.toString().padStart(length ?? 2, "0");
}

export class MapSet<K, V> {
  private readonly store: Map<K, Set<V>> = new Map();

  public get(key: K): Set<V> {
    const value = this.store.get(key);
    if (value !== undefined) {
      return value;
    }

    const newValue = new Set<V>();
    this.store.set(key, newValue);
    return newValue;
  }

  public keys(): IterableIterator<K> {
    return this.store.keys();
  }

  public values(): IterableIterator<Set<V>> {
    return this.store.values();
  }

  public entries(): IterableIterator<[K, Set<V>]> {
    return this.store.entries();
  }
}
