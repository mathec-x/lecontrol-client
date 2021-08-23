import React from 'react';
import { SocketIoProvider } from 'socket.io-hook';
import { useDispatch } from 'react-redux';
import customParser from 'socket.io-msgpack-parser';
import { Product } from '../api';

export default function WebSocket(props) {
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
      {...props}
    />
  );
}
