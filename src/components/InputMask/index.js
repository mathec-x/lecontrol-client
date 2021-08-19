/* eslint-disable react/prop-types */
import React from 'react';
import ReactInputMask from 'react-input-mask';
import InputBase from '@material-ui/core/InputBase';

/**
 * @typedef props
 * @property {React} component
 * @property {String} maskChar
 * @property {String} autoComplete
 * @property {String} mask
 * @property {String} value
 * @property {String} onChange
 * @property {String} id
 * @property {String} label
 * @property {String} helperText
 * @property {Object} InputProps
 * @property {Object} InputProps.endAdornment
 */
function InputMask(/** @type {props} : */ {
  component: Component,
  autoComplete = 'off',
  maskChar = '',
  ...props
}) {
  return (
    <ReactInputMask
      autoComplete={autoComplete}
      maskChar={maskChar}
      {...props}
    >
      {/** @param {props} rest */ (rest) => (
        Component ? <Component {...rest} /> : <InputBase {...rest} />
      )}
    </ReactInputMask>
  );
}

export default InputMask;
