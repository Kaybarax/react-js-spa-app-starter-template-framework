//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import React from "react";
import SafeComponentWrapper from "../safe-component-wrapper";
import appNavigation from "../routing-and-navigation/app-navigation";
import '../theme/nav-styles.scss';
import {
  APP_DEV_MOCKS_VIEW_ROUTE,
  HOME_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE
} from "../routing-and-navigation/views-routes-declarations";

export default function NavigationHeader(props) {

  let {routerStore, authStore, activity} = props;

  let slug = '' + window.location.href;
  slug = slug.split('/');
  slug = slug[slug.length - 1];

  return (
      <SafeComponentWrapper>
        <div>
          <ul>
            <li>
              <a
                  href={'/' + HOME_VIEW_ROUTE.routeName}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToHome(routerStore)
                  }}>Hi {activity?.appStore?.user?.name}</a>
            </li>
            <li
                id={`nav-${HOME_VIEW_ROUTE.routeName}`}
                className={`${(slug === HOME_VIEW_ROUTE.routeName) ? 'selected' : ''}`}
            >
              <a
                  href={'/' + HOME_VIEW_ROUTE.routeName}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToHome(routerStore);
                  }}>Page 1</a>
            </li>
            <li id={`nav-${PAGE2EXAMPLE_VIEW_ROUTE.routeName}`}
                className={`${(slug === PAGE2EXAMPLE_VIEW_ROUTE.routeName) ? 'selected' : ''}`}
            >
              <a
                  href={'/' + PAGE2EXAMPLE_VIEW_ROUTE.routeName}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToPage2Example(routerStore);
                  }}>Page 2</a>
            </li>
            <li id={`nav-${PAGE3EXAMPLE_VIEW_ROUTE.routeName}`}
                className={`${(slug === PAGE3EXAMPLE_VIEW_ROUTE.routeName) ? 'selected' : ''}`}
            >
              <a
                  href={'/' + PAGE3EXAMPLE_VIEW_ROUTE.routeName}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToPage3Example(routerStore)
                  }}>Page 3</a>
            </li>
            <li id={`nav-${PAGE4EXAMPLE_VIEW_ROUTE.routeName}`}
                className={`${(slug === PAGE4EXAMPLE_VIEW_ROUTE.routeName) ? 'selected' : ''}`}
            >
              <a
                  href={'/' + PAGE4EXAMPLE_VIEW_ROUTE.routeName}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToPage4Example(routerStore);
                  }}>Page 4</a>
            </li>
            <li id={'navigateToAppDevScratchPad'}>
              <a
                  href={'/' + APP_DEV_MOCKS_VIEW_ROUTE.routeName}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToAppDevScratchPad(routerStore);
                  }}>
                Go mock some stuff <span role={'img'}
                                         aria-labelledby={'navigateToAppDevScratchPad'}>😏️😏️😌️</span>
              </a>
            </li>
            <li>
              <a href={'/'}
                 onClick={_ => {
                   _.preventDefault();
                   authStore.handleLogout(activity);
                 }}>Logout</a>
            </li>
          </ul>
        </div>
      </SafeComponentWrapper>
  );

}
