//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {action} from 'mobx';
import {clearAllPersistedStoresToLocalStorage, unregisterPersistenceEventListeners,} from './store-utils';
import {isEmptyObject, isNullUndefined} from "../util/util";
import appStores from "./index";
import appNavigation from "../routing-and-navigation/app-navigation";

/**
 * stored here in this directory because
 * it is working in conjunction with the stores
 */
export class AppAuth {

  /**
   * Your frontend app pages, authentication logic for access: JWT, AWS Cognito, Google sign in,
   * facebook sign in, Twitter sign in ...  your fancy
   * @returns {Promise<*>}
   */
  isAuthenticated = async () => {
    // TODO: write you authentication logic here that will need to pass for a user to
    //  access a secured page. For example if you were using aws, and a user should only
    //  access a page if still logged in, you would do something like the below commented out code:
    // return await Auth.currentAuthenticatedUser()
    //     .then(async (data) => {
    //         console.log('user data ::', data);
    //         return true;
    //     })
    //     .catch(() => {
    //         return false;
    //     });

    //START my authentication logic for this framework template.
    // Of course, remove it and use your own
    return !(isNullUndefined(appStores.stores.appStore.user) ||
        isEmptyObject(appStores.stores.appStore.user));
    //END my logic
  };

  handleLogin = () => {
    // TODO: handle any of your pre-login stuff here
    //  or in any other function anywhere.
    appNavigation.navigateToSecuredAppHomepageExample();
  };

  @action
  handleLogout = () => {
    try {
      // TODO: your logout logic, e.g:
      //  -> AWS sign out if you are using AWS: await Auth.signOut();
      //  -> or another type of sign out process that you are using

      // START my example sign out logic for this framework template share.
      // Of course, remove it and use your own when using this template
      appStores.stores.appStore.user = null;
      this.stopStoresPersistenceToLocalStorageAndClearOnLogout();
      appNavigation.navigateToLoginAndRegistration();
      // END my logic
    } catch (e) {
      console.log('handleLogout', e);
    }
  };

  stopStoresPersistenceToLocalStorageAndClearOnLogout = () => {
    unregisterPersistenceEventListeners();
    clearAllPersistedStoresToLocalStorage();
  };

}

const appAuth = new AppAuth();
export default appAuth;
