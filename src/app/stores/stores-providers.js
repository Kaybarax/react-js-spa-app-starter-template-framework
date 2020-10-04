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
  Page4ExampleActivitySchema,
} from './store-schemas';
import {createCurrentStoreModelStructure, getPersistedStoreKey} from './store-utils';


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
