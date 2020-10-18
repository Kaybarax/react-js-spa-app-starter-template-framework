//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {
  AppActivitySchema,
  LoginActivitySchema,
  Page1ExampleActivitySchema,
  Page2ExampleActivitySchema,
  Page3ExampleActivitySchema,
  Page4ExampleActivitySchema, SecuredAppActivitySchema, StoreNames,
} from './store-schemas';
import {createStoreModelSnapshot, getPersistedStoreKey} from './store-utils';
import {MobX_StoreSnapshot_Identifier} from "./actions-and-stores-data";

const StoreProviders = {

  appStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.appStore),
    storeProvidedBy: (namespace) => new AppActivitySchema(namespace, StoreNames.appStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.appStore,
        new AppActivitySchema(MobX_StoreSnapshot_Identifier, StoreNames.appStore),
    ),
  },

  loginStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.loginStore),
    storeProvidedBy: (namespace) => new LoginActivitySchema(namespace, StoreNames.loginStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.loginStore,
        new LoginActivitySchema(MobX_StoreSnapshot_Identifier, StoreNames.loginStore),
    ),
  },

  page1ExampleStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.page1ExampleStore),
    storeProvidedBy: (namespace) => new Page1ExampleActivitySchema(namespace, StoreNames.page1ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page1ExampleStore,
        new Page1ExampleActivitySchema(MobX_StoreSnapshot_Identifier, StoreNames.page1ExampleStore),
    ),
  },

  page2ExampleStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.page2ExampleStore),
    storeProvidedBy: (namespace) => new Page2ExampleActivitySchema(namespace, StoreNames.page2ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page2ExampleStore,
        new Page2ExampleActivitySchema(MobX_StoreSnapshot_Identifier, StoreNames.page2ExampleStore),
    ),
  },

  page3ExampleStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.page3ExampleStore),
    storeProvidedBy: (namespace) => new Page3ExampleActivitySchema(namespace, StoreNames.page3ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page3ExampleStore,
        new Page3ExampleActivitySchema(MobX_StoreSnapshot_Identifier, StoreNames.page3ExampleStore),
    ),
  },

  page4ExampleStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.page4ExampleStore),
    storeProvidedBy: (namespace) => new Page4ExampleActivitySchema(namespace, StoreNames.page4ExampleStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.page4ExampleStore,
        new Page4ExampleActivitySchema(MobX_StoreSnapshot_Identifier, StoreNames.page4ExampleStore),
    ),
  },

  securedAppStore: {
    storeKey: (namespace) => getPersistedStoreKey(namespace, StoreNames.securedAppStore),
    storeProvidedBy: (namespace) => new SecuredAppActivitySchema(namespace, StoreNames.securedAppStore),
    storeModelSnapshot: createStoreModelSnapshot(
        StoreNames.securedAppStore,
        new SecuredAppActivitySchema(MobX_StoreSnapshot_Identifier, StoreNames.securedAppStore),
    ),
  },

}

export default StoreProviders;
