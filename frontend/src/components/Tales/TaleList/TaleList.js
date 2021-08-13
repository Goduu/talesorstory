import { List, makeStyles } from '@material-ui/core';
import React from 'react';

import TaleItem from './TaleItem/TaleItem';


const useStyles = makeStyles({
  root: {
    maxWidth: '45%'
  }, 
  
});

const taleList = props => {
  const classes = useStyles();
  const tales = props.tales.map(tale => {
    return (
      <TaleItem
        key={tale._id}
        taleId={tale._id}
        title={tale.title}
        text={tale.text}
        date={tale.date}
        userId={props.authUserId}
        creatorId={tale.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <List className={classes.root}>{tales}</List>;
};

export default taleList;
