/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Delete from '@material-ui/icons/Delete';
import withAuth from '../../../hooks/withAuth';
import TransitionComponent from '../../../components/TransitionComponent';
import DialogContentList from '../../../components/DialogContentList';
import StyledAppBar from '../../../components/StyledAppBar';
import { Product, Validation } from '../../../services/api';
import InputField from '../../../components/InputField';
/**
 * @type {React.FC<import('react-router-dom').RouteComponentProps<{uuid: string}>}
 */

const Edit = ({ history, match: { params } }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);

  const { product, validations } = useSelector(({ products: p, validations: v }) => {
    const prod = p.find(({ uuid }) => uuid === params.uuid);
    const vals = v.filter((x) => x.productId === prod.id);
    return { product: prod, validations: vals };
  });

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      history.goBack();
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
            Editar
            {' '}
            {product.label}
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <DialogContentList>
        <ListItem>
          <InputField
            fullWidth
            autoFocus
            onSubmit={(value) => Product.set({ ...product, label: value })}
            InputLabelProps={{ shrink: true }}
            defaultValue={product.label}
            label="Título"
            helperText="Alterar o titulo do produto?"
          />
          <InputField
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            defaultValue=""
            onSubmit={(value) => Product.addValidation(params.uuid, { expiration: value })}
            label="Adicionar vencimento"
            helperText="nova data de validade para o produto"
          />
        </ListItem>

        <List>
          <ListSubheader>Vencimento</ListSubheader>
          {validations
            .sort((p, n) => new Date(n.expiration) - new Date(p.expiration))
            .map((x) => (
              <ListItem dense key={x.uuid} divider disabled={x.delete}>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  primary={x.expiration.moment().format('DD/MM/Y')}
                  secondary={x.delete && 'Excluíndo'}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => Validation.del(x)} disabled={x.delete}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>

      </DialogContentList>
      <DialogActions>
        <Button onClick={() => {
          // eslint-disable-next-line no-alert
          if (window.confirm('deseja mesmo excluír esse produto?')) {
            Product.del({ uuid: params.uuid });
            handleClose();
          }
        }}
        >
          excluir
        </Button>
        <Button onClick={handleClose}>
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withAuth(Edit);
