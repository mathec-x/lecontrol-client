import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = {
  root: {
    background: styledBy('color', {
      default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    }),
    width: 275,
    margin: 8,
    boxShadow: styledBy('color', {
      default: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }),
  },
  content: {
    height: 175,
  },
};

const StyledCard = withStyles(styles)(({
  classes, color, children, ...props
}) => (
  <Card {...props} className={classes.root}>
    <CardActionArea>
      <CardContent className={classes.content}>
        {children}
      </CardContent>
    </CardActionArea>
  </Card>
));

export default StyledCard;
