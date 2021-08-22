/* eslint-disable react/prop-types */
import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import BuildIcon from '@material-ui/icons/Build';

import { withRouter } from 'react-router-dom';
import localforage from 'localforage';
import StyledAvatar from '../../components/StyledAvatar';

const Menu = (props) => (
  <SwipeableDrawer open={Boolean(window.location.hash === '#menu')} onClose={() => props.history.push('#')} onOpen={() => props.history.push('#menu')}>
    <List style={{ minWidth: 350, minHeight: '96vh' }}>
      <ListSubheader>Início</ListSubheader>
      <ListItem divider button onClick={() => props.history.replace('/')}>
        <ListItemIcon><StyledAvatar variant="rounded" color="primary"><SupervisedUserCircleIcon /></StyledAvatar></ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: 'subtitle2' }}
          primary="Home"
          secondary="Voltar a tela inicial"
        />
      </ListItem>

      <ListSubheader>Cadastros</ListSubheader>
      <ListItem divider button onClick={() => props.history.replace('/register')}>
        <ListItemIcon><StyledAvatar variant="rounded" color="primary"><SupervisedUserCircleIcon /></StyledAvatar></ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: 'subtitle2' }}
          primary="Cadastrar"
          secondary="Cadastro de produtos"
        />
      </ListItem>
      <ListSubheader>Conta</ListSubheader>
      <ListItem divider disabled>
        <ListItemIcon><StyledAvatar variant="rounded" color="primary" /></ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: 'subtitle2' }}
          primary="Minha Conta"
          secondary="Gerenciar meus dados"
        />
      </ListItem>

      <ListItem
        divider
        button
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          props.history.push('#');
          localforage.clear().then(() => {
            window.location.reload();
          });
        }}
      >
        <ListItemIcon><StyledAvatar variant="rounded" color="primary" /></ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: 'subtitle2' }}
          primary="Signout"
          secondary="Deslogar sessão"
        />
      </ListItem>

      <div style={{ position: 'absolute', bottom: 'auto' }}>
        <ListSubheader>Outros</ListSubheader>
        <ListItem button disabled>
          <ListItemIcon><StyledAvatar variant="rounded" color="primary"><BuildIcon /></StyledAvatar></ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ variant: 'subtitle2' }}
            primary="Configurar"
            secondary="Configurações pessoais"
          />
        </ListItem>
      </div>

    </List>
  </SwipeableDrawer>
);

export default withRouter(Menu);
