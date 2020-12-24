import React from 'react';
import { useLoadingStyles } from './LoadingStyle';
import { CircularProgress } from '@material-ui/core';

export function Loading() {
  const classes = useLoadingStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="primary" size={100} thickness={2} />
    </div>
  );
}