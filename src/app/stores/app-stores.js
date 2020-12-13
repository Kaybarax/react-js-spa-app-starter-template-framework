//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {
    persistedStoreFromLocalStorage,
    persistStoreUpdatesToLocalStorageOnPossibleUpdateOfEvents,
} from './store-utils';
import StoreProviders from './stores-providers';
import {_StoreKey_} from './actions-and-stores-data';
import {isEmptyArray, isNullUndefined} from "../util/util";

/**
 * sd _ Kaybarax
 */
export default class AppStores {

    constructor() {
        this.store = null;
        this.appStoresLoaded = false;
    }

    //use to automatically persist this store's stores
    //on the provided event changes
    persistMyStoresToLocalStorageOnEventChanges(myStores) {
        let storesList = [];
        for (let key in myStores) {
            storesList.push(myStores[key]);
        }
        if (isEmptyArray(storesList)) {
            return;
        }
        persistStoreUpdatesToLocalStorageOnPossibleUpdateOfEvents(storesList);
    }

    //to assist with differentiation during storage to persistence media,
    // if application uses several stores classes
    static namespace = 'AppStores_' + _StoreKey_;

    loadAppStores = async () => {

        try {

            this.store = {};
            this.appStoresLoaded = false;

            for (let key in StoreProviders) {
                let storeKey = StoreProviders[key].storeKey(AppStores.namespace);
                let storeProvider = StoreProviders[key];
                let store = await persistedStoreFromLocalStorage(storeKey, storeProvider, AppStores.namespace);
                console.log('persistedStoreFromLocalStorage store -> ', store);
                if (isNullUndefined(store)) {
                    store = storeProvider.storeProvidedBy(AppStores.namespace);
                    console.log('created store -> ', store);
                }
                this.store[key] = store;
                console.log('INITIALIZED STORE -> ', key, ' -> ', (this.store[key]));
            }

            this.appStoresLoaded = true;

        } catch (err) {

            console.log('loadAppStores err', err);

            //create brand new stores

            this.store = {};
            this.appStoresLoaded = false;

            console.log('StoreProviders -> ', ' -> ', StoreProviders);

            for (let key in StoreProviders) {
                let storeProvider = StoreProviders[key];
                this.store[key] = storeProvider.storeProvidedBy(AppStores.namespace);
                console.log('CREATED STORE -> ', key, ' -> ', (this.store[key]));
            }

            this.appStoresLoaded = true;

        }

    };

}
