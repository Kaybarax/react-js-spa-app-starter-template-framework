/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { STORE_KEY_SUFFIX, STORE_SNAPSHOT_PREFIX } from './actions-and-stores-data';

// Define a generic store type
export interface Store {
  storeKey: string;
  storeName: string;
  namespace: string;
  [key: string]: unknown;
}

/**
 * Clears a specific store from localStorage
 */
export function clearPersistedStoreFromLocalStorage(storeKey: string): void {
  localStorage.removeItem(storeKey);
}

/**
 * Clears all persisted stores from localStorage
 */
export function clearAllPersistedStoresToLocalStorage(): void {
  try {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      const storeKey = '' + key;
      if (storeKey.includes(STORE_KEY_SUFFIX) || storeKey.includes(STORE_SNAPSHOT_PREFIX)) {
        clearPersistedStoreFromLocalStorage(storeKey);
      }
    }
  } catch {
    console.log('Unable to clear all persisted stores from localStorage');
  }
}

/**
 * Gets the persisted store key
 */
export function getPersistedStoreKey(namespaceProvider: string | null, assignedName: string): string {
  return (namespaceProvider || '') + assignedName;
}

/**
 * Unregisters all persistence event listeners
 * Note: This is a no-op as zustand handles persistence automatically
 */
export function unregisterPersistenceEventListeners(): void {
  console.log('Persistence event listeners unregistered');
  // No need to unregister event listeners as zustand handles persistence automatically
}
