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
import StoreProviders from './stores-providers';

const WithZustandStoresHoc = <P extends object>(Wrapped: ComponentType<P>, storeNames: StoreName[]): React.FC<P> => {
  // Create a wrapper component that follows React Hook rules
  const WithStores: React.FC<P> = (props) => {
    const { stores, appStoresLoaded } = useAppStores();
    const [storeProps, setStoreProps] = useState<Record<string, unknown>>({});
    const namespace = 'AppStores';

    useEffect(() => {
      if (appStoresLoaded) {
        const newStoreProps: Record<string, unknown> = {};

        for (const storeName of storeNames) {
          try {
            // First try to get the store from StoreProviders
            if (StoreProviders[storeName]) {
              newStoreProps[storeName] = StoreProviders[storeName].storeProvidedBy(namespace);
            } 
            // Fall back to the stores from useAppStores
            else if (!isNullUndefined(stores) && !isEmptyObject(stores)) {
              newStoreProps[storeName] = stores[storeName];
            }
          } catch (error) {
            console.error(`Error getting store ${storeName}:`, error);
          }
        }

        setStoreProps(newStoreProps);
      }
    }, [stores, appStoresLoaded]);

    // Check if stores are available from StoreProviders or if they're loaded in useAppStores
    const areStoresAvailable = storeNames.every(storeName => 
      (StoreProviders[storeName] && !isNullUndefined(StoreProviders[storeName].storeProvidedBy(namespace))) || 
      (appStoresLoaded && !isNullUndefined(stores) && !isEmptyObject(stores) && !isNullUndefined(stores[storeName]))
    );

    // Wait for stores to be loaded
    if (!areStoresAvailable) {
      return <div>Loading stores...</div>;
    }

    // Merge the store props with the component props
    return <Wrapped {...props} {...storeProps} />;
  };

  return WithStores;
};

export default WithZustandStoresHoc;
