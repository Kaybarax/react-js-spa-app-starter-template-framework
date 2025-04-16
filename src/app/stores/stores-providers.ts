/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import {
  StoreName,
  StoreNames,
  SchemaFactory
} from './store-schemas';
import { getPersistedStoreKey } from './store-utils';

// Define the store type
export interface Store {
  storeKey: string;
  storeName: string;
  namespace: string;
  [key: string]: unknown;
}

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
    // Create a default store with basic properties using SchemaFactory
    const schema = SchemaFactory.getSchema(storeName, namespace);
    return {
      ...schema,
      storeKey: getPersistedStoreKey(namespace, storeName),
    } as Store;
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
