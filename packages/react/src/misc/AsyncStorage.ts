import { PREFIX } from "../constants";

export interface AsyncStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export type CreateAsyncStorage = (name: string) => AsyncStorage;

export class AsyncLocalStorage implements AsyncStorage {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getItem(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      resolve(localStorage.getItem(`${PREFIX}/${this.name}/${key}`));
    });
  }

  setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(`${PREFIX}/${this.name}/${key}`, value);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  removeItem(key: string): Promise<void> {
    return new Promise((resolve) => {
      resolve(localStorage.removeItem(`${PREFIX}/${this.name}/${key}`));
    });
  }
}

export function createAsyncLocalStorage(name: string) {
  return new AsyncLocalStorage(name);
}
