/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { Link } from 'react-router-dom';
import '../theme/nav-styles.scss';
import {
  APP_DEV_MOCKS_VIEW_ROUTE,
  DEFAULT_VIEW_ROUTE,
  LOGIN_AND_REGISTRATION_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE,
} from './views-routes-declarations';
import { appNavigation, AppRoutes } from './app-navigation';
import { FC } from 'react';

export interface HeaderMenuNavigationProps {
  appStore: Record<string, unknown>;
}

export const HeaderMenuNavigation: FC<HeaderMenuNavigationProps> = props => {
  console.log('HeaderMenuNavigation props', props);

  // Don't destructure navigateTo to ensure we always use the latest instance
  console.log('appNavigation', appNavigation);

  const slug = '/' + window.location.pathname.split('/').pop();

  return (
    <div>
      <ul>
        <li>
          <a
            href={DEFAULT_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              appNavigation.navigateTo(AppRoutes.DEFAULT);
            }}
          >
            Hi! <span>👋️</span> RJSSASTF
          </a>
        </li>
        <li id={`nav-${DEFAULT_VIEW_ROUTE.path}`} className={`${slug === DEFAULT_VIEW_ROUTE.path ? 'selected' : ''}`}>
          <a
            href={DEFAULT_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              appNavigation.navigateTo(AppRoutes.DEFAULT);
            }}
          >
            Page 1
          </a>
        </li>
        <li
          id={`nav-${PAGE2EXAMPLE_VIEW_ROUTE.path}`}
          className={`${slug === PAGE2EXAMPLE_VIEW_ROUTE.path ? 'selected' : ''}`}
        >
          <a
            href={PAGE2EXAMPLE_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              appNavigation.navigateTo(AppRoutes.PAGE2);
            }}
          >
            Page 2
          </a>
        </li>
        <li
          id={`nav-${PAGE3EXAMPLE_VIEW_ROUTE.path}`}
          className={`${slug === PAGE3EXAMPLE_VIEW_ROUTE.path ? 'selected' : ''}`}
        >
          <a
            href={PAGE3EXAMPLE_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              appNavigation.navigateTo(AppRoutes.PAGE3);
            }}
          >
            Page 3
          </a>
        </li>
        <li
          id={`nav-${PAGE4EXAMPLE_VIEW_ROUTE.path}`}
          className={`${slug === PAGE4EXAMPLE_VIEW_ROUTE.path ? 'selected' : ''}`}
        >
          <a
            href={PAGE4EXAMPLE_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              appNavigation.navigateTo(AppRoutes.PAGE4);
            }}
          >
            Page 4
          </a>
        </li>
        <li id={'navigateToAppDevScratchPad'}>
          <a
            href={APP_DEV_MOCKS_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              appNavigation.navigateTo(AppRoutes.DEV_MOCKS);
            }}
          >
            Mock some stuff{' '}
            <span role={'img'} aria-labelledby={'navigateToAppDevScratchPad'}>
              😏️😏️😌️
            </span>
          </a>
        </li>
        <li>
          <Link to={LOGIN_AND_REGISTRATION_VIEW_ROUTE.path}>Log In</Link>
        </li>
      </ul>
    </div>
  );
};
