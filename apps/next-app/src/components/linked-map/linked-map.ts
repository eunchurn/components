type LinkedEntry<K, V> = {
  key: K;
  value: V;
  next: LinkedEntry<K, V> | null;
  link_next: LinkedEntry<K, V> | null;
  link_prev: LinkedEntry<K, V> | null;
};

class LinkedMap<K, V> {
  private table: Array<LinkedEntry<K, V> | null>;
  private header: LinkedEntry<K, V>;
  private count: number;
  private loadFactor: number;
  private threshold: number;
  private max: number;

  constructor(initCapacity: number = 101, loadFactor: number = 0.75) {
    this.table = new Array(initCapacity).fill(null);
    this.header = this.createEntry({} as K, null as unknown as V, null);
    this.header.link_next = this.header.link_prev = this.header;
    this.count = 0;
    this.loadFactor = loadFactor;
    this.threshold = Math.floor(initCapacity * loadFactor);
    this.max = 0;
  }

  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      const char = keyString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  private createEntry(key: K, value: V, next: LinkedEntry<K, V> | null): LinkedEntry<K, V> {
    return {
      key,
      value,
      next,
      link_next: null,
      link_prev: null,
    };
  }

  public size(): number {
    return this.count;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public put(key: K, value: V): V | null {
    const index = this.hash(key) % this.table.length;
    for (let e = this.table[index]; e != null; e = e.next) {
      if (e.key === key) {
        const oldValue = e.value;
        e.value = value;
        return oldValue;
      }
    }

    if (this.count >= this.threshold) {
      this.rehash();
    }

    const e = this.createEntry(key, value, this.table[index]);
    this.table[index] = e;
    this.chain(this.header.link_prev!, this.header, e);
    this.count++;
    return null;
  }

  public get(key: K): V | null {
    const index = this.hash(key) % this.table.length;
    for (let e = this.table[index]; e != null; e = e.next) {
      if (e.key === key) {
        return e.value;
      }
    }
    return null;
  }

  public remove(key: K): V | null {
    const index = this.hash(key) % this.table.length;
    let prev: LinkedEntry<K, V> | null = null;
    for (let e = this.table[index]; e != null; prev = e, e = e.next) {
      if (e.key === key) {
        if (prev != null) {
          prev.next = e.next;
        } else {
          this.table[index] = e.next;
        }
        this.count--;
        const oldValue = e.value;
        this.unchain(e);
        return oldValue;
      }
    }
    return null;
  }

  private rehash(): void {
    const oldTable = this.table;
    const newCapacity = oldTable.length * 2 + 1;
    const newTable: Array<LinkedEntry<K, V> | null> = new Array(newCapacity).fill(null);
    this.threshold = Math.floor(newCapacity * this.loadFactor);
    this.table = newTable;

    for (let i = oldTable.length - 1; i >= 0; i--) {
      for (let old = oldTable[i]; old != null;) {
        const e = old;
        old = old.next;
        const index = this.hash(e.key) % newCapacity;
        e.next = newTable[index];
        newTable[index] = e;
      }
    }
  }

  private chain(link_prev: LinkedEntry<K, V>, link_next: LinkedEntry<K, V>, e: LinkedEntry<K, V>): void {
    e.link_prev = link_prev;
    e.link_next = link_next;
    link_prev.link_next = e;
    link_next.link_prev = e;
  }

  private unchain(e: LinkedEntry<K, V>): void {
    e.link_prev!.link_next = e.link_next;
    e.link_next!.link_prev = e.link_prev;
    e.link_prev = null;
    e.link_next = null;
  }

  public clear(): void {
    this.table.fill(null);
    this.header.link_next = this.header.link_prev = this.header;
    this.count = 0;
  }

  public keys(): IterableIterator<K> {
    return this.iterate('key');
  }

  public values(): IterableIterator<V> {
    return this.iterate('value');
  }

  public entries(): IterableIterator<[K, V]> {
    return this.iterate('entry');
  }

  private *iterate(type: 'key' | 'value' | 'entry'): IterableIterator<any> {
    let e = this.header.link_next;
    while (e !== this.header && e !== null) {
      if (type === 'key') yield e.key;
      else if (type === 'value') yield e.value;
      else yield [e.key, e.value];
      e = e.link_next;
    }
  }
}

export default LinkedMap;