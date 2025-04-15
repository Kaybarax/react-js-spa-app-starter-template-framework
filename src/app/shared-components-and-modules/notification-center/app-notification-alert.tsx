/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationAlert } from './notification-utils';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AppNotificationAlert(props: NotificationAlert) {
  console.log('AppNotificationAlert props', props);

  const { alert, message, duration, position } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(alert || false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={duration || 4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: position || 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleClose} severity={'info'}>
          {message || 'This is an alert message!'}
        </Alert>
      </Snackbar>
    </div>
  );
}
