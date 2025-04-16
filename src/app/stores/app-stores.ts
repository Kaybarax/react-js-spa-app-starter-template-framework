/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { useAppStores } from './zustand';
import { STORE_KEY_SUFFIX } from './actions-and-stores-data';
import { StoreName } from './store-schemas';
import { Store as StoreType, clearAllPersistedStoresToLocalStorage } from './store-utils';

export class AppStores {
  stores: Record<StoreName, StoreType> | null = null;
  appStoresLoaded = false;
  static namespace = 'AppStores_' + STORE_KEY_SUFFIX;
  private static instance: AppStores | null = null;

  private constructor() {
    this.stores = null;
    this.appStoresLoaded = false;
  }

  /**
   * Get the singleton instance of AppStores
   */
  public static getInstance(): AppStores {
    if (!AppStores.instance) {
      AppStores.instance = new AppStores();
    }
    return AppStores.instance;
  }

  /**
   * Persist all stores to local storage
   * This is called automatically by zustand middleware on store changes
   */
  persistMyStoresToLocalStorageOnEventChanges(): void {
    // No need to implement this method as zustand handles persistence automatically
    console.log('Store persistence is handled by zustand middleware');
  }

  /**
   * Clear all persisted stores from local storage
   */
  clearPersistedStores(): void {
    clearAllPersistedStoresToLocalStorage();
  }

  /**
   * Load all stores from local storage
   */
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

// Export the singleton instance
const appStores = AppStores.getInstance();
export default appStores;
