import React from 'react';
import Iframe from 'react-iframe';
import PropTypes from 'prop-types';

const GMap = ({ origin, ...props }) => (
  <Iframe
    url={`https://maps.google.com/maps?q=${origin || 'São Paulo'}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
    width="100%"
    height="100%"
    display="initial"
    position="relative"
    {...props}
  />
);

GMap.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  waypoints: PropTypes.array.isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

export default GMap;
