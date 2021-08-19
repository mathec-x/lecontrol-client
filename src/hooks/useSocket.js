import React, {
  createContext, useEffect, useState,
} from 'react';
import customParser from 'socket.io-msgpack-parser';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { SocketApiUrl } from '../services/api';

/** *****************************************************
 * @typedef {import("socket.io-client").Socket} SocketIo
 * @typedef {string} IoEvents

@type {SocketIo & {reconnect(): void}}} */
const IoSocketInstance = null;

export const useSocket = () => {
  const [socket, setSocket] = useState(IoSocketInstance);
  const dispatch = useDispatch();
  const getToken = () => window.localStorage.getItem('token');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const socketIo = io(SocketApiUrl, {
        parser: customParser,
        auth: (cb) => {
          cb({ token: getToken() });
        },
      });
      setSocket(socketIo);

      const cleanup = () => {
        socketIo.disconnect();
      };
      return cleanup;
    }

    return false;
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('dispatch', dispatch);

      socket.on('disconnect', () => {
        localStorage.removeItem('socket-id');
      });

      socket.on('connect', () => {
        localStorage.setItem('socket-id', socket.id);
      });

      socket.on('refresh', (data) => {
        localStorage.setItem('token', data.token || null);
      });
    }
  }, [socket]);

  function reconnect() {
    if (socket.connected) socket.disconnect();

    setTimeout(() => {
      window.location.reload();
      // socket.connect();
    }, 1000);
  }

  return { ...socket, reconnect };
};

export const SocketIoContext = createContext(IoSocketInstance);

const SocketIo = (props) => (
  <SocketIoContext.Provider value={useSocket()} {...props} />
);
export default SocketIo;
