import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const StyledAppBar = withStyles((theme) => ({
  root: {
    position: 'relative',
    '& h6': {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  },
}))((AppBar));

export default StyledAppBar;
