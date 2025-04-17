/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

export const STORE_KEY_SUFFIX = 'StoreKey';

export const STORE_SNAPSHOT_PREFIX = 'StoreSnapshot_';

export const LOGIN_PAGE_ACTIONS = {
  LOGIN: 'LOGIN',
  SIGN_UP: 'SIGN_UP',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

export type LoginPageAction = (typeof LOGIN_PAGE_ACTIONS)[keyof typeof LOGIN_PAGE_ACTIONS];
