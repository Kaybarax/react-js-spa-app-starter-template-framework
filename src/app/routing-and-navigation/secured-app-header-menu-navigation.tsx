/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import '../theme/nav-styles.scss';
import {
  DEFAULT_VIEW_ROUTE,
  SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE,
  SECURED_PAGE2EXAMPLE_VIEW_ROUTE,
} from './views-routes-declarations';
import { appNavigation } from './app-navigation';
import authStore from '../stores/auth-store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SecuredAppHeaderMenuNavigation(props: any) {
  console.log('SecuredAppHeaderMenuNavigation props', props);

  const { appStore } = props;
  console.log('appStore -> ', appStore);

  const { navigateTo } = appNavigation;
  console.log('navigateTo', navigateTo);

  const slug = '/' + window.location.href.split('/').pop();

  return (
    <div>
      <ul>
        <li>
          <a
            href={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              // appNavigation.navigateToSecuredAppHomepageExample();
            }}
          >
            Hi! <span>👋️</span> Welcome {appStore?.user?.name}
          </a>
        </li>
        <li
          id={`nav-${SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}`}
          className={`${slug === SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path ? 'selected' : ''}`}
        >
          <a
            href={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              // appNavigation.navigateToSecuredAppHomepageExample();
            }}
          >
            Secured App Home
          </a>
        </li>
        <li
          id={`nav-${SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path}`}
          className={`${slug === SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path ? 'selected' : ''}`}
        >
          <a
            href={SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              // appNavigation.navigateToSecuredPage2Example();
            }}
          >
            Secured App Page 2
          </a>
        </li>
        <li>
          <a
            href={DEFAULT_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              authStore.handleLogout();
            }}
          >
            Log out
          </a>
        </li>
      </ul>
    </div>
  );
}
