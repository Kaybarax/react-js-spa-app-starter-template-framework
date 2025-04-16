import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORE_KEY_SUFFIX } from '../actions-and-stores-data';
import { 
  AppSchema, 
  LoginSchema, 
  PageExampleSchema, 
  StoreName, 
  StoreNames 
} from '../store-schemas';
import { isEmptyObject, isNullUndefined } from '../../util/util';

// Define the store type
export interface Store {
  storeKey: string;
  storeName: string;
  namespace: string;
  [key: string]: unknown;
}

// Create a type for all stores
export type AllStores = {
  [key in StoreName]?: Store;
};

// Create a type for the app stores state
export interface AppStoresState {
  stores: AllStores;
  appStoresLoaded: boolean;
  loadAppStores: () => Promise<void>;
}

// Create the zustand store
export const useAppStores = create<AppStoresState>()(
  persist(
    (set) => ({
      stores: {},
      appStoresLoaded: false,
      loadAppStores: async () => {
        try {
          const stores: AllStores = {};

          // Initialize each store
          for (const key in StoreNames) {
            const storeName = key as StoreName;
            const storeKey = `${storeName}_${STORE_KEY_SUFFIX}`;

            // Create the store based on its type
            let store: Store;

            switch (storeName) {
              case 'appStore':
                store = useAppStore.getState().getStore();
                break;
              case 'loginStore':
                store = useLoginStore.getState().getStore();
                break;
              case 'page1ExampleStore':
              case 'page2ExampleStore':
              case 'page3ExampleStore':
              case 'page4ExampleStore':
                store = createPageExampleStore(storeName).getState().getStore();
                break;
              default:
                store = {
                  storeName,
                  namespace: 'AppStores',
                  storeKey,
                  loading: false,
                  updated: false,
                  loadingMessage: 'Loading...',
                } as Store;
            }

            stores[storeName] = store;
          }

          set({ stores, appStoresLoaded: true });
        } catch (err) {
          console.log('loadAppStores err', err);
          set({ stores: {}, appStoresLoaded: false });
        }
      },
    }),
    {
      name: 'app-stores',
    }
  )
);

// Create individual stores

// App Store
export interface AppStoreState extends AppSchema {
  getStore: () => Store;
  setUser: (user: unknown) => void;
  updateNavStore: (navStore: Partial<AppSchema['navStore']>) => void;
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      storeName: StoreNames.appStore,
      namespace: 'AppStores',
      storeKey: `AppStores_${StoreNames.appStore}_${STORE_KEY_SUFFIX}`,
      loading: false,
      updated: false,
      loadingMessage: 'Loading...',
      user: null,
      navStore: {
        navigationTrail: [],
        currentNavigationTrailIndex: 0,
        navigatedTo: null,
        navigatedFrom: null,
      },
      getStore: () => get() as unknown as Store,
      setUser: (user) => set({ user }),
      updateNavStore: (navStore) => set((state) => ({
        navStore: { ...state.navStore, ...navStore }
      })),
    }),
    {
      name: `app-store-${StoreNames.appStore}`,
    }
  )
);

// Login Store
export interface LoginStoreState extends LoginSchema {
  getStore: () => Store;
  updateLoginForm: (loginForm: Partial<LoginSchema['loginForm']>) => void;
  updateSignUpForm: (signUpForm: Partial<LoginSchema['signUpForm']>) => void;
  updateResetPasswordForm: (resetPasswordForm: Partial<LoginSchema['resetPasswordForm']>) => void;
  setPageAction: (pageAction: unknown) => void;
  setNotificationAlert: (notificationAlert: LoginSchema['notificationAlert']) => void;
}

export const useLoginStore = create<LoginStoreState>()(
  persist(
    (set, get) => ({
      storeName: StoreNames.loginStore,
      namespace: 'AppStores',
      storeKey: `AppStores_${StoreNames.loginStore}_${STORE_KEY_SUFFIX}`,
      loading: false,
      updated: false,
      loadingMessage: 'Loading...',
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
      pageAction: null,
      notificationAlert: {
        show: false,
        message: '',
        type: 'info',
      },
      getStore: () => get() as unknown as Store,
      updateLoginForm: (loginForm) => set((state) => ({
        loginForm: { ...state.loginForm, ...loginForm }
      })),
      updateSignUpForm: (signUpForm) => set((state) => ({
        signUpForm: { ...state.signUpForm, ...signUpForm }
      })),
      updateResetPasswordForm: (resetPasswordForm) => set((state) => ({
        resetPasswordForm: { ...state.resetPasswordForm, ...resetPasswordForm }
      })),
      setPageAction: (pageAction) => set({ pageAction }),
      setNotificationAlert: (notificationAlert) => set({ notificationAlert }),
    }),
    {
      name: `app-store-${StoreNames.loginStore}`,
    }
  )
);

// Page Example Store
export interface PageExampleStoreState extends PageExampleSchema {
  getStore: () => Store;
  addTodo: (todo: unknown) => void;
  setNotificationAlert: (notificationAlert: PageExampleSchema['notificationAlert']) => void;
}

export const createPageExampleStore = (storeName: StoreName) => create<PageExampleStoreState>()(
  persist(
    (set, get) => ({
      storeName,
      namespace: 'AppStores',
      storeKey: `AppStores_${storeName}_${STORE_KEY_SUFFIX}`,
      loading: false,
      updated: false,
      loadingMessage: 'Loading...',
      todo: [],
      notificationAlert: {
        show: false,
        message: '',
        type: 'info',
      },
      getStore: () => get() as unknown as Store,
      addTodo: (todo) => set((state) => ({
        todo: [...state.todo, todo]
      })),
      setNotificationAlert: (notificationAlert) => set({ notificationAlert }),
    }),
    {
      name: `app-store-${storeName}`,
    }
  )
);

// Create a hook to use stores in components
export const useStore = (storeName: StoreName) => {
  const stores = useAppStores((state) => state.stores);

  if (isNullUndefined(stores) || isEmptyObject(stores)) {
    throw new Error('Stores not initialized');
  }

  const store = stores[storeName];

  if (isNullUndefined(store)) {
    throw new Error(`Store ${storeName} not found`);
  }

  return store;
};
