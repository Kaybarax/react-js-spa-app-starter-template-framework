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

@inject('authStore', 'appStores', 'routerStore')
@observer
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.authStore = this.props.authStore;
        this.loginStore = this.props.authStore.login;
        this.routerStore = this.props.routerStore;
        this.toastNotificationAlert = this.props.authStore.login.toastNotificationAlert;
        this.appStore = this.props.appStores.app;
    }

    static routeName = '';
    static routePathPattern = '/';

    showLoginForm = () => {
        this.loginStore.pageAction = LOGIN_PAGE_ACTIONS.LOGIN;
    };
    showSignUpForm = () => {
        this.loginStore.signUpForm.user = new User();
        this.loginStore.pageAction = LOGIN_PAGE_ACTIONS.SIGN_UP;
    };
    showResetPasswordForm = () => {
        this.loginStore.pageAction = LOGIN_PAGE_ACTIONS.RESET_PASSWORD;
    };

    render() {

        let showLogin = (
            displayFieldExpectationSatisfied('pageAction', this.loginStore,
                expectationOfX => isNullUndefined(expectationOfX))
            ||
            displayFieldExpectationSatisfied('pageAction', this.loginStore,
                expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS.LOGIN)
        );

        let showSignUp = displayFieldExpectationSatisfied('pageAction', this.loginStore,
            expectationOfX => expectationOfX === LOGIN_PAGE_ACTIONS.SIGN_UP);

        let showResetPassword = displayFieldExpectationSatisfied('pageAction', this.loginStore,
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
                                        this.showLoginForm();
                                    }}
                                >Login</span> |&nbsp;
                                <span
                                    className={`${showSignUp ? 'selected' : ''}`}
                                    onClick={_ => {
                                        this.showSignUpForm();
                                    }}
                                >Sign Up</span> |&nbsp;
                                <span
                                    className={`${showResetPassword ? 'selected' : ''}`}
                                    onClick={_ => {
                                        this.showResetPasswordForm();
                                    }}
                                >Reset Password</span> |&nbsp;
                                <span
                                    onClick={_ => {
                                        appNavigation.navigateToAppDevScratchPad(this.routerStore);
                                    }}
                                >Mock Stuff Page</span>
                            </h3>
                        </div>
                    </div>

                    {
                        showLogin &&
                        <div className={'flex-row-container'}>
                            <div className={'flex-container-child-item center-align-content'}>
                                <LoginForm loginModel={this.loginStore.loginForm}
                                           activity={this}/>
                            </div>
                        </div>
                    }

                    {
                        showSignUp &&
                        <div className={'flex-row-container'}>
                            <div className={'flex-container-child-item center-align-content'}>
                                <SignUpForm signUpModel={this.loginStore.signUpForm}
                                            activity={this}/>
                            </div>
                        </div>
                    }

                    {
                        showResetPassword &&
                        <div className={'flex-row-container'}>
                            <div className={'flex-container-child-item center-align-content'}>
                                <ResetPasswordForm
                                    resetPasswordModel={this.loginStore.resetPasswordForm}
                                    activity={this}/>
                            </div>
                        </div>
                    }

                </div>

                {
                    (
                        displayFieldExpectationSatisfied('alert', this.toastNotificationAlert,
                            expectationOfX => isTrue(expectationOfX))
                    ) &&
                    <div style={{position: 'fixed', top: 0}}>
                        <AppNotificationToastAlert
                            alert={this.toastNotificationAlert.alert}
                            message={this.toastNotificationAlert.message}
                            type={this.toastNotificationAlert.type}
                            duration={this.toastNotificationAlert.duration}
                            position={this.toastNotificationAlert.position}
                        />
                    </div>
                }

            </SafeComponentWrapper>
        );
    }
}

export default Login;
