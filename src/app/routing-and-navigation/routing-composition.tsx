/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  _404_VIEW,
  APP_DEV_MOCKS_VIEW_ROUTE,
  DEFAULT_VIEW_ROUTE,
  LOGIN_AND_REGISTRATION_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE,
  SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE,
  SECURED_PAGE2EXAMPLE_VIEW_ROUTE,
} from './views-routes-declarations';
import { useAppNavigation } from './use-app-navigation';

interface AppBaseRoutingCompositionProps {
  [key: string]: unknown;
}

export function AppBaseRoutingComposition(props: AppBaseRoutingCompositionProps): JSX.Element {
  console.log('AppBaseRoutingComposition props', props);

  // Initialize appNavigation with router props
  useAppNavigation();

  const routeMap = [
    <Route key="default" path={DEFAULT_VIEW_ROUTE.path} element={<DEFAULT_VIEW_ROUTE.component />} />,
    <Route key="page2" path={PAGE2EXAMPLE_VIEW_ROUTE.path} element={<PAGE2EXAMPLE_VIEW_ROUTE.component />} />,
    <Route key="page3" path={PAGE3EXAMPLE_VIEW_ROUTE.path} element={<PAGE3EXAMPLE_VIEW_ROUTE.component />} />,
    <Route key="page4" path={PAGE4EXAMPLE_VIEW_ROUTE.path} element={<PAGE4EXAMPLE_VIEW_ROUTE.component />} />,
    <Route
      key="page4-sub-item"
      path={PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.path}
      element={<PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.component />}
    />,
    <Route
      key="login"
      path={LOGIN_AND_REGISTRATION_VIEW_ROUTE.path}
      element={<LOGIN_AND_REGISTRATION_VIEW_ROUTE.component />}
    />,
    <Route
      key="secured-homepage"
      path={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}
      element={<SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.component />}
    />,
    <Route
      key="secured-page2"
      path={SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path}
      element={<SECURED_PAGE2EXAMPLE_VIEW_ROUTE.component />}
    />,
    <Route key="app-dev-mocks" path={APP_DEV_MOCKS_VIEW_ROUTE.path} element={<APP_DEV_MOCKS_VIEW_ROUTE.component />} />,
    <Route key="404" path="*" element={<_404_VIEW.component />} />,
  ];

  return <Routes>{routeMap}</Routes>;
}
