/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import {
  StoreName,
  StoreNames,
} from './store-schemas';
import { getPersistedStoreKey } from './store-utils';
import { 
  useAppStore, 
  useLoginStore, 
  createPageExampleStore,
  Store
} from './zustand';

// Define the store provider interface
export interface StoreProvider {
  storeKey: (namespace: string | null) => string;
  storeProvidedBy: (namespace: string) => Store;
  storeModelSnapshot: Promise<Store>;
}

// Define the StoreProviders type
interface StoreProvidersType {
  [key: string]: StoreProvider;
}

function createStoreProvider(storeName: StoreName): StoreProvider {
  // Function to get the appropriate store based on store name
  const getStore = (namespace: string): Store => {
    switch (storeName) {
      case StoreNames.appStore:
        return useAppStore.getState().getStore();
      case StoreNames.loginStore:
        return useLoginStore.getState().getStore();
      case StoreNames.page1ExampleStore:
      case StoreNames.page2ExampleStore:
      case StoreNames.page3ExampleStore:
      case StoreNames.page4ExampleStore:
        return createPageExampleStore(storeName).getState().getStore();
      default:
        // Create a default store with basic properties
        return {
          storeName,
          namespace,
          storeKey: getPersistedStoreKey(namespace, storeName),
          loading: false,
          updated: false,
          loadingMessage: 'Loading...',
        } as Store;
    }
  };

  return {
    storeKey: namespace => getPersistedStoreKey(namespace, storeName),
    storeProvidedBy: namespace => getStore(namespace),
    storeModelSnapshot: Promise.resolve(getStore('AppStores')),
  };
}

const StoreProviders: StoreProvidersType = {
  appStore: createStoreProvider(StoreNames.appStore),
  loginStore: createStoreProvider(StoreNames.loginStore),
  page1ExampleStore: createStoreProvider(StoreNames.page1ExampleStore),
  page2ExampleStore: createStoreProvider(StoreNames.page2ExampleStore),
  page3ExampleStore: createStoreProvider(StoreNames.page3ExampleStore),
  page4ExampleStore: createStoreProvider(StoreNames.page4ExampleStore),
  securedAppStore: createStoreProvider(StoreNames.securedAppStore),
};

export default StoreProviders;
