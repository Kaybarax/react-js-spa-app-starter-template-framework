/* eslint-disable */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import APP_ACTIONS from "../../controllers/app-controller";
import {appStores} from "../index";

export default function appReducer(state = appStores.store.appStore, action) {

    console.log('APP_ACTIONS action', action);
    console.log('APP_ACTIONS state', state);

    for (let key in APP_ACTIONS) {
        let actionCase = APP_ACTIONS[key].name;
        console.log('APP_ACTIONS actionCase', actionCase);
        let actionCall = APP_ACTIONS[key].action;
        console.log('APP_ACTIONS actionCall', actionCall);
        if (actionCase === action.type) {
            return actionCall.call(null, state, action.payload);
        }
    }

    return state

}
