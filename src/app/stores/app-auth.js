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
import {isEmptyObject, isNullUndefined, stringifyObject} from "../util/util";
import appStores from "./index";

/**
 * stored here in this directory because
 * it is working in conjunction with the stores
 */
export class AppAuth {

  /**
   * my custom function to keep my signed in user's details up to date
   * @param user
   */
  @action
  createSignedInUser = (user) => {
    // console.log('createSignedInUser <--user--> :: ');
    appStores.stores.app.user = user;
  };

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

    //my logic for this framework template share. Of course, remove it and use your own
    //like I have guided above
    return !(isNullUndefined(appStores.stores.app.user) ||
        isEmptyObject(appStores.stores.app.user));
  };

  @action
  handleLogin = () => {
    // NOTE: on success of your login function and initializations and stuff
    //  you will call this function, i.e something like "authStore.handleLogin()"
    //  to complete signing you in to the application, by executing the line below.
  };

  @action
  setSignInRedirect = () => {
    //todo: will be done
  };

  @action
  handleLogout = () => {
    try {
      // TODO: your logout logic, e.g:
      //  -> AWS sign out if you are using AWS: await Auth.signOut();
      //  -> or another type of sign out process that you are using

      // START my example sign out logic for this framework template share.
      // Of course, remove it and use your own
      //like I have guided above
      appStores.stores.app.user = null;
      // END my logic

      // then your frontend app sign out completion
      this.stopStoresPersistenceToLocalStorageAndClearOnLogout();
      window.location.reload();
    } catch (e) {
      console.log(stringifyObject(e));
    }
  };

  stopStoresPersistenceToLocalStorageAndClearOnLogout = () => {
    unregisterPersistenceEventListeners();
    clearAllPersistedStoresToLocalStorage();
  };

}

const appAuth = new AppAuth();
export default appAuth;
