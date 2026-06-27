export function getCircularNumber(index: number, size: number): number {
  return (((index + size) % size) + size) % size;
}

export function zeroPad(value: number, length?: number) {
  return value.toString().padStart(length ?? 2, "0");
}

export class SafeMap<K, V> {
  private store: Map<K, V> = new Map();

  public constructor(private readonly createDefault: () => V) {}

  public get(key: K): V {
    const value = this.store.get(key);
    if (value !== undefined) {
      return value;
    }
    const defaultValue = this.createDefault();
    this.store.set(key, defaultValue);
    return defaultValue;
  }

  public set(key: K, value: V): void {
    this.store.set(key, value);
  }

  public keys(): IterableIterator<K> {
    return this.store.keys();
  }

  public values(): IterableIterator<V> {
    return this.store.values();
  }

  public entries(): IterableIterator<[K, V]> {
    return this.store.entries();
  }
}

export class MapSet<K, V> extends SafeMap<K, Set<V>> {
  public constructor() {
    super(() => new Set<V>());
  }
}
