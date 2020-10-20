//key
//sd - self described
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
  storeItemToLocalStorage,
  storeObjectToLocalStorage,
  stringifyObject,
} from '../util/util';
import {_StoreKey_, _StoreSnapshot_} from './actions-and-stores-data';
import {toJS} from "mobx";
import StoreProviders from "./stores-providers";

/**
 * sd _ Kaybarax
 * @returns {object}
 * @param storeKey
 * @param storeProvider
 * @param storeNamespace
 */
export async function persistedStoreFromLocalStorage(storeKey, storeProvider, storeNamespace) {

  let savedStore = await getObjectFromLocalStorage(storeKey);
  console.log('FOUND PERSISTED STORE', savedStore);

  if (isNullUndefined(savedStore)) {
    return null;
  }

  //if store schema is updated, then update persisted store model
  let storeFromSchema = storeProvider.storeProvidedBy(storeNamespace);
  let matchingKeys = objectAHasSameKeysAsObjectB(savedStore, storeFromSchema);
  console.log('Store schema has not changed', matchingKeys);
  console.log('For store', storeFromSchema['storeName']);

  if (!matchingKeys) {

    //remove deleted/renamed keys
    for (let key in savedStore) {
      if (!objectKeyExists(storeFromSchema, key)) {
        delete savedStore[key];
      }
    }

    //add added keys
    for (let key in storeFromSchema) {
      if (!objectKeyExists(savedStore, key)) {
        savedStore[key] = storeFromSchema[key];
      }
    }

    //break memory reference
    savedStore = deepCloneObject(savedStore);

    //update persisted store
    await storeObjectToLocalStorage(storeKey, storeFromSchema);

  }

  //if internal structure has changed, also do an update
  let storeModelSnapshot = await storeProvider.storeModelSnapshot;
  console.log('storeModelSnapshot', storeModelSnapshot);

  if (isNullUndefined(storeModelSnapshot)) {
    return savedStore;
  }

  let fromStoreSchema = deepCloneObject(storeFromSchema);
  delete fromStoreSchema['storeName'];
  delete fromStoreSchema['storeKey'];
  delete fromStoreSchema['namespace'];

  let fromStoreModelSnapshot = deepCloneObject(storeModelSnapshot);
  delete fromStoreModelSnapshot['storeName'];
  delete fromStoreModelSnapshot['storeKey'];
  delete fromStoreModelSnapshot['namespace'];

  console.log('fromStoreSchema', fromStoreSchema);
  console.log('fromStoreModelSnapshot', fromStoreModelSnapshot);

  if (stringifyObject(fromStoreSchema) !== stringifyObject(fromStoreModelSnapshot)) {

    console.log('internalStructureChanged');

    //update internal changes
    for (let key in fromStoreSchema) {
      if (
          objectKeyExists(fromStoreModelSnapshot, key) &&
          (stringifyObject(fromStoreSchema[key] !== stringifyObject(fromStoreModelSnapshot[key])))
      ) {
        //don't care about data, override,
        // because structure has changed
        savedStore[key] = fromStoreSchema[key];
      }
    }

    //break memory reference
    savedStore = deepCloneObject(savedStore);

    //update persisted store
    storeObjectToLocalStorage(storeKey, savedStore);

    //update snapshot
    storeObjectToLocalStorage(_StoreSnapshot_ + storeFromSchema.storeName, storeFromSchema);

  }

  return savedStore;

}

/**
 * sd _ Kaybarax
 * @param store
 */
