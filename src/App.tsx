/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { Provider } from 'mobx-react';
import './app/theme/app-styles.scss';
import AppEntry from './app/app-entry';
import { isEmptyObject } from './app/util/util';
import { appIndexedDb } from './app/app-management/data-manager/indexeddb-manager';
import appStores from './app/stores';
import { appNavigation, NavigationStore } from './app/routing-and-navigation/app-navigation';

export default function App() {
  const [loadAppStores, setAppStoresLoaded] = React.useState(false);
  const [loadAppStoresFeedback, setAppStoresLoadedFeedback] = React.useState('Initializing app state...');

  React.useEffect(() => {
    //init app indexed db
    appIndexedDb();

    //init app stores
    if (!loadAppStores || isEmptyObject(appStores.stores || {})) {
      setAppStoresLoadedFeedback('Initializing app state...');
      appStores.loadAppStores().then(() => {
        if (!isEmptyObject(appStores.stores || {})) {
          setAppStoresLoaded(true);
          setAppStoresLoadedFeedback('App state loaded!');
          //comment the below line out,
          //if you don't want automatic persistence on
          //the given event changes
          // appStores.persistMyStoresToLocalStorageOnEventChanges(appStores.stores);
        } else {
          setAppStoresLoaded(false);
          setAppStoresLoadedFeedback('Failed to load app state. Reload app to try again');
        }
      });
    }
  }, [loadAppStores]);

  if (!loadAppStores || isEmptyObject(appStores.stores || {})) {
    return (
      <div>
        <h3>{loadAppStoresFeedback}</h3>
      </div>
    );
  }

  const { stores } = appStores;

  // pass navStore reference to appNavigation
  appNavigation.setNavStore((stores?.appStore.navStore as NavigationStore) ?? null);

  return (
    <Provider {...stores}>
      <AppEntry />
    </Provider>
  );
}
