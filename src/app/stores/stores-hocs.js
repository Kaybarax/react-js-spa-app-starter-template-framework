//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from "react";
import {inject, observer} from "mobx-react";
import {isNullUndefined} from "../util/util";

/**
 * sd _ Kaybarax
 * @param Wrapped
 * @param stores
 * @constructor
 */
export const WithMobXStoresHoc = (Wrapped, stores) => {

    let WithStores = (inject(...stores)(observer(Wrapped)));

    return function (props) {
        return (
            <WithStores {...props}/>
        );
    }

}

/**
 * sd _ Kaybarax
 * @param dispatch
 * @param type
 * @param payload
 */
export const storeUpdateDispatch = (dispatch, type, payload = null) => {
    console.log('storeUpdateDispatch');
    if (isNullUndefined(payload))
        dispatch({type});
    else
        dispatch({type, payload})
}
