/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, { ComponentType } from 'react';
import { inject, observer } from 'mobx-react';

const WithStoresHoc = <P extends object>(Wrapped: ComponentType<P>, stores: string[]): React.FC<P> => {
  const WithStores = inject(...stores)(observer(Wrapped));

  return function (props: P) {
    return <WithStores {...props} />;
  };
};

export default WithStoresHoc;
