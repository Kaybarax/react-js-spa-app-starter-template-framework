/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { observable, toJS } from 'mobx';
import { persistedStoreFromLocalStorage, Store as StoreType } from './store-utils';
import StoreProviders from './stores-providers';
import { STORE_KEY_SUFFIX } from './actions-and-stores-data';
import { isEmptyArray, isNullUndefined } from '../util/util';
import { StoreName } from './store-schemas';

export default class AppStores {
  stores: Record<StoreName, StoreType> | null = null;
  appStoresLoaded = false;
  static namespace = 'AppStores_' + STORE_KEY_SUFFIX;

  constructor() {
    this.stores = null;
    this.appStoresLoaded = false;
  }

  persistMyStoresToLocalStorageOnEventChanges(myStores: Record<string, StoreType>): void {
    const storesList: StoreType[] = [];
    for (const key in myStores) {
      storesList.push(myStores[key]);
    }
    if (isEmptyArray(storesList)) {
      return;
    }
    // Storage persistence implementation commented out
  }

  loadAppStores = async (): Promise<void> => {
    try {
      this.stores = {} as Record<StoreName, StoreType>;
      this.appStoresLoaded = false;

      for (const key in StoreProviders) {
        const storeProvider = StoreProviders[key];
        const storeKey = storeProvider.storeKey(AppStores.namespace);

        let store = await persistedStoreFromLocalStorage(storeKey, AppStores.namespace);
        console.log('persistedStoreFromLocalStorage store -> ', store);

        if (isNullUndefined(store)) {
          store = storeProvider.storeProvidedBy(AppStores.namespace);
          console.log('created store -> ', store);
        } else {
          this.stores[key as StoreName] = observable(store as StoreType);
          console.log('INITIALIZED STORE -> ', key, ' -> ', toJS(this.stores[key as StoreName]));
        }
      }

      this.appStoresLoaded = true;
    } catch (err) {
      console.log('loadAppStores err', err);

      // Fall back to creating new stores when loading fails
      this.stores = {} as Record<StoreName, StoreType>;
      this.appStoresLoaded = false;

      console.log('StoreProviders -> ', ' -> ', StoreProviders);

      for (const key in StoreProviders) {
        const storeProvider = StoreProviders[key];
        const store = storeProvider.storeProvidedBy(AppStores.namespace);
        this.stores[key as StoreName] = observable(store);
        console.log('CREATED STORE -> ', key, ' -> ', toJS(this.stores[key as StoreName]));
      }

      this.appStoresLoaded = true;
    }
  };
}
