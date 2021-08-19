/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from 'react-router-dom';
import HideOnScroll from './HideOnScroll';

const getRouteLabel = (key) => {
  const defaultkey = [{ label: 'Home', redirect: '/' }];

  switch (key) {
    case '/list':
      defaultkey.push({ label: 'Lista', redirect: '/list' });
      break;
    case '/register':
      defaultkey.push({ label: 'Cadastrar', redirect: '/register' });
      break;
    default: break;
  }
  return defaultkey;
};

const AppBar = (props) => (
  <HideOnScroll>
    <MuiAppBar position="sticky">
      <Toolbar>
        <IconButton onClick={() => props.history.push('#menu')} edge="start" color="inherit" aria-label="close">
          <MenuIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb" color="inherit">
          {getRouteLabel(props.location.pathname).map((e) => (
            <Link to={e.redirect} key={e.redirect}>
              <Typography variant="subtitle2">
                {e.label}
              </Typography>
            </Link>
          ))}
        </Breadcrumbs>
      </Toolbar>
    </MuiAppBar>
  </HideOnScroll>
);

export default withRouter(AppBar);
