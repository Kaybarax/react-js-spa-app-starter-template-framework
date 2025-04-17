import { createStore } from './createStore';
import { notificationAlertProps } from '../shared-components-and-modules/notification-center/notifications-controller';
import { objectInstanceProvider } from '../util/util';
import { LOGIN_PAGE_ACTIONS, LoginPageAction } from './actions-and-stores-data';
import { NotificationAlert } from '../shared-components-and-modules/notification-center/notification-utils';

// Define interfaces for store states
export interface NavStore {
  navigationTrail: unknown[];
  currentNavigationTrailIndex: number;
  navigatedTo: unknown;
  navigatedFrom: unknown;
}

export interface AppState {
  user: unknown;
  navStore: NavStore;
  loading: boolean;
  updated: boolean;
  loadingMessage: string;
}

export interface LoginForm {
  usernameOrEmail: string | null;
  password: string | null;
}

export interface SignUpForm {
  user: unknown;
  confirmPassword: string | null;
}

export interface ResetPasswordForm {
  usernameOrEmail: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface LoginState {
  loginForm: LoginForm;
  signUpForm: SignUpForm;
  resetPasswordForm: ResetPasswordForm;
  pageAction: LoginPageAction;
  notificationAlert: NotificationAlert;
  loading: boolean;
  updated: boolean;
  loadingMessage: string;
}

export interface PageExampleState {
  todo: unknown[];
  notificationAlert: NotificationAlert;
  loading: boolean;
  updated: boolean;
  loadingMessage: string;
}

// Create stores with initial states
export const useAppStore = createStore<AppState>('appStore', {
  user: null,
  navStore: {
    navigationTrail: [],
    currentNavigationTrailIndex: 0,
    navigatedTo: null,
    navigatedFrom: null,
  },
  loading: false,
  updated: false,
  loadingMessage: 'Loading...',
});

export const useLoginStore = createStore<LoginState>('loginStore', {
  loginForm: {
    usernameOrEmail: null,
    password: null,
  },
  signUpForm: {
    user: null,
    confirmPassword: null,
  },
  resetPasswordForm: {
    usernameOrEmail: null,
    password: null,
    confirmPassword: null,
  },
  pageAction: LOGIN_PAGE_ACTIONS.LOGIN,
  notificationAlert: objectInstanceProvider(notificationAlertProps),
  loading: false,
  updated: false,
  loadingMessage: 'Loading...',
});

export const usePage1ExampleStore = createStore<PageExampleState>('page1ExampleStore', {
  todo: [],
  notificationAlert: objectInstanceProvider(notificationAlertProps),
  loading: false,
  updated: false,
  loadingMessage: 'Loading...',
});

export const usePage2ExampleStore = createStore<PageExampleState>('page2ExampleStore', {
  todo: [],
  notificationAlert: objectInstanceProvider(notificationAlertProps),
  loading: false,
  updated: false,
  loadingMessage: 'Loading...',
});

export const usePage3ExampleStore = createStore<PageExampleState>('page3ExampleStore', {
  todo: [],
  notificationAlert: objectInstanceProvider(notificationAlertProps),
  loading: false,
  updated: false,
  loadingMessage: 'Loading...',
});

export const usePage4ExampleStore = createStore<PageExampleState>('page4ExampleStore', {
  todo: [],
  notificationAlert: objectInstanceProvider(notificationAlertProps),
  loading: false,
  updated: false,
  loadingMessage: 'Loading...',
});

// Function to reset all stores
export function resetAllStores() {
  useAppStore.getState().reset();
  useLoginStore.getState().reset();
  usePage1ExampleStore.getState().reset();
  usePage2ExampleStore.getState().reset();
  usePage3ExampleStore.getState().reset();
  usePage4ExampleStore.getState().reset();
}

// Function to clear all persisted stores from localStorage
export function clearAllPersistedStores() {
  const keys = Object.keys(localStorage);
  for (const key of keys) {
    if (key.startsWith('app-store-')) {
      localStorage.removeItem(key);
    }
  }
}

// Compatibility layer for the old useAppStores hook
export function useAppStores() {
  // Create a collection of all stores
  const stores = {
    appStore: useAppStore.getState(),
    loginStore: useLoginStore.getState(),
    page1ExampleStore: usePage1ExampleStore.getState(),
    page2ExampleStore: usePage2ExampleStore.getState(),
    page3ExampleStore: usePage3ExampleStore.getState(),
    page4ExampleStore: usePage4ExampleStore.getState(),
  };

  // In our simplified implementation, stores are always loaded
  const appStoresLoaded = true;

  // This is a no-op function that returns a resolved promise
  // since our stores are automatically loaded
  const loadAppStores = () => Promise.resolve();

  return { stores, appStoresLoaded, loadAppStores };
}
