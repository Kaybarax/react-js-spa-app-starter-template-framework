/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */
import { isEmptyString, objectInstanceProvider } from '../util/util';
import { notificationAlertProps } from '../shared-components-and-modules/notification-center/notifications-controller';
import { NotificationAlert } from '../shared-components-and-modules/notification-center/notification-utils.ts';

export const StoreNames = {
  appStore: 'appStore',
  loginStore: 'loginStore',
  page1ExampleStore: 'page1ExampleStore',
  page2ExampleStore: 'page2ExampleStore',
  page3ExampleStore: 'page3ExampleStore',
  page4ExampleStore: 'page4ExampleStore',
  securedAppStore: 'securedAppStore',
} as const;

export type StoreName = keyof typeof StoreNames;

export interface BaseStoreSchema {
  storeName: string;
  namespace: string;
  storeKey: string;
  loading: boolean;
  updated: boolean;
  loadingMessage: string;
}

export interface NavStore {
  navigationTrail: unknown[];
  currentNavigationTrailIndex: number;
  navigatedTo: unknown;
  navigatedFrom: unknown;
}

export interface AppSchema extends BaseStoreSchema {
  user: unknown;
  navStore: NavStore;
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

export interface LoginSchema extends BaseStoreSchema {
  loginForm: LoginForm;
  signUpForm: SignUpForm;
  resetPasswordForm: ResetPasswordForm;
  pageAction: unknown;
  notificationAlert: NotificationAlert;
}

export interface PageExampleSchema extends BaseStoreSchema {
  todo: unknown[];
  notificationAlert: NotificationAlert;
}

// Generic schema manager that handles singleton pattern for all schema types
abstract class SchemaManager<T extends BaseStoreSchema> {
  private static instances = new Map<string, BaseStoreSchema>();

  protected createBaseSchema(namespace: string, name: string): BaseStoreSchema {
    return {
      storeName: name,
      namespace: namespace,
      storeKey: !isEmptyString(namespace) ? namespace + name : 'StoreKey___' + name,
      loading: false,
      updated: false,
      loadingMessage: 'Loading...',
    };
  }

  protected abstract createSchema(namespace: string, name: string): T;

  public getInstance(namespace: string, name: string): T {
    const key = `${namespace}_${name}`;

    if (!SchemaManager.instances.has(key)) {
      SchemaManager.instances.set(key, this.createSchema(namespace, name));
    }

    return SchemaManager.instances.get(key) as T;
  }

  public resetInstance(namespace: string, name: string): void {
    const key = `${namespace}_${name}`;
    SchemaManager.instances.delete(key);
  }

  public static resetAll(): void {
    SchemaManager.instances.clear();
  }
}

// Concrete schema managers
export class ActivitySchemaManager extends SchemaManager<BaseStoreSchema> {
  protected createSchema(namespace: string, name: string): BaseStoreSchema {
    return this.createBaseSchema(namespace, name);
  }
}

export class AppSchemaManager extends SchemaManager<AppSchema> {
  protected createSchema(namespace: string, name: string): AppSchema {
    return {
      ...this.createBaseSchema(namespace, name),
      user: null,
      navStore: {
        navigationTrail: [],
        currentNavigationTrailIndex: 0,
        navigatedTo: null,
        navigatedFrom: null,
      },
    };
  }
}

export class LoginSchemaManager extends SchemaManager<LoginSchema> {
  protected createSchema(namespace: string, name: string): LoginSchema {
    return {
      ...this.createBaseSchema(namespace, name),
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
      notificationAlert: objectInstanceProvider(notificationAlertProps),
    };
  }
}

export class PageExampleSchemaManager extends SchemaManager<PageExampleSchema> {
  protected createSchema(namespace: string, name: string): PageExampleSchema {
    return {
      ...this.createBaseSchema(namespace, name),
      todo: [],
      notificationAlert: objectInstanceProvider(notificationAlertProps),
    };
  }
}

// Factory to create and get appropriate schema managers
export class SchemaFactory {
  private static activitySchemaManager = new ActivitySchemaManager();
  private static appSchemaManager = new AppSchemaManager();
  private static loginSchemaManager = new LoginSchemaManager();
  private static pageExampleSchemaManager = new PageExampleSchemaManager();

  public static getSchema(type: StoreName, namespace: string): BaseStoreSchema {
    switch (type) {
      case 'appStore':
        return this.appSchemaManager.getInstance(namespace, StoreNames[type]);
      case 'loginStore':
        return this.loginSchemaManager.getInstance(namespace, StoreNames[type]);
      case 'page1ExampleStore':
      case 'page2ExampleStore':
      case 'page3ExampleStore':
      case 'page4ExampleStore':
        return this.pageExampleSchemaManager.getInstance(namespace, StoreNames[type]);
      default:
        return this.activitySchemaManager.getInstance(namespace, StoreNames[type]);
    }
  }

  public static resetSchema(type: StoreName, namespace: string): void {
    switch (type) {
      case 'appStore':
        this.appSchemaManager.resetInstance(namespace, StoreNames[type]);
        break;
      case 'loginStore':
        this.loginSchemaManager.resetInstance(namespace, StoreNames[type]);
        break;
      case 'page1ExampleStore':
      case 'page2ExampleStore':
      case 'page3ExampleStore':
      case 'page4ExampleStore':
        this.pageExampleSchemaManager.resetInstance(namespace, StoreNames[type]);
        break;
      default:
        this.activitySchemaManager.resetInstance(namespace, StoreNames[type]);
    }
  }

  public static resetAll(): void {
    SchemaManager.resetAll();
  }
}

// Usage example:
// const appSchema = SchemaFactory.getSchema('appStore', 'myNamespace') as AppSchema;
// const loginSchema = SchemaFactory.getSchema('loginStore', 'myNamespace') as LoginSchema;
// const pageSchema = SchemaFactory.getSchema('page1ExampleStore', 'myNamespace') as PageExampleSchema;
