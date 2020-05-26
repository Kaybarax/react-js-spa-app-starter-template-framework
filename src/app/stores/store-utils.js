//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {
    getItemFromLocalStorage,
    isNullUndefined,
    objectAHasSameKeysAsObjectB,
    objectKeyExists,
    storeItemToLocalStorage,
    stringifyObject,
} from '../util/util';
import {MobX_StoreKey_Identifier_In_LocalStorage} from './stores-data-store';

/**
 * sd _ Kaybarax
 * @returns {object}
 * @param storeKey
 * @param storeProvider
 * @param storeNamespace
 */
export const persistedStoreFromLocalStorage = (storeKey, storeProvider, storeNamespace) => {
    let savedStore = JSON.parse(localStorage.getItem(storeKey));
    if (isNullUndefined(savedStore)) {
        return null;
    }

    //if store schema is updated, then update persisted store model
    let storeFromSchema = storeProvider.storeProvider(storeNamespace);
    let matchingKeys = objectAHasSameKeysAsObjectB(savedStore, storeFromSchema);
    if (!matchingKeys) {
        //get persisted data to updated store object
        for (let key in savedStore) {
            //if key is still there in new object model
            if (objectKeyExists(storeFromSchema, key)) {
                storeFromSchema[key] = savedStore[key];
            }
        }

        //update persisted store
        localStorage.setItem(storeKey, stringifyObject(storeFromSchema));
        // and return the updated one
        return storeFromSchema;
    }

    //check for internal structural change
    let {currentStoreObjectStructure} = storeProvider;
    if (isNullUndefined(currentStoreObjectStructure)) {
        return null;
    }
    let internalStructureChanged = false;
    for (let key in storeFromSchema) {
        let fromNewStoreSchema = stringifyObject(storeFromSchema[key]);
        let fromCurrentStoreObjectStructure = stringifyObject(currentStoreObjectStructure[key]);
        if (key !== 'storeName' && key !== 'storeKey' && fromNewStoreSchema !== fromCurrentStoreObjectStructure) {
            //update
            currentStoreObjectStructure[key] = storeFromSchema[key];
            //override and update
            savedStore[key] = storeFromSchema[key];
            internalStructureChanged = true;
        }
    }
    if (internalStructureChanged) {
        storeItemToLocalStorage(storeFromSchema.storeName, currentStoreObjectStructure);
        storeItemToLocalStorage(storeKey, savedStore);
    }
    return savedStore;
};

/**
 * sd _ Kaybarax
 * @param stores
 */
export function persistStoresToLocalStorage(stores) {
    try {
        for (let store of stores) {
            let storeKey = store.store.storeKey;
            localStorage.setItem(storeKey, stringifyObject(store.store));
            //store the reference for internal structure change if not there already
            let reference = getItemFromLocalStorage(store.store.storeName);
            isNullUndefined(reference) &&
            storeItemToLocalStorage(store.store.storeName, store.storeSchema());
        }
    } catch (err) {
        console.log('persistStoresToLocalStorage failure!!');
        alert('Critical failure in persistence of your stores!!');
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
        persistStoresToLocalStorage(stores);
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
            if (storeKey.includes(MobX_StoreKey_Identifier_In_LocalStorage)) {
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
    window.removeEventListener('mousemove', persistStoreUpdatesLocalStorageOnEvent,);
    window.removeEventListener('keyup', persistStoreUpdatesLocalStorageOnEvent);
}
