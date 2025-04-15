/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { handleLogin } from '../../controllers/login-controller';
import { textValueChanged } from '../../util/react-web-forms-data-collection-utils';
import { isEmptyString } from '../../util/util';
import appAuth from '../../stores/app-auth';
import { NotificationAlert } from '../../shared-components-and-modules/notification-center/notification-utils';

interface LoginFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginModel: any;
  notificationAlert: NotificationAlert;
  appStore: Record<string, unknown>;
}

export default function LoginForm(props: LoginFormProps) {
  const { loginModel, notificationAlert, appStore } = props;

  const [submit_pressed, set_press_submit] = React.useState(false);

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
        <Button
          variant="contained"
          color="primary"
          type={'submit'}
          onClick={e => {
            e.preventDefault();
            if (!isValidFormData()) {
              return;
            }
            handleLogin(loginModel, notificationAlert, appStore, appAuth);
          }}
        >
          Login
        </Button>
      </form>
    </React.Fragment>
  );
}
