//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {notificationCallback} from "../shared-components-and-modules/notification-center/notifications-controller";
import {deepCloneObject, isNullUndefined} from "../util/util";
import {toJS} from "mobx";
import {APP_INDEXED_DB_DATASTORES} from "../app-management/data-manager/indexeddb-manager";
import {LOGIN_PAGE_ACTIONS_ENUM} from "../stores/actions-and-stores-data";
import {User} from "../app-management/data-manager/models-manager";

/**
 * sd _ Kaybarax
 * @type {{showLoginForm: {name: string, action: (function(*=, *=): *)}, handleLogin: {name: string, action: (function(*=, *=): *)}, showSignUpForm: {name: string, action: (function(*=, *=): *)}, showResetPasswordForm: {name: string, action: (function(*=, *=): *)}}}
 */
const LOGIN_ACTIONS = {

    showLoginForm: {
        name: 'showLoginForm',
        action: (store, payload) => {
            console.log('showLoginForm store, payload', store, payload);
            store.pageAction = LOGIN_PAGE_ACTIONS_ENUM.LOGIN;
            return {...store};
        }
    },

    showSignUpForm: {
        name: 'showSignUpForm',
        action: (store, payload) => {
            console.log('showSignUpForm store, payload', store, payload);
            store.signUpForm.user = new User();
            store.pageAction = LOGIN_PAGE_ACTIONS_ENUM.SIGN_UP;
            return {...store};
        }
    },

    showResetPasswordForm: {
        name: 'showResetPasswordForm',
        action: (store, payload) => {
            console.log('showResetPasswordForm state, payload', store, payload);
            store.pageAction = LOGIN_PAGE_ACTIONS_ENUM.RESET_PASSWORD;
            return {...store};
        }
    },

    handleLogin: {
        name: 'handleLogin',
        action: (store, payload) => {
            console.log('handleLogin store, payload', store, payload);
            let {loginModel, notificationAlert, appStore, appAuth} = payload;
            handleLogin(loginModel, notificationAlert, appStore, appAuth);
            return {...store};
        }
    },

    handleSignUp: {
        name: 'handleSignUp',
        action: (store, payload) => {
            console.log('handleLogin store, payload', store, payload);
            let {signUpModel, notificationAlert} = payload;
            handleSignUp(signUpModel, notificationAlert);
            return {...store};
        }
    },

    handleResetPassword: {
        name: 'handleResetPassword',
        action: (store, payload) => {
            console.log('handleLogin store, payload', store, payload);
            let {notificationAlert} = payload;
            handleResetPassword(notificationAlert);
            return {...store};
        }
    },

};

export default LOGIN_ACTIONS;

/**
 * sd _ Kaybarax
 * @param signUpModel
 * @param notificationAlert
 */
export function handleSignUp(signUpModel, notificationAlert) {

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
        notificationCallback('succ', 'Sign up success', notificationAlert)
    }
    tx.onerror = function (event) {
        console.log('error storing note ' + event.target.errorCode);
        notificationCallback('err', 'Sign up failed!', notificationAlert);
    }

}

/**
 * sd _ Kaybarax
 * @param loginModel
 * @param notificationAlert
 * @param appStore
 * @param appAuth
 */
export function handleLogin(loginModel, notificationAlert, appStore, appAuth) {

    let db = window.db;//get db;
    // Set up an object store and transaction
    let tx = db.transaction([APP_INDEXED_DB_DATASTORES.USERS], 'readonly');
    let store = tx.objectStore(APP_INDEXED_DB_DATASTORES.USERS);

    // Set up a request to get all users
    let req = store.getAll();

    // If we get an error
    req.onerror = function (event) {
        console.log('error getting users ', event.target.errorCode);
        notificationCallback('err', 'Cannot query users', notificationAlert);
    }

    let users = [];
    // onsuccess handler
    req.onsuccess = function (event) {

        users = event.target.result;
        console.log('handleLogin users', users);

        let user = users.find(item => item.usernameOrEmail === loginModel.usernameOrEmail &&
            item.password === loginModel.password);
        if (isNullUndefined(user)) {
            notificationCallback('err', 'User not found', notificationAlert);
            return;
        }
        appStore.user = deepCloneObject(user);
        notificationCallback('succ', 'Login success', notificationAlert);
        //to allow notification display
        setTimeout(_ => appAuth.handleLogin(), 2000);
    }

}

/**
 * sd _ Kaybarax
 * @param notificationAlert
 */
export function handleResetPassword(notificationAlert) {
    //todo: ... your logic ... you get the drill by now
    notificationCallback('info', 'You can play around with this, mate. Cheers!)',
        notificationAlert);
}
