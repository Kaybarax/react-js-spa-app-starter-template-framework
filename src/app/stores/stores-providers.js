//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {
  AppActivityStoreSchema,
  LoginActivityStoreSchema,
  Page1ExampleActivityStoreSchema,
  Page2ExampleActivityStoreSchema,
  Page3ExampleActivityStoreSchema,
  Page4ExampleActivityStoreSchema, SecuredAppActivityStoreSchema, StoreNames,
} from './store-schemas';
import {createStoreModelSnapshot, getPersistedStoreKey} from './store-utils';

const StoreProviders = {

  appStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.appStore),
    storeProvidedBy: (namespace) => new AppActivityStoreSchema(namespace, StoreNames.appStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.appStore,
        new AppActivityStoreSchema(null, StoreNames.appStore),
    ),
  },

  loginStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.loginStore),
    storeProvidedBy: (namespace) => new LoginActivityStoreSchema(namespace, StoreNames.loginStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.loginStore,
        new LoginActivityStoreSchema(null, StoreNames.loginStore),
    ),
  },

  page1ExampleStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.page1ExampleStore),
    storeProvidedBy: (namespace) => new Page1ExampleActivityStoreSchema(namespace, StoreNames.page1ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page1ExampleStore,
        new Page1ExampleActivityStoreSchema(null, StoreNames.page1ExampleStore),
    ),
  },

  page2ExampleStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.page2ExampleStore),
    storeProvidedBy: (namespace) => new Page2ExampleActivityStoreSchema(namespace, StoreNames.page2ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page2ExampleStore,
        new Page2ExampleActivityStoreSchema(null, StoreNames.page2ExampleStore),
    ),
  },

  page3ExampleStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.page3ExampleStore),
    storeProvidedBy: (namespace) => new Page3ExampleActivityStoreSchema(namespace, StoreNames.page3ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page3ExampleStore,
        new Page3ExampleActivityStoreSchema(null, StoreNames.page3ExampleStore),
    ),
  },

  page4ExampleStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.page4ExampleStore),
    storeProvidedBy: (namespace) => new Page4ExampleActivityStoreSchema(namespace, StoreNames.page4ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page4ExampleStore,
        new Page4ExampleActivityStoreSchema(null, StoreNames.page4ExampleStore),
    ),
  },

  securedAppStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.securedAppStore),
    storeProvidedBy: (namespace) => new SecuredAppActivityStoreSchema(namespace, StoreNames.securedAppStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.securedAppStore,
        new SecuredAppActivityStoreSchema(null, StoreNames.securedAppStore),
    ),
  },

}

export default StoreProviders;
