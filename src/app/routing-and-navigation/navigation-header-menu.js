//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from "react";
import {Link} from 'react-router-dom';
import SafeComponentWrapper from "../safe-component-wrapper";
import '../theme/nav-styles.scss';
import {
  APP_DEV_MOCKS_VIEW_ROUTE,
  DEFAULT_VIEW_ROUTE,
  LOGIN_AND_REGISTRATION_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE
} from "./views-routes-declarations";
import appNavigation from "./app-navigation";

export default function NavigationHeaderMenu(props) {
  console.log('NavigationHeaderMenu props', props);

  let {
    appStore,
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
                  href={DEFAULT_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateHome();
                  }}>Hi! <span>👋️</span> RJSSASTF {appStore?.user?.name}</a>
            </li>
            <li
                id={`nav-${DEFAULT_VIEW_ROUTE.path}`}
                className={`${(slug === DEFAULT_VIEW_ROUTE.path) ? 'selected' : ''}`}
            >
              <a
                  href={DEFAULT_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateHome();
                  }}>Page 1</a>
            </li>
            <li id={`nav-${PAGE2EXAMPLE_VIEW_ROUTE.path}`}
                className={`${(slug === PAGE2EXAMPLE_VIEW_ROUTE.path) ? 'selected' : ''}`}
            >
              <a
                  href={PAGE2EXAMPLE_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToPage2Example();
                  }}>Page 2</a>
            </li>
            <li id={`nav-${PAGE3EXAMPLE_VIEW_ROUTE.path}`}
                className={`${(slug === PAGE3EXAMPLE_VIEW_ROUTE.path) ? 'selected' : ''}`}
            >
              <a
                  href={PAGE3EXAMPLE_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToPage3Example();
                  }}>Page 3</a>
            </li>
            <li id={`nav-${PAGE4EXAMPLE_VIEW_ROUTE.path}`}
                className={`${(slug === PAGE4EXAMPLE_VIEW_ROUTE.path) ? 'selected' : ''}`}
            >
              <a
                  href={PAGE4EXAMPLE_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToPage4Example();
                  }}>Page 4</a>
            </li>
            <li id={'navigateToAppDevScratchPad'}>
              <a
                  href={APP_DEV_MOCKS_VIEW_ROUTE.path}
                  onClick={_ => {
                    _.preventDefault();
                    appNavigation.navigateToAppDevScratchPad();
                  }}
              >
                Mock some stuff <span
                  role={'img'}
                  aria-labelledby={'navigateToAppDevScratchPad'}>😏️😏️😌️</span>
              </a>
            </li>
            <li>
              <Link
                  to={LOGIN_AND_REGISTRATION_VIEW_ROUTE.path}
              >Log In</Link>
            </li>
          </ul>
        </div>
      </SafeComponentWrapper>
  );

}
