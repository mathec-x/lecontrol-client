import React from 'react';
import { SocketIo } from '../../hooks/useSocket';

/**
 * @type {import('react').FC<{
 *      events: {[key in IoEvents]:Function}[];
 *      onMount: {[key in IoEvents]:Function}[];
 *      onUnMount: {[key in IoEvents]:Function}[];
 *  }>}
 */
const SocketComponent = ({
  events, onMount, onUnMount, ...props
}) => {
  const socket = React.useContext(SocketIo);
  const [firstRender, setFirstRender] = React.useState(false);

  React.useEffect(() => {
    if (socket && !firstRender) {
      if (events) { Object.keys(events).map((e) => socket.on(e, events[e])); }

      if (onMount) {
        Object.keys(onMount).map((e) => socket.emit(e, onMount[e]));
      }

      setFirstRender(true);

      return () => {
        if (events) { Object.keys(events).map((e) => socket.off(e)); }

        if (onUnMount) {
          Object.keys(onUnMount).map((e) => socket.emit(e, onUnMount[e]));
        }
      };
    }
    return false;
  }, [socket]);

  return props.children || null;
};

export default SocketComponent;
