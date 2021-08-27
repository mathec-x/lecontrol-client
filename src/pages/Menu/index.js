/* eslint-disable react/prop-types */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import BuildIcon from '@material-ui/icons/Build';
import GetAppIcon from '@material-ui/icons/GetApp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import localforage from 'localforage';
import React from 'react';
import { usePwa } from 'react-pwa-app';
import { withRouter } from 'react-router-dom';

import StyledAvatar from '../../components/StyledAvatar';

/**
 * @type {import('typings/pages').Menu}
 */
const Menu = (props) => {
  const pwa = usePwa();

  return (
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

          {Boolean(pwa.supports && !pwa.isInstalled) && (
          <ListItem divider button onClick={pwa.install}>
            <ListItemIcon><StyledAvatar variant="rounded" color="primary"><GetAppIcon /></StyledAvatar></ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ variant: 'subtitle2' }}
              primary="Mobile/Desktop"
              secondary="Click para instalar"
            />
          </ListItem>
          )}

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
};

export default withRouter(Menu);
