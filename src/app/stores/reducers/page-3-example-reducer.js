/* eslint-disable */
//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {appStores} from "../index";

export default function page3ExampleReducer(state = appStores.store.page3ExampleStore, action) {

    console.log('STORE_ACTIONS action', action);
    console.log('STORE_ACTIONS state', state);

    for (let key in STORE_ACTIONS) {
        let actionCase = STORE_ACTIONS[key].name;
        let actionCall = STORE_ACTIONS[key].action;
        if (actionCase === action.type) {
            return actionCall.call(null, state);
        }
    }

    return state

}

const STORE_ACTIONS = {

    updateStore: {
        name: 'updateStore',
        action: store => {
            return {...store};
        }
    },

};
