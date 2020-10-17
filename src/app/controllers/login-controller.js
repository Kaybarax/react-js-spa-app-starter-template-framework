//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {toastNotificationCallback} from "../shared-components-and-modules/notification-center/notifications-controller";
import {deepCloneObject, isNullUndefined} from "../util/util";
import {toJS} from "mobx";
import {APP_INDEXED_DB_DATASTORES} from "../app-management/data-manager/indexeddb-manager";

/**
 * sd _ Kaybarax
 * @param signUpModel
 * @param toastNotificationAlert
 */
export function handleSignUp(signUpModel, toastNotificationAlert) {

  //save to indexedDb if you fancy
  let db = window.db;//get db;

  // Start a database transaction and get the notes object store
  let tx = db.transaction([APP_INDEXED_DB_DATASTORES.USERS], 'readwrite');
  let store = tx.objectStore(APP_INDEXED_DB_DATASTORES.USERS);
  // Put the sticky note into the object store
  let user = toJS(signUpModel.user);
  let userId = user.id;
  //then strip id away
  delete user.id;
  store.add(user, userId);
  // Wait for the database transaction to complete
  tx.oncomplete = function () {
    toastNotificationCallback('succ', 'Sign up success', toastNotificationAlert)
  }
  tx.onerror = function (event) {
    console.log('error storing note ' + event.target.errorCode);
    toastNotificationCallback('err', 'Sign up failed!', toastNotificationAlert);
  }

}

/**
 * sd _ Kaybarax
 * @param loginForm
 * @param toastNotificationAlert
 * @param appStore
 * @param appAuth
 */
export function handleLogin(loginForm, toastNotificationAlert, appStore, appAuth) {

  let db = window.db;//get db;
  // Set up an object store and transaction
  let tx = db.transaction([APP_INDEXED_DB_DATASTORES.USERS], 'readonly');
  let store = tx.objectStore(APP_INDEXED_DB_DATASTORES.USERS);

  // Set up a request to get all users
  let req = store.getAll();

  // If we get an error
  req.onerror = function (event) {
    console.log('error getting users ', event.target.errorCode);
    toastNotificationCallback('err', 'Cannot query users', toastNotificationAlert);
  }

  let users = [];
  // onsuccess handler
  req.onsuccess = function (event) {

    users = event.target.result;

    let user = users.find(item => item.usernameOrEmail === loginForm.usernameOrEmail &&
        item.password === loginForm.password);
    if (isNullUndefined(user)) {
      toastNotificationCallback('err', 'User not found', toastNotificationAlert);
      return;
    }
    appStore.user = deepCloneObject(user);
    toastNotificationCallback('succ', 'Login success', toastNotificationAlert);
    //to allow notification display
    setTimeout(_ => appAuth.handleLogin(), 2000);
  }

}

/**
 * sd _ Kaybarax
 * @param toastNotificationAlert
 */
export function handleResetPassword(toastNotificationAlert) {
  //todo: ... your logic ... you get the drill by now
  toastNotificationCallback('info', 'You can play around with this, mate. Cheers!)',
      toastNotificationAlert);
}
