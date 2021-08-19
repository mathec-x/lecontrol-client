import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';

function InputField({
  defaultValue, onSubmit, match = null, errorText = '', helperText, ...props
}) {
  const [state, setState] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (defaultValue !== state) {
      setState(defaultValue);
    }
  }, [defaultValue]);

  const regexp = new RegExp(match);
  const error = !match ? false : (!state || !regexp.test(state));

  const handleSubmit = () => {
    if (!loading && !error) {
      setLoading(true);
      Promise.resolve(onSubmit(state)).finally(() => setLoading(false));
    }
  };
  return (
    <>
      <TextField
        error={error}
        value={state}
        helperText={error ? errorText : helperText}
        onKeyDown={(e) => {
          if (e.key === 'enter' || e.keyCode === 13) { handleSubmit(); }
        }}
        onChange={(e) => setState(e.target.value)}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {Boolean(state && defaultValue !== state)
            && (
            <IconButton
              size="small"
              onClick={handleSubmit}
              color="primary"
              aria-label="save changes"
            >
              <SaveIcon style={{ transition: '120ms', transform: loading ? 'scale(.75)' : '' }} />
              {loading && <CircularProgress size={38} style={{ position: 'absolute' }} />}
            </IconButton>
            )}
            </InputAdornment>),
        }}
        {...props}
      />
    </>

  );
}

InputField.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  errorText: PropTypes.string,
  helperText: PropTypes.string.isRequired,
};

export default InputField;
