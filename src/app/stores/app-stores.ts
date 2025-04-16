/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { useAppStores } from './zustand';
import { STORE_KEY_SUFFIX } from './actions-and-stores-data';
import { StoreName } from './store-schemas';
import { Store as StoreType } from './store-utils';

export default class AppStores {
  stores: Record<StoreName, StoreType> | null = null;
  appStoresLoaded = false;
  static namespace = 'AppStores_' + STORE_KEY_SUFFIX;

  constructor() {
    this.stores = null;
    this.appStoresLoaded = false;
  }

  persistMyStoresToLocalStorageOnEventChanges(): void {
    // No need to implement this method as zustand handles persistence automatically
    console.log('Store persistence is handled by zustand middleware');
  }

  loadAppStores = async (): Promise<void> => {
    try {
      // Use the loadAppStores function from the zustand store
      await useAppStores.getState().loadAppStores();

      // Get the stores from the zustand store
      const zustandStores = useAppStores.getState().stores;
      this.stores = zustandStores as Record<StoreName, StoreType>;
      this.appStoresLoaded = useAppStores.getState().appStoresLoaded;

      console.log('Stores loaded from zustand:', this.stores);
    } catch (err) {
      console.log('loadAppStores err', err);
      this.stores = null;
      this.appStoresLoaded = false;
    }
  };
}
