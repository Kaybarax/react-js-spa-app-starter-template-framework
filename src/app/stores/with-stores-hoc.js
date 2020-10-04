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

/**
 * sd _ Kaybarax
 * @param Wrapped
 * @param stores
 * @constructor
 */
const WithStoresHoc = (Wrapped, stores) => {

  let WithStores = (inject(...stores)(observer(Wrapped)));

  return function (props) {
    return (
        <WithStores {...props}/>
    );
  }

}

export default WithStoresHoc;
