//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from "react";
import {RouterState} from 'mobx-state-router';
import {Route, Switch} from "react-router-dom";
// import Switch from "react-router-dom/Switch";
import {
  APP_DEV_MOCKS_VIEW_ROUTE,
  DEFAULT_VIEW_ROUTE,
  HOME_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE
} from "./views-routes-declarations";
import WithStoresHoc from "../stores/with-stores-hoc";

/**
 * sd _ Kaybarax
 * @param fromState
 * @param toState
 * @param routerStore
 * @returns {Promise}
 */
const checkIfAuthenticated = async (fromState, toState, routerStore) => {
  const {
    rootStore: {authStore},
  } = routerStore;

  let isAuthenticated = await authStore
      .isAuthenticated()
      .then((isAuthenticated) => {
        return isAuthenticated;
      });

  if (isAuthenticated) {
    return Promise.resolve();
  } else {
    //grab the state/view/page that navigation towards was attempted,
    //so that on return after authentication, the user can still be routed to the intended page
    authStore.setSignInRedirect(toState);
    //then sent the user to first get authenticated before access is allowed
    return Promise.reject(new RouterState(DEFAULT_VIEW_ROUTE.routeName));
  }
};

/**
 * sd _ Kaybarax
 * Redirect a user to the logged-in-app page if they are already logged in
 * and trying to access the login page
 * @returns {*}
 */
const redirectIfLoggedIn = async (fromState, toState, routerStore) => {
  const {
    rootStore: {authStore},
  } = routerStore;

  let isAuthenticated = await authStore
      .isAuthenticated()
      .then((isAuthenticated) => {
        return isAuthenticated;
      });

  if (isAuthenticated) {
    return Promise.reject(new RouterState(HOME_VIEW_ROUTE.routeName));
  } else {
    //grab the state/view/page that navigation towards was attempted,
    //so that on return after authentication, the user can still be routed to the intended page
    authStore.setSignInRedirect(toState);
    //then sent the user to first get authenticated before access is allowed
    return Promise.reject(new RouterState(DEFAULT_VIEW_ROUTE.routeName));
  }
};

/**
 * sd _ Kaybarax
 * views routes
 * @type {*[]}
 */
