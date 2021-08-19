/* eslint-disable react/prop-types */
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

export default function StyledListItem({
  primary, secondary, progress, ...props
}) {
  return (
    <ListItem {...props} component="label">
      <ListItemText
        component="div"
        primary={(
          <>
            <Typography variant="caption">{secondary}</Typography>
            <Typography variant="subtitle2">{primary}</Typography>
          </>
)}
        secondaryTypographyProps={{ variant: 'inherit' }}
        secondary={progress && <LinearProgress variant="determinate" value={Number(progress)} />}
      />
    </ListItem>
  );
}
