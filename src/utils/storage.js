

class Storage {
  static serialize(val) {
    return JSON.stringify(val);
  }

  static deserialize(val) {
    if (typeof val !== 'string') {
      return undefined;
    }
    try {
      return JSON.parse(val);
    } catch (e) {
      return val || undefined;
    }
  }

  constructor(type) {
    this.storage = type === 'session' ? window.sessionStorage : window.localStorage;
  }

  remove(key) {
    this.storage.removeItem(key);
  }

  has(key) {
    return this.get(key) !== undefined || this.get(key) !== null;
  }

  set(key, val) {
    if (val === undefined || val === null) {
      return this.remove(key);
    }
    this.storage.setItem(key, Storage.serialize(val));
    return val;
  }

  get(key) {
    return Storage.deserialize(this.storage.getItem(key));
  }

  clear() {
    this.storage.clear();
  }

  getAll() {
    const result = {};
    for (let i = 0; i < this.storage.length; i++) {
      let key = this.storage.key(i);
      result[key] = this.get(key);
    }
    return result;
  }
};

export const session = new Storage('session');
export const storage = new Storage('local');
