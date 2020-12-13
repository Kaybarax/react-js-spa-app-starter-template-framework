/* eslint-disable */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import LOGIN_ACTIONS from "../../controllers/login-controller";
import {appStores} from "../index";

export default function loginReducer(state = appStores.store.loginStore, action) {

    console.log('LOGIN_ACTIONS action', action);
    console.log('LOGIN_ACTIONS state', state);

    for (let key in LOGIN_ACTIONS) {
        let actionCase = LOGIN_ACTIONS[key].name;
        let actionCall = LOGIN_ACTIONS[key].action;
        if (actionCase === action.type) {
            return actionCall.call(null, state, action.payload);
        }
    }

    return state;

}
