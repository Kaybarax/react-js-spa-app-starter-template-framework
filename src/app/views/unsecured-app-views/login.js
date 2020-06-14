//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import React from 'react';
import SafeComponentWrapper from "../../safe-component-wrapper";
import {inject, observer} from "mobx-react";
import {isNullUndefined, isTrue} from "../../util/util";
import AppNotificationToastAlert
  from "../../shared-components-and-modules/notification-center/app-notification-toast-alert";
import {Helmet} from "react-helmet";
import {TITLE} from "../../app-config";
import LoginForm from "./login-form";
import SignUpForm from "./sign-up-form";
import {displayFieldExpectationSatisfied} from "../../controllers/app-controller";
import {LOGIN_PAGE_ACTIONS} from "../../stores/stores-data-store";
import '../../theme/login-styles.scss';
import ResetPasswordForm from "./reset-password-form";
import {User} from "../../app-management/data-manager/models-manager";
import appNavigation from "../../routing-and-navigation/app-navigation";

function Login() {

  let authStore = this.props.authStore;
  let loginStore = this.props.authStore.login;
  let routerStore = this.props.routerStore;
  let toastNotificationAlert = this.props.authStore.login.toastNotificationAlert;
  let appStore = this.props.appStores.app;

  let routeName = '';
  let routePathPattern = '/';

  let showLoginForm = () => {
    loginStore.pageAction = LOGIN_PAGE_ACTIONS.LOGIN;
  };

  let showSignUpForm = () => {
    loginStore.signUpForm.user = new User();
    loginStore.pageAction = LOGIN_PAGE_ACTIONS.SIGN_UP;
  };

  let showResetPasswordForm = () => {
    loginStore.pageAction = LOGIN_PAGE_ACTIONS.RESET_PASSWORD;
  };

  let showLogin = (
      displayFieldExpectationSatisfied('pageAction', loginStore,
          expectationOfX => isNullUndefined(expectationOfX))
      ||
      displayFieldExpectationSatisfied('pageAction', loginStore,
          expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS.LOGIN)
  );

  let showSignUp = displayFieldExpectationSatisfied('pageAction', loginStore,
      expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS.SIGN_UP);

  let showResetPassword = displayFieldExpectationSatisfied('pageAction', loginStore,
      expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS.RESET_PASSWORD);

  return (
      <SafeComponentWrapper>
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
                >Reset Password</span> |&nbsp;
                <span
                    onClick={_ => {
                      appNavigation.navigateToAppDevScratchPad(routerStore);
                    }}
                >Mock Stuff Page</span>
              </h3>
            </div>
          </div>

          {
            showLogin &&
            <div className={'flex-row-container'}>
              <div className={'flex-container-child-item center-align-content'}>
                <LoginForm
                    loginModel={loginStore.loginForm}
                    activity={this}/>
              </div>
            </div>
          }

          {
            showSignUp &&
            <div className={'flex-row-container'}>
              <div className={'flex-container-child-item center-align-content'}>
                <SignUpForm signUpModel={loginStore.signUpForm}
                            activity={this}/>
              </div>
            </div>
          }

          {
            showResetPassword &&
            <div className={'flex-row-container'}>
              <div className={'flex-container-child-item center-align-content'}>
                <ResetPasswordForm
                    resetPasswordModel={loginStore.resetPasswordForm}
                    activity={this}/>
              </div>
            </div>
          }

        </div>

        {
          (
              displayFieldExpectationSatisfied('alert', toastNotificationAlert,
                  expectationOfX => isTrue(expectationOfX))
          ) &&
          <div style={{position: 'fixed', top: 0}}>
            <AppNotificationToastAlert
                alert={toastNotificationAlert.alert}
                message={toastNotificationAlert.message}
                type={toastNotificationAlert.type}
                duration={toastNotificationAlert.duration}
                position={toastNotificationAlert.position}
            />
          </div>
        }

      </SafeComponentWrapper>
  );

}

export default (inject('authStore', 'appStores', 'routerStore')(observer(Login)));
