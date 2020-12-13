//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import {combineReducers, createStore} from 'redux';
import AppStores from "./app-stores";
import appReducer from "./reducers/app-reducer";
import loginReducer from "./reducers/login-reducer";
import {StoreNames} from "./store-schemas";
import securedAppReducer from "./reducers/secured-app-reducer";
import page4ExampleReducer from "./reducers/page-4-example-reducer";
import page3ExampleReducer from "./reducers/page-3-example-reducer";
import page2ExampleReducer from "./reducers/page-2-example-reducer";
import page1ExampleReducer from "./reducers/page-1-example-reducer";

export const appStores = new AppStores();

export default function configureStore(store) {

    console.log('APP STORE: ', store);

    const rootReducer = combineReducers({
        [StoreNames.appStore]: appReducer,
        [StoreNames.loginStore]: loginReducer,
        [StoreNames.page1ExampleStore]: page1ExampleReducer,
        [StoreNames.page2ExampleStore]: page2ExampleReducer,
        [StoreNames.page3ExampleStore]: page3ExampleReducer,
        [StoreNames.page4ExampleStore]: page4ExampleReducer,
        [StoreNames.securedAppStore]: securedAppReducer,
    });

    return createStore(rootReducer, store);

}
