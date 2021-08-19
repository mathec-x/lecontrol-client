import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = (theme) => ({
  root: {
    background: styledBy('color', {
      primary: 'linear-gradient(45deg, #4a148c 30%, #9c27b0 90%)',
      blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      red: 'linear-gradient(45deg, #ba2929 30%, #751c1c 90%)',
      green: 'linear-gradient(45deg, #3cb025 30%, #2da616 90%)',
    }),
    width: styledBy('size', {
      default: theme.spacing(4),
      medium: theme.spacing(7),
      large: theme.spacing(10),
    }),
    height: styledBy('size', {
      default: theme.spacing(4),
      medium: theme.spacing(7),
      large: theme.spacing(10),
    }),
    margin: styledBy('spacing', {
      1: theme.spacing(1),
      2: theme.spacing(2),
      3: theme.spacing(3),
    }),
  },
});

const StyledAvatar = withStyles(styles)(({ classes, color, ...props }) => (
  <Avatar {...props} className={classes.root} />
));

StyledAvatar.propTypes = {
  background: PropTypes.oneOf(['default', 'blue', 'red', 'green']),
  size: PropTypes.oneOf(['default', 'medium', 'large']),
  spacing: PropTypes.oneOf([1, 2, 3]),
};

export default StyledAvatar;
