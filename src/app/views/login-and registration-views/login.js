//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import {isNullUndefined, isTrue} from "../../util/util";
import AppNotificationAlert from "../../shared-components-and-modules/notification-center/app-notification-alert";
import {Helmet} from "react-helmet";
import {TITLE} from "../../app-config";
import LoginForm from "./login-form";
import SignUpForm from "./sign-up-form";
import {displayFieldExpectationSatisfied} from "../../controllers/app-controller";
import {LOGIN_PAGE_ACTIONS_ENUM} from "../../stores/actions-and-stores-data";
import '../../theme/login-styles.scss';
import ResetPasswordForm from "./reset-password-form";
import {User} from "../../app-management/data-manager/models-manager";
import WithStoresHoc from "../../stores/with-stores-hoc";
import appNavigation from "../../routing-and-navigation/app-navigation";

export function Login(props) {
  console.log('Login props', props);

  const {
    appStore,
    loginStore,
    loginStore: {notificationAlert},
  } = props;

    // because from this page, navigations will
    // be performed, init navigator with {history, location, match}
    // from props
    appNavigation.initNavigator(props);

  const showLoginForm = () => {
    loginStore.pageAction = LOGIN_PAGE_ACTIONS_ENUM.LOGIN;
  };

  const showSignUpForm = () => {
    loginStore.signUpForm.user = new User();
    loginStore.pageAction = LOGIN_PAGE_ACTIONS_ENUM.SIGN_UP;
  };

  const showResetPasswordForm = () => {
    loginStore.pageAction = LOGIN_PAGE_ACTIONS_ENUM.RESET_PASSWORD;
  };

  let showLogin = (
      displayFieldExpectationSatisfied('pageAction', loginStore,
          expectationOfX => isNullUndefined(expectationOfX))
      ||
      displayFieldExpectationSatisfied('pageAction', loginStore,
          expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS_ENUM.LOGIN)
  );

  let showSignUp = displayFieldExpectationSatisfied('pageAction', loginStore,
      expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS_ENUM.SIGN_UP);

  let showResetPassword = displayFieldExpectationSatisfied('pageAction', loginStore,
      expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS_ENUM.RESET_PASSWORD);

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
                    onClick={_ => {
                      showLoginForm();
                    }}
                >Login</span> |&nbsp;
                <span
                    className={`${showSignUp ? 'selected' : ''}`}
                    onClick={_ => {
                      showSignUpForm();
                    }}
                >Sign Up</span> |&nbsp;
                <span
                    className={`${showResetPassword ? 'selected' : ''}`}
                    onClick={_ => {
                      showResetPasswordForm();
                    }}
                >Reset Password</span>
              </h3>
              <a href={'/'}>Exit</a>
            </div>
          </div>

          {
            showLogin &&
            <div className={'flex-row-container'}>
              <div className={'flex-container-child-item center-align-content'}>
                <LoginForm
                    loginModel={loginStore.loginForm}
                    notificationAlert={notificationAlert}
                    appStore={appStore}
                />
              </div>
            </div>
          }

          {
            showSignUp &&
            <div className={'flex-row-container'}>
              <div className={'flex-container-child-item center-align-content'}>
                <SignUpForm
                    signUpModel={loginStore.signUpForm}
                    notificationAlert={notificationAlert}
                    showLoginForm={showLoginForm}
                />
              </div>
            </div>
          }

          {
            showResetPassword &&
            <div className={'flex-row-container'}>
              <div className={'flex-container-child-item center-align-content'}>
                <ResetPasswordForm
                    resetPasswordModel={loginStore.resetPasswordForm}
                    notificationAlert={notificationAlert}
                />
              </div>
            </div>
          }

        </div>

        {
          (
              displayFieldExpectationSatisfied('alert', notificationAlert,
                  expectationOfX => isTrue(expectationOfX))
          ) &&
          <div style={{position: 'fixed', top: 0}}>
            <AppNotificationAlert
                alert={notificationAlert.alert}
                message={notificationAlert.message}
                type={notificationAlert.type}
                duration={notificationAlert.duration}
                position={notificationAlert.position}
            />
          </div>
        }

      </React.Fragment>
  );

}

export default WithStoresHoc(Login, ['loginStore', 'appStore']);
