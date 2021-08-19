/* eslint-disable react/prop-types */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import withAuth from '../../hooks/withAuth';
import TransitionComponent from '../../components/TransitionComponent';
import DialogContentList from '../../components/DialogContentList';
import StyledAppBar from '../../components/StyledAppBar';
import AwaitingButton from '../../components/AwaitingButton';
import { Product } from '../../services/api';
import string from '../../services/helpers/string';

function Register() {
  const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      history.goBack();
    }, 300);
  };

  /**
   *
   * @param {import('react').FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Product.add({ label })
      .then((response) => {
        if (response.ok) {
          return (setLabel(''), setMessage('Cadastrado com sucesso!'));
        }

        return setMessage('Falha ao cadastrar');
      }).finally(() => setLoading(false));
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
            Cadastrar produto
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <form onSubmit={handleSubmit}>
        <DialogContentList>
          <ListItem>
            <TextField
              required
              fullWidth
              autoFocus
              value={label}
              onChange={(e) => setLabel(string.Capitalize(e.target.value))}
              label="Título"
              helperText="Digite o nome do produto"
            />
          </ListItem>
        </DialogContentList>
        <DialogActions>
          <AwaitingButton loading={loading} fullWidth type="submit">
            {message || 'Cadastrar'}
          </AwaitingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default withAuth(Register);
