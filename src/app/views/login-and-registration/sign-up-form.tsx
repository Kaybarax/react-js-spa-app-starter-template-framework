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
import { handleSignUp } from '../../controllers/login-controller';
import { textValueChanged } from '../../util/react-web-forms-data-collection-utils';
import { isEmptyString } from '../../util/util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SignUpForm(props: any) {
  const { signUpModel, notificationAlert, showLoginForm } = props;

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

  const isValidFormData = (): boolean => {
    let validForm = true;
    set_press_submit(false); //assume not pressed

    if (isEmptyString(signUpModel.user['name'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (isEmptyString(signUpModel.user['usernameOrEmail'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (isEmptyString(signUpModel.user['password'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (isEmptyString(signUpModel['confirmPassword'])) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }
    if (signUpModel.user['password'] !== signUpModel['confirmPassword']) {
      validForm = false;
      set_press_submit(true);
      return validForm;
    }

    return validForm;
  };

  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        {submit_pressed && isEmptyString(signUpModel.user.name) && (
          <small style={{ color: 'red' }}> * This field is required.</small>
        )}
        <br />
        <TextField
          id="name"
          label="Name"
          type={'text'}
          onChange={e => textValueChanged(signUpModel.user, e.target.value, 'name')}
        />
        <br />
        {submit_pressed && isEmptyString(signUpModel.user.usernameOrEmail) && (
          <small style={{ color: 'red' }}> * This field is required.</small>
        )}
        <br />
        <TextField
          id="username-or-email"
          label="Username/Email"
          type={'text'}
          onChange={e => textValueChanged(signUpModel.user, e.target.value, 'usernameOrEmail')}
        />
        <br />
        {submit_pressed && isEmptyString(signUpModel.user.password) && (
          <small style={{ color: 'red' }}> * This field is required.</small>
        )}
        <br />
        <TextField
          id="password"
          label="Password"
          type={'password'}
          onChange={e => textValueChanged(signUpModel.user, e.target.value, 'password')}
        />
        <br />
        {submit_pressed && isEmptyString(signUpModel.confirmPassword) && (
          <small style={{ color: 'red' }}> * This field is required.</small>
        )}
        <br />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type={'password'}
          onChange={e => textValueChanged(signUpModel, e.target.value, 'confirmPassword')}
        />
        <br />
        {submit_pressed && signUpModel.user.password !== signUpModel.confirmPassword && (
          <small style={{ color: 'red' }}>Passwords do not match.</small>
        )}
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
            handleSignUp(signUpModel, notificationAlert);
            //ready for next user
            //some time to allow the alert to display
            setTimeout(() => showLoginForm(), 1500);
          }}
        >
          Sign Up
        </Button>
        <br />
        <i>Your sign up data is stored locally in your browser's embedded IndexedDb</i>
      </form>
    </React.Fragment>
  );
}
