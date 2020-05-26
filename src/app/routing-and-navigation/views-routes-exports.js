//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax
import {
    _404_VIEW, APP_DEV_MOCKS_VIEW_ROUTE,
    DEFAULT_VIEW_ROUTE,
    HOME_VIEW_ROUTE,
    PAGE2EXAMPLE_VIEW_ROUTE,
    PAGE3EXAMPLE_VIEW_ROUTE,
    PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE,
    PAGE4EXAMPLE_VIEW_ROUTE
} from "./views-routes-declarations";

/**
 * sd _ Kaybarax
 * collect all declared views to provide for building them in the application routing stack
 * @type {({routePathPattern: string, view: *, routeName: string}|{routePathPattern: string, view: *, routeName: string}|{routePathPattern: string, view: *, routeName: string}|{routePathPattern: string, view: *, routeName: string}|{routePathPattern: string, view: *, routeName: string})[]}
 */
export const APPLICATION_VIEWS = [
    DEFAULT_VIEW_ROUTE,
    HOME_VIEW_ROUTE,
    PAGE2EXAMPLE_VIEW_ROUTE,
    PAGE4EXAMPLE_VIEW_ROUTE,
    PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE,
    PAGE3EXAMPLE_VIEW_ROUTE,
    _404_VIEW,
    APP_DEV_MOCKS_VIEW_ROUTE,
];

/**
 * sd _ Kaybarax
 * @param views
 * @returns {any}
 */
export function viewMapBuilder(views) {
    let viewMap = {};
    for (let view of views) {
        viewMap[view.routeName] = view.view;
    }
    return viewMap;
}
