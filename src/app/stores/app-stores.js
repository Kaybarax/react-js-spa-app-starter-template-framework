//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {observable, toJS} from 'mobx';
import {
  persistedStoreFromLocalStorage,
  persistStoreUpdatesToLocalStorageOnPossibleUpdateOfEvents,
} from './store-utils';
import StoreProviders from './stores-providers';
import {MobX_StoreKey_Identifier} from './actions-and-stores-data';
import {isEmptyArray, isNullUndefined} from "../util/util";

/**
 * sd _ Kaybarax
 */
export default class AppStores {

  constructor() {
    this.stores = null;
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
  static namespace = 'AppStores_' + MobX_StoreKey_Identifier;

  loadAppStores = async () => {

    try {

      this.stores = {};
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
        this.stores[key] = observable(store);
        console.log('INITIALIZED STORE -> ', key, ' -> ', toJS(this.stores[key]));
      }

      this.appStoresLoaded = true;

    } catch (err) {

      console.log('loadAppStores err', err);

      //create brand new stores

      this.stores = {};
      this.appStoresLoaded = false;

      console.log('StoreProviders -> ', ' -> ', StoreProviders);

      for (let key in StoreProviders) {
        let storeProvider = StoreProviders[key];
        let store = storeProvider.storeProvidedBy(AppStores.namespace);
        this.stores[key] = observable(store);
        console.log('CREATED STORE -> ', key, ' -> ', toJS(this.stores[key]));
      }

      this.appStoresLoaded = true;

    }

  };

}
