//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {isEmptyObject} from '../util/util';
import {
  APP_DEV_MOCKS_VIEW_ROUTE,
  HOME_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE
} from "./views-routes-declarations";

/**
 * sd _ Kaybarax
 * NOTE1: THERE IS NO 'NAVIGATE TO DEFAULT' FOR THIS TEMPLATE FRAMEWORK, BECAUSE
 * THAT WOULD BE NAVIGATING TO LOGIN PAGE, AND THAT IS HANDLED BY LOGOUT LOGIC FROM 'AUTH-STORE'
 * NOTE2: HERE, NAVIGATION IS USING ".goTo(...)" BECAUSE THAT IS NAVIGATION FUNCTION PROVIDED BY
 * MOBX-STATE-ROUTE IN USE HERE! REPLACE WITH APPROPRIATE NAVIGATION FUNCTION IF USING ANOTHER
 * ROUTER IN OF YOUR CHOICE. LOGIC REMAINS THE SAME
 */
export class AppNavigation {

  navigate = (navigator, to, from, navParams, goingBack = false) => {
    this.navigatedFrom = from;
    this.navigatedTo = to;
    if (!isEmptyObject(navParams)) {
      this.navigatedToParams = navParams;
      navigator.goTo(this.navigatedTo, navParams);
    } else {
      this.navigatedToParams = null;//reset any previous navigation params
      navigator.goTo(this.navigatedTo);
    }
  };

  navigatedToParams = null;
  navigatedTo = null;
  navigatedFrom = null;

  navigateToHome = (navigator, navParams) => {
    this.navigate(
        navigator,
        HOME_VIEW_ROUTE.routeName,
        this.navigatedTo,
        navParams
    );
  }

  navigateToPage2Example = (navigator, navParams) => {
    this.navigate(
        navigator,
        PAGE2EXAMPLE_VIEW_ROUTE.routeName,
        this.navigatedTo,
        navParams
    );
  }

  navigateToPage3Example = (navigator, navParams) => {
    this.navigate(
        navigator,
        PAGE3EXAMPLE_VIEW_ROUTE.routeName,
        this.navigatedTo,
        navParams
    );
  }

  navigateToPage4Example = (navigator, navParams) => {
    this.navigate(
        navigator,
        PAGE4EXAMPLE_VIEW_ROUTE.routeName,
        this.navigatedTo,
        navParams
    );
  }

  navigateToPage4SubItemExample = (navigator, navParams) => {
    this.navigate(
        navigator,
        PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.routeName,
        this.navigatedTo,
        navParams
    );
  }

  navigateToAppDevScratchPad = (navigator, navParams) => {
    this.navigate(
        navigator,
        APP_DEV_MOCKS_VIEW_ROUTE.routeName,
        this.navigatedTo,
        navParams
    );
  }
}

const appNavigation = new AppNavigation();
export default appNavigation;
