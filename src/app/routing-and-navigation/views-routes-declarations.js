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

////declare the application views for routing
//the view with routePathPattern of '/', i.e the default view on app bootstrap
export const DEFAULT_VIEW_ROUTE = {
  view: <Login/>,
  routeName: Login.routeName,
  routePathPattern: Login.routePathPattern,
};

//for this app which requires authentication, the landing view after authentication
export const HOME_VIEW_ROUTE = {
  view: <Page1Example/>,
  routeName: Page1Example.routeName,
  routePathPattern: Page1Example.routePathPattern,
};

//and then the other views routes declarations
export const PAGE2EXAMPLE_VIEW_ROUTE = {
  view: <Page2Example/>,
  routeName: Page2Example.routeName,
  routePathPattern: Page2Example.routePathPattern,
};

export const PAGE3EXAMPLE_VIEW_ROUTE = {
  view: <Page3Example/>,
  routeName: Page3Example.routeName,
  routePathPattern: Page3Example.routePathPattern,
};

export const PAGE4EXAMPLE_VIEW_ROUTE = {
  view: <Page4Example/>,
  routeName: Page4Example.routeName,
  routePathPattern: Page4Example.routePathPattern,
};

export const PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE = {
  view: <Page4SubItemExample/>,
  routeName: Page4SubItemExample.routeName,
  routePathPattern: Page4SubItemExample.routePathPattern,
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
