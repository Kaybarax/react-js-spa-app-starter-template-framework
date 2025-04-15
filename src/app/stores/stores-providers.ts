/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import {
  ActivitySchemaManager,
  AppSchemaManager,
  BaseStoreSchema,
  LoginSchemaManager,
  StoreName,
  StoreNames,
} from './store-schemas';
import { createStoreModelSnapshot, getPersistedStoreKey } from './store-utils';

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

// Initialize schema managers
const appSchemaManager = new AppSchemaManager();
const loginSchemaManager = new LoginSchemaManager();
const activitySchemaManager = new ActivitySchemaManager();

function createStoreProvider(storeName: StoreName): StoreProvider {
  let getSchema: (namespace: string | null, name: string) => BaseStoreSchema;

  // Determine which schema manager to use based on store name
  switch (storeName) {
    case StoreNames.appStore:
      getSchema = (namespace, name) => appSchemaManager.getInstance(namespace as string, name);
      break;
    case StoreNames.loginStore:
      getSchema = (namespace, name) => loginSchemaManager.getInstance(namespace as string, name);
      break;
    case StoreNames.securedAppStore:
    case StoreNames.page1ExampleStore:
    case StoreNames.page2ExampleStore:
    case StoreNames.page3ExampleStore:
    case StoreNames.page4ExampleStore:
      getSchema = (namespace, name) => activitySchemaManager.getInstance(namespace as string, name);
      break;
    default:
      getSchema = (namespace, name) => activitySchemaManager.getInstance(namespace as string, name);
  }

  return {
    storeKey: namespace => getPersistedStoreKey(namespace, storeName),
    storeProvidedBy: namespace => getSchema(namespace, storeName) as unknown as Store,
    storeModelSnapshot: createStoreModelSnapshot(storeName, getSchema(null, storeName) as unknown as Store),
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
