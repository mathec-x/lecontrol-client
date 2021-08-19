import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * @param {React.ComponentType} Component
 */
const withAuth = (Component) => {
  const mapState = (state) => ({
    token: state.user?.token,
  });

  const Authenticate = (props) => {
    const { token } = useSelector(mapState);

    useEffect(() => {
      if (!token) {
        // eslint-disable-next-line react/prop-types
        props.history.replace('/signin', { background: props.location });
      } else {
        localStorage.setItem('token', token);
      }
    }, [token]);

    return token ? <Component {...props} /> : null;
  };

  return Authenticate;
};

export default withAuth;
