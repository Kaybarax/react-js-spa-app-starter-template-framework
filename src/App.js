//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import './app/theme/app-styles.scss';
import 'bulma';
import {Provider} from 'mobx-react';
import AppEntry from './app/app-entry';
import rootStore from './app/stores';
import {isEmptyObject} from "./app/util/util";

export default function App() {

  // hide unnecessary warning logs
  console.warn = () => null;
  // hide inconsequential error logs
  console.error = () => null;
  //hide all react warnings in release. ** DO THIS IN PROD **
  // console.warn = console.error = console.log = function (message) {};

  let [loadAppStores, setAppStoresLoaded] = React.useState(false);
  let [loadAppStoresFeedback, setAppStoresLoadedFeedback] = React.useState('Initializing app state...');

  let {appStores} = rootStore;

  React.useEffect(() => {
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
  }, [loadAppStores, appStores]);

  if (!loadAppStores || isEmptyObject(appStores.stores)) {
    return (
        <div
            style={[]}
        >
          {/*<AppStartLoading*/}
          {/*    loadAppStores={loadAppStores}*/}
          {/*    startUpMessage={loadAppStoresFeedback}*/}
          {/*/>*/}
          <h3>{loadAppStoresFeedback}</h3>
        </div>
    )
  }

  // @ts-ignore
  // pass navStore reference to appNavigation
  // appNavigation.navStore = appStores.stores.appStore.navStore;

  const {stores} = appStores;

  return (
      <Provider
          {...stores}
      >
        <AppEntry router={rootStore.router}/>
      </Provider>
  );

}
