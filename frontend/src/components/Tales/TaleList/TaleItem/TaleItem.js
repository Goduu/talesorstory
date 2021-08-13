import React from 'react';

import { ListItemText, ListItem, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    maxWidth: '90%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'

  }, 
  
});

const taleItem = props => {
  const classes = useStyles()

  return (
  <ListItem key={props.taleId}>
    {console.log("--", props)}
    <ListItemText
      primary={props.title}
      secondary={
        <div className={classes.text}>
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
            maxRows={1}
            
          >
          {props.text}
          </Typography>
        </div>
      }
    />

    <Button variant="outlined" onClick={props.onDetail.bind(this, props.taleId)}>
      Read
    </Button>

  </ListItem>
);}

export default taleItem;
