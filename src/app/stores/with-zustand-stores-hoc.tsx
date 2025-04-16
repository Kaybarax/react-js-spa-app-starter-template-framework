/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, { ComponentType, useEffect, useState } from 'react';
import { useAppStores } from './zustand';
import { StoreName } from './store-schemas';
import { isEmptyObject, isNullUndefined } from '../util/util';

const WithZustandStoresHoc = <P extends object>(Wrapped: ComponentType<P>, storeNames: StoreName[]): React.FC<P> => {
  // Create a wrapper component that follows React Hook rules
  const WithStores: React.FC<P> = (props) => {
    const { stores, appStoresLoaded } = useAppStores();
    const [storeProps, setStoreProps] = useState<Record<string, unknown>>({});

    useEffect(() => {
      if (appStoresLoaded && !isNullUndefined(stores) && !isEmptyObject(stores)) {
        const newStoreProps: Record<string, unknown> = {};

        for (const storeName of storeNames) {
          try {
            newStoreProps[storeName] = stores[storeName];
          } catch (error) {
            console.error(`Error getting store ${storeName}:`, error);
          }
        }

        setStoreProps(newStoreProps);
      }
    }, [stores, appStoresLoaded]);

    // Wait for stores to be loaded
    if (!appStoresLoaded || isNullUndefined(stores) || isEmptyObject(stores)) {
      return <div>Loading stores...</div>;
    }

    // Merge the store props with the component props
    return <Wrapped {...props} {...storeProps} />;
  };

  return WithStores;
};

export default WithZustandStoresHoc;
