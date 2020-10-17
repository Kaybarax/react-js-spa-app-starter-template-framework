//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
// import {useHistory} from "react-router-dom";
import {Provider} from 'mobx-react';
import 'bulma';
import './app/theme/app-styles.scss';
import AppEntry from './app/app-entry';
import {isEmptyObject} from "./app/util/util";
import {appIndexedDb} from "./app/app-management/data-manager/indexeddb-manager";
import appStores from "./app/stores";
import appNavigation from "./app/routing-and-navigation/app-navigation";

export default function App() {

  // hide unnecessary warning logs
  console.warn = () => null;
  // hide inconsequential error logs
  console.error = () => null;
  //hide all react warnings in release. ** DO THIS IN PROD **
  // console.warn = console.error = console.log = function (message) {};

  let [loadAppStores, setAppStoresLoaded] = React.useState(false);
  let [loadAppStoresFeedback, setAppStoresLoadedFeedback] = React.useState('Initializing app state...');

  React.useEffect(() => {

    //init app indexed db
    appIndexedDb();

    //init app stores
    if (!loadAppStores || isEmptyObject(appStores.stores)) {
      setAppStoresLoadedFeedback('Initializing app state...');
      appStores.loadAppStores().then(_ => {
        if (!isEmptyObject(appStores.stores)) {
          setAppStoresLoaded(true);
          setAppStoresLoadedFeedback('App state loaded!');
        } else {
          setAppStoresLoaded(false);
          setAppStoresLoadedFeedback('Failed to load app state. Reload app to try again');
        }
      });
    }

  }, [loadAppStores]);

  if (!loadAppStores || isEmptyObject(appStores.stores)) {
    return (
        <div>
          <h3>{loadAppStoresFeedback}</h3>
        </div>
    )
  }

  const {stores} = appStores;

  // pass navStore reference to appNavigation
  appNavigation.navStore = stores.appStore.navStore;

  return (
      <Provider
          {...stores}
      >
        <AppEntry/>
      </Provider>
  );

}