// export const routes = [
//
//   {
//     name: DEFAULT_VIEW_ROUTE.routeName,
//     pattern: DEFAULT_VIEW_ROUTE.routePathPattern,
//     beforeEnter: async (fromState, toState, routerStore) => {
//       return redirectIfLoggedIn(fromState, toState, routerStore);
//     },
//     onEnter: (fromState, toState, routerStore) => {
//       //in case you needed to access the appStores and act on data
//       const {
//         rootStore: {appStores},
//       } = routerStore;
//
//       //TODO: call any and all of your here that you need to be executed on entering this page
//       // no need to do that on the page/view's componentDidMount. The page/component should only
//       // handle rendering logic when called
//
//       return Promise.resolve();
//     },
//   },
//
//   {
//     name: HOME_VIEW_ROUTE.routeName,
//     pattern: HOME_VIEW_ROUTE.routePathPattern,
//     beforeEnter: async (fromState, toState, routerStore) => {
//
//       //TODO: call any and all of your functions here, that you need to be executed before entering this page
//       // no need to do that on the page/view's componentWillMount. The page/component should only
//       // handle rendering logic when called
//
//       return checkIfAuthenticated(fromState, toState, routerStore);
//     },
//     onEnter: (fromState, toState, routerStore) => {
//       //in case you needed to access the appStores and act on data
//       const {
//         rootStore: {appStores},
//       } = routerStore;
//
//       //TODO: call any and all of your here that you need to be executed on entering this page
//       // no need to do that on the page/view's componentDidMount. The page/component should only
//       // handle rendering logic when called
//
//       return Promise.resolve();
//     },
//   },
//
//   {
//     name: PAGE2EXAMPLE_VIEW_ROUTE.routeName,
//     pattern: PAGE2EXAMPLE_VIEW_ROUTE.routePathPattern,
//     beforeEnter: async (fromState, toState, routerStore) => {
//
//       //TODO: call any and all of your functions here, that you need to be executed before entering this page
//       // no need to do that on the page/view's componentWillMount. The page/component should only
//       // handle rendering logic when called
//
//       return checkIfAuthenticated(fromState, toState, routerStore);
//     },
//     onEnter: (fromState, toState, routerStore) => {
//       //in case you needed to access the appStores and act on data
//       const {
//         rootStore: {appStores},
//       } = routerStore;
//
//       //TODO: call any and all of your here that you need to be executed on entering this page
//       // no need to do that on the page/view's componentDidMount. The page/component should only
//       // handle rendering logic when called
//
//       return Promise.resolve();
//     },
//   },
//
//   {
//     name: PAGE3EXAMPLE_VIEW_ROUTE.routeName,
//     pattern: PAGE3EXAMPLE_VIEW_ROUTE.routePathPattern,
//     beforeEnter: async (fromState, toState, routerStore) => {
//
//       //TODO: call any and all of your functions here, that you need to be executed before entering this page
//       // no need to do that on the page/view's componentWillMount. The page/component should only
//       // handle rendering logic when called
//
//       return checkIfAuthenticated(fromState, toState, routerStore);
//     },
//     onEnter: (fromState, toState, routerStore) => {
//       //in case you needed to access the appStores and act on data
//       const {
//         rootStore: {appStores},
//       } = routerStore;
//
//       //TODO: call any and all of your here that you need to be executed on entering this page
//       // no need to do that on the page/view's componentDidMount. The page/component should only
//       // handle rendering logic when called
//
//       return Promise.resolve();
//     },
//   },
//
//   {
//     name: PAGE4EXAMPLE_VIEW_ROUTE.routeName,
//     pattern: PAGE4EXAMPLE_VIEW_ROUTE.routePathPattern,
//     beforeEnter: async (fromState, toState, routerStore) => {
//
//       //TODO: call any and all of your functions here, that you need to be executed before entering this page
//       // no need to do that on the page/view's componentWillMount. The page/component should only
//       // handle rendering logic when called
//
//       return checkIfAuthenticated(fromState, toState, routerStore);
//     },
//     onEnter: (fromState, toState, routerStore) => {
//       //in case you needed to access the appStores and act on data
//       const {
//         rootStore: {appStores},
//       } = routerStore;
//
//       //TODO: call any and all of your here that you need to be executed on entering this page
//       // no need to do that on the page/view's componentDidMount. The page/component should only
//       // handle rendering logic when called
//
//       return Promise.resolve();
//     },
//   },
//
//   {
//     name: PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.routeName,
//     pattern: PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.routePathPattern,
//     beforeEnter: async (fromState, toState, routerStore) => {
//
//       //TODO: call any and all of your functions here, that you need to be executed before entering this page
//       // no need to do that on the page/view's componentWillMount. The page/component should only
//       // handle rendering logic when called
//
//       return checkIfAuthenticated(fromState, toState, routerStore);
//     },
//     onEnter: (fromState, toState, routerStore) => {
//       //in case you needed to access the appStores and act on data
//       const {
//         rootStore: {appStores},
//       } = routerStore;
//
//       //TODO: call any and all of your here that you need to be executed on entering this page
//       // no need to do that on the page/view's componentDidMount. The page/component should only
//       // handle rendering logic when called
//
//       return Promise.resolve();
//     },
//   },
//
//   {
//     name: _404_VIEW.routeName,
//     pattern: _404_VIEW.routePathPattern,
//     onEnter: (fromState, toState, routerStore) => {
//       //in case you needed to access the appStores and act on data
//       const {
//         rootStore: {appStores},
//       } = routerStore;
//       return Promise.resolve();
//     },
//   },
//
//   {
//     name: APP_DEV_MOCKS_VIEW_ROUTE.routeName,
//     pattern: APP_DEV_MOCKS_VIEW_ROUTE.routePathPattern,
//     onEnter: (fromState, toState, routerStore) => {
//       //in case you needed to access the appStores and act on data
//       const {
//         rootStore: {appStores},
//       } = routerStore;
//       return Promise.resolve();
//     },
//   },
//
// ];

export function AppBaseRoutingComposition() {

  const routeMap = [
    <Route exact
           path={DEFAULT_VIEW_ROUTE.path}
           component={DEFAULT_VIEW_ROUTE.component}
    />,
    <Route exact
           path={HOME_VIEW_ROUTE.path}
           component={HOME_VIEW_ROUTE.component}
    />,
    <Route exact
           path={PAGE2EXAMPLE_VIEW_ROUTE.path}
           component={PAGE2EXAMPLE_VIEW_ROUTE.component}
    />,
    <Route exact
           path={PAGE3EXAMPLE_VIEW_ROUTE.path}
           component={PAGE3EXAMPLE_VIEW_ROUTE.component}
    />,
    <Route exact
           path={PAGE4EXAMPLE_VIEW_ROUTE.path}
           component={PAGE4EXAMPLE_VIEW_ROUTE.component}
    />,
    <Route exact
           path={PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.path}
           component={PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.component}
    />,
    <Route exact
           path={APP_DEV_MOCKS_VIEW_ROUTE.path}
           component={APP_DEV_MOCKS_VIEW_ROUTE.component}
    />,
  ];

  return (
      <Switch>
        {routeMap}
      </Switch>
  );

}
