//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {isEmptyObject, isNullUndefined} from '../util/util';
import {
    APP_DEV_MOCKS_VIEW_ROUTE,
    DEFAULT_VIEW_ROUTE,
    LOGIN_AND_REGISTRATION_VIEW_ROUTE,
    PAGE2EXAMPLE_VIEW_ROUTE,
    PAGE3EXAMPLE_VIEW_ROUTE,
    PAGE4EXAMPLE_VIEW_ROUTE,
    SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE,
    SECURED_PAGE2EXAMPLE_VIEW_ROUTE
} from "./views-routes-declarations";

/**
 * sd _ Kaybarax
 * NOTE: HERE, NAVIGATION IS USING ".push({pathname, search?, state?:{}})" AND ".goBack()"
 * BECAUSE THAT IS NAVIGATION FUNCTION PROVIDED BY
 * REACT-ROUTER-DOM's "useHistory() as 'navigator'", IN USE HERE, FOR PROGRAMMATIC NAVIGATION!
 * REPLACE WITH APPROPRIATE PROGRAMMATIC NAVIGATION FUNCTION IF USING ANOTHER
 * ROUTER IN OF YOUR CHOICE. LOGIC REMAINS THE SAME
 */
export class AppNavigation {

    navigatedToParams = null;
    navigatedTo = null;
    navigatedFrom = null;
    navigator = null;
    navStore = null;
    //ad hoc. For any extra help with navigation functionalities
    globalNavigationProps = {
        //e.g
        //a global reference to the navigator
        navigator: null,
        // check if user has been logged out by going back to a previous
        // unsecured page, or was it by clicking logout
        internalLogout: false,
    }

    //special case for helping with react-router-dom
    //history router
    initNavigator = ({history, location, match}) => {
        this.navigator = {history, location, match};
        // console.log('this.navigator', this.navigator);
    };

    navigate = (navTo, navParams = null, goingBack = false) => {

        this.navigatedFrom = this.navigatedTo || DEFAULT_VIEW_ROUTE.path;
        this.navigatedTo = navTo;
        //clear any previous navigation params
        this.navigatedToParams = null;

        if (!isNullUndefined(navParams)) {
            //navParams should be object type
            if (isEmptyObject(navParams)) {
                alert('Navigation Data Params Should be of Object Type');
                return; //terminate navigation
            }
            this.navigatedToParams = navParams;
            //NOTE: access your navParams through appNavigator.navigatedToParams
            //on the screen/view you have navigated to
        }

        let {history, location} = this.navigator;

        if (goingBack) {
            history.goBack();
        } else {
            history.push({pathname: this.navigatedTo, search: location.search, state: location.state});
        }

        //track navigation
        if (!isNullUndefined(this.navStore)) {
            this.trackNavigation(goingBack, this.navStore);
        }

    };

    //you can use this for such as analytics
    // on how users are traversing application
    trackNavigation = (goingBack, navStore) => {
        let goTo = navStore.currentNavigationTrailIndex - 1;
        console.log('goTo', goTo);
        if (goTo >= 0) {
            navStore.currentNavigationTrailIndex = goTo;
        }
        if (goingBack) {
            console.log('trackNavigation goingBack');
            //remove whence come from
            navStore.navigationTrail.splice((navStore.currentNavigationTrailIndex), 1);
            navStore.navigatedFrom = this.navigatedFrom;//should be null, if all works correctly
        } else {
            console.log('trackNavigation goingForward');
            navStore.navigationTrail.push(this.navigatedTo);
            navStore.currentNavigationTrailIndex = navStore.navigationTrail.length - 1;
            navStore.navigatedTo = this.navigatedTo;
            navStore.navigatedFrom = this.navigatedFrom;
        }
    }

    navigateBack = (navParams = null) => {
        // console.log('this.navStore', toJS(this.navStore));
        if (isNullUndefined(this.navStore?.['navigatedFrom'])) {
            alert('Cannot determine where to return!');
        } else {
            this.navigate(
                this.navigatedFrom,
                navParams,
                true
            );
        }
    }

    navigateHome = (navParams = null) => {
        this.navigate(
            DEFAULT_VIEW_ROUTE.path,
            navParams
        );
    }

    navigateToPage2Example = (navParams = null) => {
        this.navigate(
            PAGE2EXAMPLE_VIEW_ROUTE.path,
            navParams
        );
    }

    navigateToPage3Example = (navParams = null) => {
        this.navigate(
            PAGE3EXAMPLE_VIEW_ROUTE.path,
            navParams
        );
    }

    navigateToPage4Example = (navParams = null) => {
        this.navigate(
            PAGE4EXAMPLE_VIEW_ROUTE.path,
            navParams
        );
    }

    navigateToPage4SubItemExample = (navParams) => {
        let {item} = navParams;
        this.navigate(
            PAGE4EXAMPLE_VIEW_ROUTE.path + '/' + item,
            navParams
        );
    }

    navigateToLoginAndRegistration = (navParams = null) => {
        this.navigate(
            LOGIN_AND_REGISTRATION_VIEW_ROUTE.path,
            navParams
        );
    }

    navigateToSecuredAppHomepageExample = (navParams = null) => {
        this.navigate(
            SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path,
            navParams
        );
    }

    navigateToSecuredPage2Example = (navParams = null) => {
        this.navigate(
            SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path,
            navParams
        );
    }

    navigateToAppDevScratchPad = (navParams = null) => {
        this.navigate(
            APP_DEV_MOCKS_VIEW_ROUTE.path,
            navParams
        );
    }

}

const appNavigation = new AppNavigation();
export default appNavigation;
