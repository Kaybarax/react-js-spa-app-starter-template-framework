//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {isNullUndefined, objectKeyExists} from "../util/util";

/**
 * sd _ Kaybarax
 * @type {{decrementClick: {name: string, action: (function(*=, *=): *)}, incrementClick: {name: string, action: (function(*=, *=): *)}}}
 */
const APP_ACTIONS = {

    incrementClick: {
        name: 'incrementClick',
        action: (store, payload) => {
            console.log('incrementClick store, payload', store, payload);
            store.clicksCount += 1
            return {...store};
        }
    },

    decrementClick: {
        name: 'decrementClick',
        action: (store, payload) => {
            console.log('incrementClick store, payload', store, payload);
            store.clicksCount -= 1
            return {...store};
        }
    },

};

export default APP_ACTIONS;

/**
 * sd _ Kaybarax
 * @param key
 * @param model
 * @param expectationFunction
 * @returns {*}
 */
export function displayFieldExpectationSatisfied(key, model, expectationFunction) {
    if (isNullUndefined(model))
        return false;
    if (!objectKeyExists(model, key))
        return false;
    return expectationFunction(model[key]);
}