export async function persistStoreToLocalStorage(store) {
  console.log('persistStoreToLocalStorage store', toJS(store));
  try {
    let storeKey = store.storeKey;
    console.log('persistStoreToLocalStorage storeKey', storeKey);
    //only persist if data has changed
    let oldStoreData = await getObjectFromLocalStorage(storeKey);
    let newStoreData = toJS(store);
    console.log('persistStoreToLocalStorage oldStoreData', oldStoreData);
    console.log('persistStoreToLocalStorage newStoreData', newStoreData);
    if (stringifyObject(oldStoreData) === stringifyObject(newStoreData)) {
      return;
    }
    console.log('persistStoreToLocalStorage DATA CHANGED FOR STORE', store.storeName);
    await storeObjectToLocalStorage(storeKey, newStoreData);
    //store the current store model snapshot, if not there already,
    //for store object's internal structural changes, monitoring and update
    let storeModelSnapshot = await getItemFromLocalStorage(_StoreSnapshot_ + store.storeName);
    console.log('persistStoreToLocalStorage storeModelSnapshot', storeModelSnapshot);
    if (isNullUndefined(storeModelSnapshot)) {
      let storeProvider = StoreProviders[store.storeName];
      console.log('persistStoreToLocalStorage storeProvider', storeProvider);
      await storeObjectToLocalStorage(_StoreSnapshot_ + store.storeName, storeProvider.storeProvidedBy(store.namespace));
      console.log('persistStoreToLocalStorage storeModelSnapshot added');
    }
    console.log('persistStoreToLocalStorage SUCCESS');
  } catch (err) {
    console.log('persistStoreToLocalStorage failure!!');
    console.log('Critical failure in persistence of a store!!');
    //and stop persistence
    clearAllPersistedStoresToLocalStorage();
  }
}

/**
 * sd _ Kaybarax
 * @param stores
 * @returns {Promise<void>}
 */
export async function persistStoresToLocalStorage(stores) {
  console.log('persistStoresToLocalStorage stores', stores);
  try {
    for (let store of stores) {
      await persistStoreToLocalStorage(store);
    }
  } catch (err) {
    console.log('persistStoresToLocalStorage failure!!');
    console.log('Critical failure in persistence of stores!!');
    //and stop persistence
    clearAllPersistedStoresToLocalStorage();
  }
}

/**
 * sd _ Kaybarax
 * @param stores
 */
export const persistStoreUpdatesLocalStorageOnEvent = (stores) => {
  try {
    persistStoresToLocalStorage(stores).then(null);
  } catch (err) {
    console.log('persistStoreUpdatesLocalStorageOnEvent failure!!');
  }
};

/**
 * sd _ Kaybarax
 * @param storeKey
 */
export function clearPersistedStoreFromLocalStorage(storeKey) {
  localStorage.removeItem(storeKey);
}

/**
 * sd _ Kaybarax
 */
export function clearAllPersistedStoresToLocalStorage() {
  try {
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      let storeKey = '' + key;
      if (storeKey.includes(_StoreKey_) ||
          storeKey.includes(_StoreSnapshot_)) {
        clearPersistedStoreFromLocalStorage(storeKey);
      }
    }
  } catch (e) {
    console.log(
        'Unable to export function clearAllPersistedStoresToLocalStorage() {\n!!',
    );
  }
}

/**
 * sd _ Kaybarax
 * @param namespaceProvider
 * @param assignedName
 * @returns {*}
 */
export function getPersistedStoreKey(namespaceProvider, assignedName) {
  return namespaceProvider + assignedName;
}

/**
 * sd _ Kaybarax
 * @param stores
 */
export function persistStoreUpdatesToLocalStorageOnPossibleUpdateOfEvents(stores) {
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

/**
 * sd _ by Kaybarax
 */
export function unregisterPersistenceEventListeners() {
  window.removeEventListener('mouseup', persistStoreUpdatesLocalStorageOnEvent);
  window.removeEventListener('mousemove', persistStoreUpdatesLocalStorageOnEvent);
  window.removeEventListener('keyup', persistStoreUpdatesLocalStorageOnEvent);
}

/**
 * sd _ Kaybarax
 * @param storeName
 * @param storeSchemaInstance
 * @returns {Promise<T | *>}
 */
export function createStoreModelSnapshot(storeName, storeSchemaInstance) {
  console.log('createStoreModelSnapshot');
  return getObjectFromLocalStorage(_StoreSnapshot_ + storeName)
      .then(item => item || storeSchemaInstance)
      .catch(error => {
        console.log('createStoreModelSnapshot error', error);
        return storeSchemaInstance;
      });
}
