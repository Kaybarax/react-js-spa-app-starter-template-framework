/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { TITLE } from '../../app-config';
import WithStoresHoc from '../../stores/with-stores-hoc';
import SecuredAppHeaderMenuNavigation from '../../routing-and-navigation/secured-app-header-menu-navigation';
import { persistStoresToLocalStorage } from '../../stores/store-utils';
import { toJS } from 'mobx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SecuredHomepageExample(props: any) {
  console.log('SecuredHomepageExample props', props);

  const { appStore, securedAppStore } = props;
  console.log('appStore -> ', toJS(appStore));
  console.log('securedAppStore -> ', toJS(securedAppStore));

  // let {} = securedHomepageStore;

  // because from this page, navigations will
  // be performed, init navigator with {history, location, match}
  // from props
  // appNavigation.initNavigator(props);

  React.useEffect(() => {
    persistStoresToLocalStorage([appStore, securedAppStore]).then(null);
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE + ' | Secured App Home'}</title>
      </Helmet>

      <SecuredAppHeaderMenuNavigation appStore={appStore} />

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <h5 className="title is-5">Secured Page Example</h5>
        </div>
      </div>

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <p style={{ textAlign: 'left' }}>You have accessed a page such as this, only because you have logged in!</p>
          <p>
            <h3>Try counting clicks</h3>
            <button
              onClick={() => {
                securedAppStore.clicksCount += 1;
              }}
            >
              Click me
            </button>
            <h5>You have clicked {securedAppStore?.clicksCount}</h5>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WithStoresHoc(SecuredHomepageExample, ['securedAppStore', 'appStore']);
