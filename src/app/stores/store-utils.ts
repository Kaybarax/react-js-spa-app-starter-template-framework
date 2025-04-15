/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {
  deepCloneObject,
  getItemFromLocalStorage,
  getObjectFromLocalStorage,
  isNullUndefined,
  objectAHasSameKeysAsObjectB,
  objectKeyExists,
  storeObjectToLocalStorage,
  stringifyObject,
} from '../util/util';
import { STORE_KEY_SUFFIX, STORE_SNAPSHOT_PREFIX } from './actions-and-stores-data';
import { toJS } from 'mobx';
import StoreProviders from './stores-providers';

// Define a generic store type
export interface Store {
  storeKey: string;
  storeName: string;
  namespace: string;
  [key: string]: unknown;
}

export async function persistedStoreFromLocalStorage(storeKey: string, storeNamespace: string): Promise<Store | null> {
  let savedStore = await getObjectFromLocalStorage(storeKey);
  console.log('FOUND PERSISTED STORE', savedStore);

  if (isNullUndefined(savedStore)) {
    return null;
  }

  //if store schema is updated, then update persisted store model

  const storeProvider = StoreProviders[storeKey];

  const storeFromSchema = storeProvider.storeProvidedBy(storeNamespace);
  const matchingKeys = objectAHasSameKeysAsObjectB(savedStore as Record<string, unknown>, storeFromSchema);
  console.log('Store schema has not changed', matchingKeys);
  console.log('For store', storeFromSchema['storeName']);

  if (!matchingKeys) {
    //remove deleted/renamed keys
    for (const key in savedStore as Record<string, unknown>) {
      if (!objectKeyExists(storeFromSchema, key)) {
        delete (savedStore as Record<string, unknown>)[key];
      }
    }

    //add added keys
    for (const key in storeFromSchema) {
      if (!objectKeyExists(savedStore as Record<string, unknown>, key)) {
        (savedStore as Record<string, unknown>)[key] = storeFromSchema[key];
      }
    }

    //break memory reference
    savedStore = deepCloneObject(savedStore);

    //update persisted store
    storeObjectToLocalStorage(storeKey, savedStore);
  }

  //if internal structure has changed, also do an update
  const storeModelSnapshot = await storeProvider.storeModelSnapshot;
  console.log('storeModelSnapshot', storeModelSnapshot);

  if (isNullUndefined(storeModelSnapshot)) {
    return savedStore as Store;
  }

  const fromStoreSchema = deepCloneObject(storeFromSchema) as Record<string, unknown>;
  delete (fromStoreSchema as Record<string, unknown>)['storeName'];
  delete fromStoreSchema['storeKey'];
  delete fromStoreSchema['namespace'];

  const fromStoreModelSnapshot = deepCloneObject(storeModelSnapshot) as Record<string, unknown>;
  delete fromStoreModelSnapshot['storeName'];
  delete fromStoreModelSnapshot['storeKey'];
  delete fromStoreModelSnapshot['namespace'];

  console.log('fromStoreSchema', fromStoreSchema);
  console.log('fromStoreModelSnapshot', fromStoreModelSnapshot);

  if (stringifyObject(fromStoreSchema) !== stringifyObject(fromStoreModelSnapshot)) {
    console.log('internalStructureChanged');

    //update internal changes
    for (const key in fromStoreSchema) {
      if (
        objectKeyExists(fromStoreModelSnapshot, key) &&
        stringifyObject(fromStoreSchema[key]) !== stringifyObject(fromStoreModelSnapshot[key])
      ) {
        //don't care about data, override,
        // because structure has changed
        (savedStore as Record<string, unknown>)[key] = fromStoreSchema[key];
      }
    }

    //break memory reference
    savedStore = deepCloneObject(savedStore);

    //update persisted store
    storeObjectToLocalStorage(storeKey, savedStore);

    //update snapshot
    storeObjectToLocalStorage(STORE_SNAPSHOT_PREFIX + storeFromSchema.storeName, storeFromSchema);
  }

  return savedStore as Store;
}

