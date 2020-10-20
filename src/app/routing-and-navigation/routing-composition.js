//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from "react";
import {Route, Switch} from "react-router-dom";
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
    SECURED_PAGE2EXAMPLE_VIEW_ROUTE
} from "./views-routes-declarations";


export function AppBaseRoutingComposition(props) {
    console.log('AppBaseRoutingComposition props', props);

    const routeMap = [
        <Route exact
               path={DEFAULT_VIEW_ROUTE.path}
               component={DEFAULT_VIEW_ROUTE.component}
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
            children={PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.component}
        />,
        <Route exact
               path={LOGIN_AND_REGISTRATION_VIEW_ROUTE.path}
               component={LOGIN_AND_REGISTRATION_VIEW_ROUTE.component}
        />,
        <Route exact
               path={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}
               component={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.component}
        />,
        <Route exact
               path={SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path}
               component={SECURED_PAGE2EXAMPLE_VIEW_ROUTE.component}
        />,
        <Route exact
               path={APP_DEV_MOCKS_VIEW_ROUTE.path}
               component={APP_DEV_MOCKS_VIEW_ROUTE.component}
        />,
        <Route component={_404_VIEW.component}/>,
    ];

    return (
        <Switch>
            {routeMap}
        </Switch>
    );

}
