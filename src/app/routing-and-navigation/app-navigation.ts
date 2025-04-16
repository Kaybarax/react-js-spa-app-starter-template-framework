/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import { isEmptyObject, isNullUndefined } from '../util/util';
import {
  APP_DEV_MOCKS_VIEW_ROUTE,
  DEFAULT_VIEW_ROUTE,
  LOGIN_AND_REGISTRATION_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE,
  SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE,
  SECURED_PAGE2EXAMPLE_VIEW_ROUTE,
} from './views-routes-declarations';

/** Interface for router navigator properties */
export interface RouterNavigator {
  history: {
    goBack: () => void;
    push: (options: { pathname: string; search?: string; state?: unknown }) => void;
  };
  location: {
    search?: string;
    state?: unknown;
  };
  match: unknown;
}

/** Interface for navigation store */
export interface NavigationStore {
  currentNavigationTrailIndex: number;
  navigationTrail: string[];
  navigatedFrom: string | null;
  navigatedTo: string | null;
  [key: string]: unknown;
}

/** Type for navigation parameters */
export type NavParams = Record<string, unknown> | null;

/** Application routes map for easier access */
export const AppRoutes = {
  DEFAULT: DEFAULT_VIEW_ROUTE.path,
  PAGE2: PAGE2EXAMPLE_VIEW_ROUTE.path,
  PAGE3: PAGE3EXAMPLE_VIEW_ROUTE.path,
  PAGE4: PAGE4EXAMPLE_VIEW_ROUTE.path,
  LOGIN: LOGIN_AND_REGISTRATION_VIEW_ROUTE.path,
  SECURED_HOME: SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path,
  SECURED_PAGE2: SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path,
  DEV_MOCKS: APP_DEV_MOCKS_VIEW_ROUTE.path,
};

/**
 * Interface defining the public API for AppNavigation
 */
export interface IAppNavigation {
  initialize(props: RouterNavigator): void;
  navigate(navTo: string, navParams?: NavParams, goingBack?: boolean): void;
  navigateTo(routePath: string, navParams?: NavParams): void;

  getNavigatedToParams(): NavParams;
  getNavigatedTo(): string | null;
  getNavigatedFrom(): string | null;
  getNavigator(): RouterNavigator | null;
  getNavStore(): NavigationStore | null;

  setNavigatedToParams(params: NavParams): void;
  setNavigatedTo(route: string | null): void;
  setNavigatedFrom(route: string | null): void;
  setNavigator(navigator: RouterNavigator | null): void;
  setNavStore(store: NavigationStore | null): void;

  isInternalLogout(): boolean;
}

export class AppNavigation implements IAppNavigation {
  private static instance: AppNavigation | null = null;

  // Navigation state properties
  private navigatedToParams: NavParams = null;
  private navigatedTo: string | null = null;
  private navigatedFrom: string | null = null;
  private navigator: RouterNavigator | null = null;
  private navStore: NavigationStore | null = null;

  // Global properties
  private internalLogout = false;

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor() {}

  /**
   * Get the singleton instance of AppNavigation
   */
  public static getInstance(): AppNavigation {
    if (!AppNavigation.instance) {
      AppNavigation.instance = new AppNavigation();
    }
    return AppNavigation.instance;
  }

  /**
   * Initialize the navigator with router props
   */
  public initialize(props: RouterNavigator): void {
    this.navigator = props;
  }

  public navigate(navTo: string, navParams: NavParams = null, goingBack = false): void {
    if (!this.navigator) {
      console.error('Navigator not initialized. Make sure to call initialize() with router props before navigation.');
      return;
    }

    // Set navigation state
    this.navigatedFrom = this.navigatedTo || AppRoutes.DEFAULT;
    this.navigatedTo = navTo;
    this.navigatedToParams = null;

    // Validate and set navigation parameters
    if (!isNullUndefined(navParams)) {
      if (isEmptyObject(navParams as Record<string, unknown>)) {
        console.error('Navigation Data Params Should be of Object Type');
        return;
      }
      this.navigatedToParams = navParams;
    }

    // Perform the actual navigation
    const { history, location } = this.navigator;
    if (goingBack) {
      history.goBack();
    } else {
      history.push({
        pathname: this.navigatedTo,
        search: location.search,
        state: location.state,
      });
    }

    // Track navigation history if store exists
    if (this.navStore) {
      this.updateNavigationTrail(goingBack);
    }
  }

  public navigateTo(routePath: string, navParams: NavParams = null): void {
    this.navigate(routePath, navParams);
  }

  private updateNavigationTrail(goingBack: boolean): void {
    if (!this.navStore) return;

    if (goingBack) {
      const goTo = this.navStore.currentNavigationTrailIndex - 1;
      if (goTo >= 0) {
        this.navStore.currentNavigationTrailIndex = goTo;
      }
      this.navStore.navigationTrail.splice(this.navStore.currentNavigationTrailIndex, 1);
      this.navStore.navigatedFrom = this.navigatedFrom;
    } else {
      if (this.navigatedTo) {
        this.navStore.navigationTrail.push(this.navigatedTo);
      }
      this.navStore.currentNavigationTrailIndex = this.navStore.navigationTrail.length - 1;
      this.navStore.navigatedTo = this.navigatedTo;
      this.navStore.navigatedFrom = this.navigatedFrom;
    }
  }

  // Getters
  public getNavigatedToParams(): NavParams {
    return this.navigatedToParams;
  }

  public getNavigatedTo(): string | null {
    return this.navigatedTo;
  }

  public getNavigatedFrom(): string | null {
    return this.navigatedFrom;
  }

  public getNavigator(): RouterNavigator | null {
    return this.navigator;
  }

  public getNavStore(): NavigationStore | null {
    return this.navStore;
  }

  public isInternalLogout(): boolean {
    return this.internalLogout;
  }

  // Setters
  public setNavigatedToParams(params: NavParams): void {
    this.navigatedToParams = params;
  }

  public setNavigatedTo(route: string | null): void {
    this.navigatedTo = route;
  }

  public setNavigatedFrom(route: string | null): void {
    this.navigatedFrom = route;
  }

  public setNavigator(navigator: RouterNavigator | null): void {
    this.navigator = navigator;
  }

  public setNavStore(store: NavigationStore | null): void {
    this.navStore = store;
  }
}

export const appNavigation = AppNavigation.getInstance();
