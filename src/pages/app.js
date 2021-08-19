/* eslint-disable react/prop-types */
/// <reference path="../typings/root.d.ts"/>
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter, Route, Switch, withRouter,
} from 'react-router-dom';
import './app.css';
import Container from '@material-ui/core/Container';

import SocketIo from '../hooks/useSocket';
import AppSuspense from '../components/Suspense';
import AppBar from '../components/AppBar';
import PreLoader from '../components/PreLoader';
import reduxstore from '../reducers/store';

import Menu from './Menu';
import Register from './Register';
import Signin from './Signin';
import Edit from './Register/Edit';
import { Product } from '../services/api';

const Home = React.lazy(() => import('./Home'));

const Pages = withRouter(({ location }) => {
  const background = location.state?.background;
  return (
    <Suspense fallback={<AppSuspense />}>
      <Switch location={background || location}>
        <Route path="/" exact component={Home} />
      </Switch>
      <Route path="/signin" exact component={Signin} />
      <Route path="/register" exact component={Register} />
      <Route path="/register/:uuid" exact component={Edit} />
    </Suspense>
  );
});

const App = () => {
  const { store, persistor } = reduxstore();

  React.useEffect(() => {
    Product.get();
  });
  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <SocketIo>
          <BrowserRouter>
            <AppBar />
            <Container fixed disableGutters>
              <Pages />
            </Container>
            <Menu />
            <PreLoader />
          </BrowserRouter>
        </SocketIo>
      </PersistGate>
    </Provider>
  );
};
export default App;
