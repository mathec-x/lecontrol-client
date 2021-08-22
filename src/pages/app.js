import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { SocketIoProvider } from 'socket.io-hook';
import customParser from 'socket.io-msgpack-parser';
import AppSuspense from '../components/Suspense';
import AppBar from '../components/AppBar';
import PreLoader from '../components/PreLoader';
import useStore from '../reducers/store';
import Menu from './Menu';
import { Product } from '../services/api';
import './app.css';
import Router from './router';
// import SocketIo from '../hooks/useSocket';

const Document = () => {
  const dispatch = useDispatch();

  const rmvToken = (key) => localStorage.removeItem(key);
  const setToken = (key, x) => localStorage.setItem(key, x);

  return (
    <SocketIoProvider
      url={process.env.REACT_APP_SOCKET_URL}
      // suspense={<div className="suspense">carregando ...</div>}
      onDispatch={dispatch}
      onRefresh={(data) => setToken('token', data.token)}
      onDisconnect={() => rmvToken('socket-id')}
      onConnect={(socket) => {
        setToken('socket-id', socket.id);
        return Product.get();
      }}
      custom={{
        preloader: (data) => {
          console.log(data);
        },
      }}
      options={{
        parser: customParser,
        auth: (cb) => cb({ token: localStorage.getItem('token') }),
      }}
    >
      <BrowserRouter>
        <AppBar />
        <Container fixed disableGutters>
          <Router />
        </Container>
        <Menu />
        <PreLoader />
      </BrowserRouter>
    </SocketIoProvider>
  );
};

const App = () => {
  const { store, persistor } = useStore();
  return (
    <Provider store={store}>
      <PersistGate loading={<AppSuspense />} persistor={persistor}>
        <Document />
      </PersistGate>
    </Provider>
  );
};

export default App;
