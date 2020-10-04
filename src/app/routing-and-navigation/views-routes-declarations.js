//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import React from 'react';
import Login from "../views/unsecured-app-views/login";
import Page1Example from "../views/secured-app-views/page-1-example";
import Page2Example from "../views/secured-app-views/page-2-example";
import Page3Example from "../views/secured-app-views/page-3-example";
import Page4Example from "../views/secured-app-views/page-4-example";
import NotFound from "../views/not-found";
import AppDevScratchPad from "../../app-dev-scratch-pad/app-dev-scratch-pad";
import Page4SubItemExample from "../views/secured-app-views/page-4-sub-item-example";
import WithStoresHoc from "../stores/with-stores-hoc";

////declare the application views for routing
//the view with routePathPattern of '/', i.e the default view on app bootstrap
export const DEFAULT_VIEW_ROUTE = {
  view: WithStoresHoc(Login, ['login', 'appStore']),
  routeName: '',
  routePathPattern: '/',
};

//for this app which requires authentication, the landing view after authentication
export const HOME_VIEW_ROUTE = {
  view: WithStoresHoc(Page1Example, ['page1ExampleStore', 'appStore']),
  routeName: 'home',
  routePathPattern: '/home',
};

//and then the other views routes declarations
export const PAGE2EXAMPLE_VIEW_ROUTE = {
  view: WithStoresHoc(Page2Example, ['page2ExampleStore', 'appStore']),
  routeName: 'page-2-example',
  routePathPattern: '/page-2-example',
};

export const PAGE3EXAMPLE_VIEW_ROUTE = {
  view: WithStoresHoc(Page3Example, ['page3ExampleStore', 'appStore']),
  routeName: 'page-3-example',
  routePathPattern: '/page-3-example',
};

export const PAGE4EXAMPLE_VIEW_ROUTE = {
  view: WithStoresHoc(Page4Example, ['page4ExampleStore', 'appStore']),
  routeName: 'page-4-example',
  routePathPattern: '/page-4-example',
};

export const PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE = {
  view: WithStoresHoc(Page4SubItemExample, ['page4ExampleStore', 'appStore']),
  routeName: 'page-4-item',
  routePathPattern: '/page-4-item/:item',
};

//and then finally the 404 route
export const _404_VIEW = {
  view: <NotFound/>,
  routeName: NotFound.routeName,
  routePathPattern: NotFound.routePathPattern,
};

//just added for your mocking of scenarios
export const APP_DEV_MOCKS_VIEW_ROUTE = {
  view: <AppDevScratchPad/>,
  routeName: AppDevScratchPad.routeName,
  routePathPattern: AppDevScratchPad.routePathPattern,
};
