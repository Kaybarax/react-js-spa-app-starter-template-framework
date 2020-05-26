//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {action, observable} from 'mobx';
import {RouterState} from 'mobx-state-router';
import {LoginStoreProvider} from './stores-providers';
import {MobX_StoreKey_Identifier_In_LocalStorage} from './stores-data-store';
import {
    clearAllPersistedStoresToLocalStorage,
    persistedStoreFromLocalStorage,
    persistStoreUpdatesToLocalStorageOnPossibleUpdateOfEvents,
    unregisterPersistenceEventListeners,
} from './store-utils';
import {DEFAULT_VIEW_ROUTE, HOME_VIEW_ROUTE} from "../routing-and-navigation/views-routes-declarations";
import {isEmptyObject, isNullUndefined} from "../util/util";
import {toastNotificationCallback} from "../shared-components-and-modules/notification-center/notifications-controller";

const defaultState = new RouterState(HOME_VIEW_ROUTE.routeName);
const signOut = new RouterState(DEFAULT_VIEW_ROUTE.routeName);

/**
 * sd _ Kaybarax
 */
export class AuthStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    rootStore;

    //to assist with differentiation during storage to persistence media, if application uses several stores classes
    static namespace = 'AuthStore_' + MobX_StoreKey_Identifier_In_LocalStorage;

    persistMyStoresToLocalStorageOnEvent(myStores) {
        persistStoreUpdatesToLocalStorageOnPossibleUpdateOfEvents(myStores);
    }

    //NOTE: FOR SECURITY CONSIDERATION THIS STORE SHOULD NOT BE STORED IN BROWSER STORAGE
    // BECAUSE IT HOLDS THE USER'S password
    @observable
    login =
        persistedStoreFromLocalStorage(
            LoginStoreProvider.storeKey(AuthStore.namespace),
            LoginStoreProvider,
        ) || LoginStoreProvider.storeProvider(AuthStore.namespace);

    /**
     * my custom function to keep my signed in user's details up to date
     * @param user
     */
    @action
    createSignedInUser = (user) => {
        // console.log('createSignedInUser <--user--> :: ');
        this.rootStore.appStores.app.user = user;
    };

    // collect for provision for offline storage either to localstorage, indexedDB or any other app-offline storage
    // Every store that you add, MAKE SURE to add it also here
    stores = [];

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
        //like I have guided you above
        // console.log("isAuthenticated  this.rootStore.appStores.app.user:: \t", toJS(this.rootStore.appStores.app.user))
        return !(isNullUndefined(this.rootStore.appStores.app.user) || isEmptyObject(this.rootStore.appStores.app.user));
    };

    //Where should we redirect after sign-in/authentication?
    @observable
    signInRedirect = defaultState;

    @action
    handleLogin = () => {
        // NOTE: on success of your login function and initializations and stuff
        //  you will call this function, i.e something like "authStore.handleLogin()"
        //  to complete signing you in to the application, by executing the line below.
        this.rootStore.routerStore.goTo(HOME_VIEW_ROUTE.routeName);
    };

    @action
    setSignInRedirect = (routerState) => {
        this.signInRedirect = routerState;
    };

    resetSignInRedirect() {
        this.setSignInRedirect(defaultState);
    }

    @action
    handleLogout = (activity) => {
        try {
            // TODO: your logout logic, e.g:
            //  -> AWS sign out if you are using AWS: await Auth.signOut();
            //  -> or another type of sign out process that you are using

            // START my example sign out logic for this framework template share. Of course, remove it and use your own
            //like I have guided you above
            this.rootStore.appStores.app.user = null;
            // END my logic

            // then your frontend app sign out completion
            this.stopStoresPersistenceToLocalStorageAndClearOnLogout();
            this.rootStore.routerStore.goTo(signOut);
            toastNotificationCallback('succ', 'Logged Out', activity);
            setTimeout(_ => window.location.reload(), 2000);//time to allow notification display
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    };

    stopStoresPersistenceToLocalStorageAndClearOnLogout = () => {
        unregisterPersistenceEventListeners();
        clearAllPersistedStoresToLocalStorage();
    };

}
