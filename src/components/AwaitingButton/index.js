import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// eslint-disable-next-line react/prop-types
export default function AwaitingButton({ loading, ...props }) {
  return (
    <Button
      endIcon={loading
      && (
      <CircularProgress
        size={22}
        style={{ position: 'absolute', top: 7 }}
      />
      )}
      disabled={loading}
      {...props}
    />
  );
}
