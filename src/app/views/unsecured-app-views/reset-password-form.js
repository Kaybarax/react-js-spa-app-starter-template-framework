import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {handleResetPassword} from "../../controllers/login-controller";
import {textValueChanged} from "../../util/react-components-mobx-stores-data-collection-utils";

export default function ResetPasswordForm(props) {

    let {resetPasswordModel, activity} = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));

    const classes = useStyles();

    return (
        <React.Fragment>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="username-or-email"
                    label="Username/Email" type={'text'}
                    onChange={text => textValueChanged(resetPasswordModel, text, 'usernameOrEmail', activity)}
                />
                <br/>
                <TextField
                    id="password"
                    label="New Password" type={'password'}
                    onChange={text => textValueChanged(resetPasswordModel, text, 'password', activity)}
                />
                <br/>
                <TextField
                    id="confirmPassword"
                    label="Confirm Password" type={'password'}
                    onChange={text => textValueChanged(resetPasswordModel, text, 'confirmPassword', activity)}
                />
                <br/>
                <Button
                    variant="contained"
                    color="primary" type={'submit'}
                    onClick={e => {
                        e.preventDefault();
                        handleResetPassword(activity);
                    }}
                >
                    Reset Password
                </Button>
            </form>
        </React.Fragment>
    )
}
