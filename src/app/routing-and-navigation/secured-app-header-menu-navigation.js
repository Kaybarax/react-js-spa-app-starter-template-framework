//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from "react";
import SafeComponentWrapper from "../safe-component-wrapper";
import '../theme/nav-styles.scss';
import {
  DEFAULT_VIEW_ROUTE,
  SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE,
  SECURED_PAGE2EXAMPLE_VIEW_ROUTE
} from "./views-routes-declarations";
import appNavigation from "./app-navigation";
import appAuth from "../stores/app-auth";

export default function SecuredAppHeaderMenuNavigation(props) {
  console.log('SecuredAppHeaderMenuNavigation props', props);

  let {
    appStore
  } = props;

  let slug = '' + window.location.href;
  slug = slug.split('/');
  slug = '/' + slug[slug.length - 1];

  return (
      <SafeComponentWrapper>
        <div>
          <ul>
            <li>
              <a
                  href={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToSecuredAppHomepageExample();
                  }}>Hi! <span>👋️</span> Welcome {appStore?.user?.name}</a>
            </li>
            <li
                id={`nav-${SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}`}
                className={`${(slug === SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path) ? 'selected' : ''}`}
            >
              <a
                  href={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToSecuredAppHomepageExample();
                  }}>Secured App Home</a>
            </li>
            <li id={`nav-${SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path}`}
                className={`${(slug === SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path) ? 'selected' : ''}`}
            >
              <a
                  href={SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToSecuredPage2Example();
                  }}>Secured App Page 2</a>
            </li>
            <li>
              <a
                  href={DEFAULT_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appAuth.handleLogout();
                  }}
              >Log out</a>
            </li>
          </ul>
        </div>
      </SafeComponentWrapper>
  );

}
