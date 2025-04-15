/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { notificationCallback } from '../shared-components-and-modules/notification-center/notifications-controller';
import { deepCloneObject, isNullUndefined } from '../util/util';
import { toJS } from 'mobx';
import { APP_INDEXED_DB_DATA_STORES } from '../app-management/data-manager/indexeddb-manager';

import { NotificationAlert } from '../shared-components-and-modules/notification-center/notification-utils.ts';
import { AppAuth } from '../stores/app-auth.ts';
import { User } from '../app-management/data-manager/models-manager.ts';

export function handleSignUp(signUpModel: Record<string, unknown>, notificationAlert: NotificationAlert): void {
  //save to indexedDb if you fancy
  const db = window.db; //get db;
  if (!db) {
    console.error('Database not initialized');
    return;
  }

  // Start a database transaction and get the notes object store
  const tx = db.transaction([APP_INDEXED_DB_DATA_STORES.USERS], 'readwrite');
  const store = tx.objectStore(APP_INDEXED_DB_DATA_STORES.USERS);
  // Put the sticky note into the object store
  const user = toJS(signUpModel.user) as User;
  const userId = user.id;
  //then strip id away
  delete (user as Partial<User>).id;
  store.add(user, userId);
  // Wait for the database transaction to complete
  tx.oncomplete = function () {
    notificationCallback('succ', 'Sign up success', notificationAlert);
  };
  tx.onerror = function (event: Event) {
    console.log('error storing note ' + (event.target as IDBTransaction).error);
    notificationCallback('err', 'Sign up failed!', notificationAlert);
  };
}

export function handleLogin(
  loginForm: Record<string, unknown>,
  notificationAlert: NotificationAlert,
  appStore: Record<string, unknown>,
  appAuth: AppAuth,
): void {
  const db = window.db; //get db;
  if (!db) {
    console.error('Database not initialized');
    return;
  }

  // Set up an object store and transaction
  const tx = db.transaction([APP_INDEXED_DB_DATA_STORES.USERS], 'readonly');
  const store = tx.objectStore(APP_INDEXED_DB_DATA_STORES.USERS);

  // Set up a request to get all users
  const req = store.getAll();

  // If we get an error
  req.onerror = function (event: Event) {
    console.log('error getting users ', (event.target as IDBRequest).error);
    notificationCallback('err', 'Cannot query users', notificationAlert);
  };

  // onsuccess handler
  req.onsuccess = function (event: Event) {
    const users = (event.target as IDBRequest<User[]>).result;

    const user = users.find(
      item => item.usernameOrEmail === loginForm.usernameOrEmail && item.password === loginForm.password,
    );
    if (isNullUndefined(user)) {
      notificationCallback('err', 'User not found', notificationAlert);
      return;
    }
    // Type assertion to tell TypeScript that user is definitely a User at this point
    appStore.user = <User>deepCloneObject(user as User);
    notificationCallback('succ', 'Login success', notificationAlert);
    //to allow notification display
    setTimeout(() => appAuth.handleLogin(), 2000);
  };
}

export function handleResetPassword(notificationAlert: NotificationAlert): void {
  //todo: ... your logic ... you get the drill by now
  notificationCallback('info', 'You can play around with this, mate. Cheers!)', notificationAlert);
}
