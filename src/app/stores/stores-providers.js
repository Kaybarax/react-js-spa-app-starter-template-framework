//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {
  AppActivitySchema,
  LoginActivitySchema,
  Page1ExampleActivitySchema,
  Page2ExampleActivitySchema,
  Page3ExampleActivitySchema,
  Page4ExampleActivitySchema,
} from './store-schemas';
import {createCurrentStoreModelStructure, getPersistedStoreKey} from './store-utils';
import {getObjectFromLocalStorage} from '../util/util';

// export const AppStoreProvider = {
//   storeKey: (namespace) => getPersistedStoreKey(namespace, APP_STORE_NAME),
//   storeProvider: (namespace) => new AppActivitySchema(namespace, APP_STORE_NAME),
//   currentStoreModelStructure: getObjectFromLocalStorage(APP_STORE_NAME) ||
//       new AppActivitySchema(null, APP_STORE_NAME),
// };
//
// export const LoginStoreProvider = {
//   storeKey: (namespace) => getPersistedStoreKey(namespace, LOGIN_STORE_NAME),
//   storeProvider: (namespace) => new LoginActivitySchema(namespace, LOGIN_STORE_NAME),
//   currentStoreModelStructure: getObjectFromLocalStorage(LOGIN_STORE_NAME) ||
//       new LoginActivitySchema(null, LOGIN_STORE_NAME),
// };
//
// export const Page1ExampleStoreProvider = {
//   storeKey: (namespace) => getPersistedStoreKey(namespace, PAGE1EXAMPLE_STORE_NAME),
//   storeProvider: (namespace) => new Page1ExampleActivitySchema(namespace, PAGE1EXAMPLE_STORE_NAME),
//   currentStoreModelStructure: getObjectFromLocalStorage(PAGE1EXAMPLE_STORE_NAME) ||
//       new Page1ExampleActivitySchema(null, PAGE1EXAMPLE_STORE_NAME),
// };
//
// export const Page2ExampleStoreProvider = {
//   storeKey: (namespace) => getPersistedStoreKey(namespace, PAGE2EXAMPLE_STORE_NAME),
//   storeProvider: (namespace) => new Page2ExampleActivitySchema(namespace, PAGE2EXAMPLE_STORE_NAME),
//   currentStoreModelStructure: getObjectFromLocalStorage(PAGE2EXAMPLE_STORE_NAME) ||
//       new Page2ExampleActivitySchema(null, PAGE2EXAMPLE_STORE_NAME),
// };
//
// export const Page3ExampleStoreProvider = {
//   storeKey: (namespace) => getPersistedStoreKey(namespace, PAGE3EXAMPLE_STORE_NAME),
//   storeProvider: (namespace) => new Page3ExampleActivitySchema(namespace, PAGE3EXAMPLE_STORE_NAME),
//   currentStoreModelStructure: getObjectFromLocalStorage(PAGE3EXAMPLE_STORE_NAME) ||
//       new Page3ExampleActivitySchema(null, PAGE3EXAMPLE_STORE_NAME),
// };
//
// export const Page4ExampleStoreProvider = {
//   storeKey: (namespace) => getPersistedStoreKey(namespace, PAGE4EXAMPLE_STORE_NAME),
//   storeProvider: (namespace) => new Page4ExampleActivitySchema(namespace, PAGE4EXAMPLE_STORE_NAME),
//   currentStoreModelStructure: getObjectFromLocalStorage(PAGE4EXAMPLE_STORE_NAME) ||
//       new Page4ExampleActivitySchema(null, PAGE4EXAMPLE_STORE_NAME),
// };

const StoreProviders = {

  appStore: {
    get storeName() {
      return 'appStore';
    },
    storeKey: (namespace) => getPersistedStoreKey(namespace, this.storeName),
    storeProvider: (namespace) => new AppActivitySchema(namespace, this.storeName),
    currentStoreModelStructure: createCurrentStoreModelStructure(
        this.storeName,
        new AppActivitySchema(null, this.storeName),
    ),
  },

  loginStore: {
    get storeName() {
      return 'loginStore';
    },
    storeKey: (namespace) => getPersistedStoreKey(namespace, this.storeName),
    storeProvider: (namespace) => new LoginActivitySchema(namespace, this.storeName),
    currentStoreModelStructure: createCurrentStoreModelStructure(
        this.storeName,
        new LoginActivitySchema(null, this.storeName),
    ),
  },

  page1ExampleStore: {
    get storeName() {
      return 'page1ExampleStore';
    },
    storeKey: (namespace) => getPersistedStoreKey(namespace, this.storeName),
    storeProvider: (namespace) => new Page1ExampleActivitySchema(namespace, this.storeName),
    currentStoreModelStructure: createCurrentStoreModelStructure(
        this.storeName,
        new Page1ExampleActivitySchema(null, this.storeName),
    ),
  },

  page2ExampleStore: {
    get storeName() {
      return 'page2ExampleStore';
    },
    storeKey: (namespace) => getPersistedStoreKey(namespace, this.storeName),
    storeProvider: (namespace) => new Page2ExampleActivitySchema(namespace, this.storeName),
    currentStoreModelStructure: createCurrentStoreModelStructure(
        this.storeName,
        new Page2ExampleActivitySchema(null, this.storeName),
    ),
  },

  page3ExampleStore: {
    get storeName() {
      return 'page3ExampleStore';
    },
    storeKey: (namespace) => getPersistedStoreKey(namespace, this.storeName),
    storeProvider: (namespace) => new Page3ExampleActivitySchema(namespace, this.storeName),
    currentStoreModelStructure: createCurrentStoreModelStructure(
        this.storeName,
        new Page3ExampleActivitySchema(null, this.storeName),
    ),
  },

  page4ExampleStore: {
    get storeName() {
      return 'page4ExampleStore';
    },
    storeKey: (namespace) => getPersistedStoreKey(namespace, this.storeName),
    storeProvider: (namespace) => new Page4ExampleActivitySchema(namespace, this.storeName),
    currentStoreModelStructure: createCurrentStoreModelStructure(
        this.storeName,
        new Page4ExampleActivitySchema(null, this.storeName),
    ),
  },

}

export default StoreProviders;
