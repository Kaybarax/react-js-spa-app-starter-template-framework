/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { isNullUndefined, isTrue } from '../../util/util';
import AppNotificationAlert from '../../shared-components-and-modules/notification-center/app-notification-alert';
import { Helmet } from 'react-helmet';
import { TITLE } from '../../app-config';
import LoginForm from './login-form';
import SignUpForm from './sign-up-form';
import { displayFieldExpectationSatisfied } from '../../controllers/app-controller';
import { LOGIN_PAGE_ACTIONS } from '../../stores/actions-and-stores-data';
import '../../theme/login-styles.scss';
import { ResetPasswordForm } from './reset-password-form';
import { User } from '../../app-management/data-manager/models-manager';
import WithStoresHoc from '../../stores/with-stores-hoc.tsx';

export function Login(props: any) {
  console.log('Login props', props);

  const {
    appStore,
    loginStore,
  } = props;

  // Use optional chaining to safely access notificationAlert
  const notificationAlert = loginStore?.notificationAlert;

  // because from this page, navigations will
  // be performed, init navigator with {history, location, match}
  // from props
  // appNavigation.initNavigator(props);

  const showLoginForm = () => {
    if (loginStore) {
      loginStore.pageAction = LOGIN_PAGE_ACTIONS.LOGIN;
    }
  };

  const showSignUpForm = () => {
    if (loginStore) {
      loginStore.signUpForm.user = new User();
      loginStore.pageAction = LOGIN_PAGE_ACTIONS.SIGN_UP;
    }
  };

  const showResetPasswordForm = () => {
    if (loginStore) {
      loginStore.pageAction = LOGIN_PAGE_ACTIONS.RESET_PASSWORD;
    }
  };

  const showLogin =
    displayFieldExpectationSatisfied('pageAction', loginStore, expectationOfX => isNullUndefined(expectationOfX)) ||
    displayFieldExpectationSatisfied(
      'pageAction',
      loginStore,
      expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS.LOGIN,
    );

  const showSignUp = displayFieldExpectationSatisfied(
    'pageAction',
    loginStore,
    expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS.SIGN_UP,
  );

  const showResetPassword = displayFieldExpectationSatisfied(
    'pageAction',
    loginStore,
    expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS.RESET_PASSWORD,
  );

  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE + ' | Login'}</title>
      </Helmet>

      <div>
        <div className={'flex-row-container'}>
          <div className={'flex-container-child-item center-align-content'}>
            <h3 className={`login-action`}>
              <span
                className={`${showLogin ? 'selected' : ''}`}
                onClick={() => {
                  showLoginForm();
                }}
              >
                Login
              </span>{' '}
              |&nbsp;
              <span
                className={`${showSignUp ? 'selected' : ''}`}
                onClick={() => {
                  showSignUpForm();
                }}
              >
                Sign Up
              </span>{' '}
              |&nbsp;
              <span
                className={`${showResetPassword ? 'selected' : ''}`}
                onClick={() => {
                  showResetPasswordForm();
                }}
              >
                Reset Password
              </span>
            </h3>
            <a href={'/'}>Exit</a>
          </div>
        </div>

        {showLogin && (
          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              {loginStore && <LoginForm loginModel={loginStore.loginForm} notificationAlert={notificationAlert || {}} appStore={appStore} />}
            </div>
          </div>
        )}

        {showSignUp && (
          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              {loginStore && <SignUpForm
                signUpModel={loginStore.signUpForm}
                notificationAlert={notificationAlert || {}}
                showLoginForm={showLoginForm}
              />}
            </div>
          </div>
        )}

        {showResetPassword && (
          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              {loginStore && <ResetPasswordForm
                resetPasswordModel={loginStore.resetPasswordForm}
                notificationAlert={notificationAlert || {}}
              />}
            </div>
          </div>
        )}
      </div>

      {notificationAlert && displayFieldExpectationSatisfied('alert', notificationAlert as Record<string, unknown>, expectationOfX =>
        isTrue(expectationOfX),
      ) && (
        <div style={{ position: 'fixed', top: 0 }}>
          <AppNotificationAlert
            alert={notificationAlert.alert}
            message={notificationAlert.message}
            type={notificationAlert.type}
            duration={notificationAlert.duration}
            position={notificationAlert.position}
          />
        </div>
      )}
    </React.Fragment>
  );
}

const EnhancedLogin = WithStoresHoc(Login, ['loginStore', 'appStore']);
export default EnhancedLogin;
