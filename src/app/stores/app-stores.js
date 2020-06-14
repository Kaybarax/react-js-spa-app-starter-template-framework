//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {observable} from 'mobx';
import {
  persistedStoreFromLocalStorage,
  persistStoreUpdatesToLocalStorageOnPossibleUpdateOfEvents,
} from './store-utils';
import {
  AppStoreProvider,
  Page1ExampleStoreProvider,
  Page2ExampleStoreProvider,
  Page3ExampleStoreProvider,
  Page4ExampleStoreProvider,
} from './stores-providers';
import {MobX_StoreKey_Identifier_In_LocalStorage} from './stores-data-store';

/**
 * sd _ Kaybarax
 */
export default class AppStores {

  constructor() {
    //init handle of persistence to local storage
    this.persistMyStoresToLocalStorageOnEvent(this.stores);
  }

  persistMyStoresToLocalStorageOnEvent(myStores) {
    persistStoreUpdatesToLocalStorageOnPossibleUpdateOfEvents(myStores);
  }

  //to assist with differentiation during storage to persistence media, if application uses several stores classes
  static namespace = 'AppStores_' + MobX_StoreKey_Identifier_In_LocalStorage;

  @observable
  app = persistedStoreFromLocalStorage(
      AppStoreProvider.storeKey(AppStores.namespace),
      AppStoreProvider,
      AppStores.namespace,
  ) || AppStoreProvider.storeProvider(AppStores.namespace);

  @observable
  page1Example = persistedStoreFromLocalStorage(
      Page1ExampleStoreProvider.storeKey(AppStores.namespace),
      Page1ExampleStoreProvider,
      AppStores.namespace,
  ) || Page1ExampleStoreProvider.storeProvider(AppStores.namespace);

  @observable
  page2Example = persistedStoreFromLocalStorage(
      Page2ExampleStoreProvider.storeKey(AppStores.namespace),
      Page2ExampleStoreProvider,
      AppStores.namespace,
  ) || Page2ExampleStoreProvider.storeProvider(AppStores.namespace);

  @observable
  page3Example = persistedStoreFromLocalStorage(
      Page3ExampleStoreProvider.storeKey(AppStores.namespace),
      Page3ExampleStoreProvider,
      AppStores.namespace,
  ) || Page3ExampleStoreProvider.storeProvider(AppStores.namespace);

  @observable
  page4Example = persistedStoreFromLocalStorage(
      Page4ExampleStoreProvider.storeKey(AppStores.namespace),
      Page4ExampleStoreProvider,
      AppStores.namespace,
  ) || Page4ExampleStoreProvider.storeProvider(AppStores.namespace);

  // collect for provision for offline storage either to localstorage, indexedDB or any other app-offline storage
  // Every store that you add, MAKE SURE to add it also here
  stores = [
    {
      store: this.app,
      storeSchema: () => AppStoreProvider.storeProvider(AppStores.namespace),
      storeProvider: AppStoreProvider,
    },
    {
      store: this.page1Example,
      storeSchema: () => Page1ExampleStoreProvider.storeProvider(AppStores.namespace),
      storeProvider: Page1ExampleStoreProvider,
    },
    {
      store: this.page2Example,
      storeSchema: () => Page2ExampleStoreProvider.storeProvider(AppStores.namespace),
      storeProvider: Page2ExampleStoreProvider,
    },
    {
      store: this.page3Example,
      storeSchema: () => Page3ExampleStoreProvider.storeProvider(AppStores.namespace),
      storeProvider: Page3ExampleStoreProvider,
    },
    {
      store: this.page4Example,
      storeSchema: () => Page4ExampleStoreProvider.storeProvider(AppStores.namespace),
      storeProvider: Page4ExampleStoreProvider,
    }
  ];

}
