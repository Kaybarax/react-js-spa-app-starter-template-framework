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
import appNavigation from "../../routing-and-navigation/app-navigation";
import {useDispatch, useSelector} from "react-redux";
import {storeUpdateDispatch} from "../../stores/stores-hocs";
import LOGIN_ACTIONS from "../../controllers/login-controller";

export default function Login(props) {
    console.log('Login props', props);

    const store = useSelector(stores => stores);
    const dispatcher = useDispatch();

    console.log('Login store', store);
    const {
        appStore,
        loginStore,
    } = store;
    let {notificationAlert} = loginStore;

    // because from this page, navigations will
    // be performed, init navigator with {history, location, match}
    // from props
    appNavigation.initNavigator(props);

    const showLoginForm = () => {
        storeUpdateDispatch(dispatcher, LOGIN_ACTIONS.showLoginForm.name, {loginStore});
    };

    const showSignUpForm = () => {
        storeUpdateDispatch(dispatcher, LOGIN_ACTIONS.showSignUpForm.name, {loginStore});
    };

    const showResetPasswordForm = () => {
        storeUpdateDispatch(dispatcher, LOGIN_ACTIONS.showResetPasswordForm.name, {loginStore});
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
                                dispatcher={dispatcher}
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
