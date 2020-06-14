//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AppNotificationToastAlert(props) {

  // console.log('props of snack bar', toJS(props));
  const {alert, message, type, duration, position} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(alert || false);

  const handleClose = (event) => {
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
          <Alert
              onClose={handleClose}
              severity={type || "info"}
          >
            {message || 'This is an alert message!'}
          </Alert>
        </Snackbar>
      </div>
  );

}
