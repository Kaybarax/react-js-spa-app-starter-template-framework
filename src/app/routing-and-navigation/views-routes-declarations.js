//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import NotFound from "../views/not-found";
import AppDevScratchPad from "../../app-dev-scratch-pad/app-dev-scratch-pad";

////declare the application views for routing
//the component with routePathPattern of '/', i.e the default component on app bootstrap
export const DEFAULT_VIEW_ROUTE = {
  component: React.lazy(() =>
      /* webpackChunkName: "DEFAULT_VIEW_ROUTE"*/ import("../views/unsecured-app-views/login")),
  path: '/',
};

//for this app which requires authentication, the landing component after authentication
export const HOME_VIEW_ROUTE = {
  component: React.lazy(() =>
      /* webpackChunkName: "HOME_VIEW_ROUTE"*/ import("../views/secured-app-views/page-1-example")),
  path: '/home',
};

//and then the other views routes declarations
export const PAGE2EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() =>
      /* webpackChunkName: "PAGE2EXAMPLE_VIEW_ROUTE"*/ import("../views/secured-app-views/page-2-example")),
  path: '/page-2-example',
};

export const PAGE3EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() =>
      /* webpackChunkName: "PAGE3EXAMPLE_VIEW_ROUTE"*/ import("../views/secured-app-views/page-3-example")),
  path: '/page-3-example',
};

export const PAGE4EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() =>
      /* webpackChunkName: "PAGE4EXAMPLE_VIEW_ROUTE"*/ import("../views/secured-app-views/page-4-example")),
  path: '/page-4-example',
};

export const PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() =>
      /* webpackChunkName: "PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE"*/ import("../views/secured-app-views/page-4-sub-item-example")),
  path: '/page-4-item',
};

//and then finally the 404 route
export const _404_VIEW = {
  component: React.lazy(() =>
      /* webpackChunkName: "_404_VIEW"*/ import("../views/not-found")),
  path: NotFound.path,
};

//just added for your mocking of scenarios
export const APP_DEV_MOCKS_VIEW_ROUTE = {
  component: React.lazy(() =>
      /* webpackChunkName: "APP_DEV_MOCKS_VIEW_ROUTE"*/ import("../../app-dev-scratch-pad/app-dev-scratch-pad")),
  path: AppDevScratchPad.path,
};
