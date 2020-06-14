//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {objectInstanceProvider} from "../util/util";
import {toastNotificationAlertProps} from "../shared-components-and-modules/notification-center/notifications-controller";

export const APP_STORE_NAME = 'APP';
export const LOGIN_STORE_NAME = 'LOGIN';
export const PAGE1EXAMPLE_STORE_NAME = 'PAGE1EXAMPLE_STORE_NAME';
export const PAGE2EXAMPLE_STORE_NAME = 'PAGE2EXAMPLE_STORE_NAME';
export const PAGE3EXAMPLE_STORE_NAME = 'PAGE3EXAMPLE_STORE_NAME';
export const PAGE4EXAMPLE_STORE_NAME = 'PAGE4EXAMPLE_STORE_NAME';

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @constructor
 */
export function ActivityStoreSchema(namespace, name) {
  this.storeSchema = {
    storeName: name,
    storeKey: namespace + name,
    loading: false,
    updated: false,
    loadingMessage: 'Loading...',
  };
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function AppActivitySchema(namespace, name) {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.user = null;
  // console.log('AppActivitySchema::', this.storeSchema)
  return this.storeSchema;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function LoginActivitySchema(namespace, name) {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.loginForm = {
    usernameOrEmail: null,
    password: null,
  };
  schema.signUpForm = {
    user: null,
    confirmPassword: null,
  };
  schema.resetPasswordForm = {
    usernameOrEmail: null,
    password: null,
    confirmPassword: null,
  };
  schema.pageAction = null;
  schema.toastNotificationAlert = objectInstanceProvider(toastNotificationAlertProps);
  // console.log('LoginActivitySchema::', this.storeSchema)
  return this.storeSchema;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function Page1ExampleActivitySchema(namespace, name) {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.stuff = {
    todo: null
  };
  schema.toastNotificationAlert = objectInstanceProvider(toastNotificationAlertProps);
  // console.log('Page1ExampleActivitySchema::', this.storeSchema)
  return this.storeSchema;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function Page2ExampleActivitySchema(namespace, name) {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.stuff = {
    todo: null
  };
  schema.toastNotificationAlert = objectInstanceProvider(toastNotificationAlertProps);
  // console.log('Page2ExampleActivitySchema::', this.storeSchema)
  return this.storeSchema;
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function Page3ExampleActivitySchema(namespace, name) {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.stuff = {
    todo: null
  };
  schema.toastNotificationAlert = objectInstanceProvider(toastNotificationAlertProps);
  // console.log('Page3ExampleActivitySchema::', this.storeSchema)
  return this.storeSchema
}

/**
 * sd _ Kaybarax
 * @param namespace
 * @param name
 * @returns {{loadingMessage: string, storeKey: *, name: *, loading: boolean, updated: boolean}}
 * @constructor
 */
export function Page4ExampleActivitySchema(namespace, name) {
  ActivityStoreSchema.call(this, namespace, name);
  let schema = this.storeSchema;
  schema.stuff = {
    todo: null
  };
  schema.toastNotificationAlert = objectInstanceProvider(toastNotificationAlertProps);
  // console.log("Page4ExampleActivitySchema::", this.storeSchema)
  return this.storeSchema;
}
