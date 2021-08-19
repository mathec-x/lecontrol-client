import React from 'react';
import { DialogContent, List } from '@material-ui/core';

export default function DialogContentList(props) {
  return (
    <DialogContent style={{ minHeight: 200 }} dividers>
      <List {...props} />
    </DialogContent>
  );
}
