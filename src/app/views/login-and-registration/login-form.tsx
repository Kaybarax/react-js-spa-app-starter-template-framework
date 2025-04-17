/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isEmptyString } from '../../util/util';
import { NotificationAlert } from '../../shared-components-and-modules/notification-center/notification-utils';
import { AppState } from '../../stores';
import TextField from '@material-ui/core/TextField';
import { textValueChanged } from '../../util/react-web-forms-data-collection-utils.tsx';
import { handleLogin } from '../../controllers/login-controller';
import authStore from '../../stores/auth-store';

interface LoginFormProps {
  loginModel: any;
  notificationAlert: NotificationAlert;
  appStore: AppState;
}

export default function LoginForm(props: LoginFormProps) {
  const { loginModel, notificationAlert, appStore } = props;
  console.log('LoginForm loginModel', loginModel, 'notificationAlert', notificationAlert, 'appStore', appStore);

  const [submit_pressed, set_press_submit] = React.useState(false);
  console.log('submit_pressed', submit_pressed, 'set_press_submit', set_press_submit);

  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();

  const isValidFormData = () => {
    let validForm = true;
    set_press_submit(false); //assume not pressed

    if (isEmptyString(loginModel['usernameOrEmail'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (isEmptyString(loginModel['password'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }

    return validForm;
  };

  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        {submit_pressed && isEmptyString(loginModel.usernameOrEmail) && (
          <small style={{ color: 'red' }}> * This field is required.</small>
        )}
        <br />
        <TextField
          id="username-or-email"
          label="Username/Email"
          type={'text'}
          onChange={e => textValueChanged(loginModel, e.target.value, 'usernameOrEmail')}
        />
        <br />
        {submit_pressed && isEmptyString(loginModel.password) && (
          <small style={{ color: 'red' }}> * This field is required.</small>
        )}
        <br />
        <TextField
          id="password"
          label="Password"
          type={'password'}
          onChange={e => textValueChanged(loginModel, e.target.value, 'password')}
        />
        <br />
        <button
          color="primary"
          type={'submit'}
          onClick={e => {
            e.preventDefault();
            if (!isValidFormData()) {
              return;
            }
            handleLogin(loginModel, notificationAlert, appStore, authStore);
          }}
        >
          Login
        </button>
      </form>
    </React.Fragment>
  );
}