export async function persistStoreToLocalStorage(store: Store): Promise<void> {
  console.log('persistStoreToLocalStorage store', toJS(store));
  try {
    const storeKey = store.storeKey;
    console.log('persistStoreToLocalStorage storeKey', storeKey);
    //only persist if data has changed
    const oldStoreData = await getObjectFromLocalStorage(storeKey);
    const newStoreData = toJS(store);
    console.log('persistStoreToLocalStorage oldStoreData', oldStoreData);
    console.log('persistStoreToLocalStorage newStoreData', newStoreData);
    if (stringifyObject(oldStoreData) === stringifyObject(newStoreData)) {
      return;
    }
    console.log('persistStoreToLocalStorage DATA CHANGED FOR STORE', store.storeName);
    storeObjectToLocalStorage(storeKey, newStoreData);
    //store the current store model snapshot, if not there already,
    //for store object's internal structural changes, monitoring and update
    const storeModelSnapshot = await getItemFromLocalStorage(STORE_SNAPSHOT_PREFIX + store.storeName);
    console.log('persistStoreToLocalStorage storeModelSnapshot', storeModelSnapshot);
    if (isNullUndefined(storeModelSnapshot)) {
      const storeProvider = StoreProviders[store.storeName as keyof typeof StoreProviders];
      console.log('persistStoreToLocalStorage storeProvider', storeProvider);
      storeObjectToLocalStorage(
        STORE_SNAPSHOT_PREFIX + store.storeName,
        storeProvider.storeProvidedBy(store.namespace),
      );
      console.log('persistStoreToLocalStorage storeModelSnapshot added');
    }
    console.log('persistStoreToLocalStorage SUCCESS');
  } catch {
    console.log('persistStoreToLocalStorage failure!!');
    console.log('Critical failure in persistence of a store!!');
    //and stop persistence
    clearAllPersistedStoresToLocalStorage();
  }
}

export async function persistStoresToLocalStorage(stores: Store[]): Promise<void> {
  console.log('persistStoresToLocalStorage stores', stores);
  try {
    for (const store of stores) {
      await persistStoreToLocalStorage(store);
    }
  } catch {
    console.log('persistStoresToLocalStorage failure!!');
    console.log('Critical failure in persistence of stores!!');
    //and stop persistence
    clearAllPersistedStoresToLocalStorage();
  }
}

export const persistStoreUpdatesLocalStorageOnEvent = (stores: Store[]): void => {
  try {
    persistStoresToLocalStorage(stores).then(null);
  } catch {
    console.log('persistStoreUpdatesLocalStorageOnEvent failure!!');
  }
};

export function clearPersistedStoreFromLocalStorage(storeKey: string): void {
  localStorage.removeItem(storeKey);
}

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

export function getPersistedStoreKey(namespaceProvider: string | null, assignedName: string): string {
  return (namespaceProvider || '') + assignedName;
}

export function persistStoreUpdatesToLocalStorageOnPossibleUpdateOfEvents(stores: Store[]): void {
  window.addEventListener('mouseup', () => {
    // console.log("PERSIST on mouseup registered")
    persistStoreUpdatesLocalStorageOnEvent(stores);
  });
  window.addEventListener('mousemove', () => {
    // console.log("PERSIST on mousedown registered")
    persistStoreUpdatesLocalStorageOnEvent(stores);
  });
  window.addEventListener('keyup', () => {
    // console.log("PERSIST on keyup registered")
    persistStoreUpdatesLocalStorageOnEvent(stores);
  });
}

export function unregisterPersistenceEventListeners(): void {
  // Need to use anonymous functions that match the ones used in addEventListener
  // Can't directly remove persistStoreUpdatesLocalStorageOnEvent as it requires a parameter
  window.removeEventListener('mouseup', () => {});
  window.removeEventListener('mousemove', () => {});
  window.removeEventListener('keyup', () => {});
}

export function createStoreModelSnapshot(storeName: string, storeSchemaInstance: Store): Promise<Store> {
  console.log('createStoreModelSnapshot');
  return getObjectFromLocalStorage(STORE_SNAPSHOT_PREFIX + storeName)
    .then(item => item || storeSchemaInstance)
    .catch(error => {
      console.log('createStoreModelSnapshot error', error);
      return storeSchemaInstance;
    }) as Promise<Store>;
}
