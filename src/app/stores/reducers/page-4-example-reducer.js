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

export default function page4ExampleReducer(state = appStores.store.page4ExampleStore, action) {

    console.log('STORE_ACTIONS action', action);
    console.log('STORE_ACTIONS state', state);

    for (let key in STORE_ACTIONS) {
        let actionCase = STORE_ACTIONS[key].name;
        console.log('STORE_ACTIONS actionCase', actionCase);
        let actionCall = STORE_ACTIONS[key].action;
        console.log('STORE_ACTIONS actionCall', actionCall);
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
