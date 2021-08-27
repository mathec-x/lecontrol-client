/* eslint-disable react/prop-types */
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

import StyledAppBar from '../../components/StyledAppBar';
import TransitionComponent from '../../components/TransitionComponent';
import Login from './Login';
import Register from './Register';

/**
 * @type {import('typings/pages').SignIn}
 */
const Signin = (props) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('login');

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      props.history.goBack();
    }, 300);
  };

  React.useEffect(() => {
    setOpen(true);

    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <Dialog
      fullScreen={matches}
      open={open}
      fullWidth
      maxWidth="sm"
      TransitionComponent={TransitionComponent}
      onClose={handleClose}
    >
      <StyledAppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Signin
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <Collapse in={type === 'login'}>
        <Login {...props} />
      </Collapse>
      <Collapse in={type === 'register'}>
        <Register {...props} />
      </Collapse>
      <DialogActions>
        { type === 'login'
          ? (
            <Button size="small" onClick={() => setType('register')}>
              ... ou cadastre-se
            </Button>
          )
          : (
            <Button size="small" onClick={() => setType('login')}>
              tenho uma conta
            </Button>
          )}
      </DialogActions>
    </Dialog>
  );
};

export default Signin;
