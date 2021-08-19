/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import { Box } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const FlexBox = ({ direction, ...props }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Box display="flex" flexDirection={direction || (matches ? 'row' : 'column')} justifyContent="center" alignItems="center" height="inherit" {...props} />
  );
};

FlexBox.propTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
};

export default FlexBox;
