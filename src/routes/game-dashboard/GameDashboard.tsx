import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import { useQuery } from 'react-query'
import { Button, ListItemAvatar, Paper } from '@material-ui/core';
import { green } from "@material-ui/core/colors";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { ErrorCard } from '../../components/error/ErrorCard';
import { Loading } from '../../components/loading/Loading';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HistoryIcon from '@material-ui/icons/History';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';

import { Reducers } from '../../redux/reducer';
import { useSelector } from 'react-redux';
import { useGameDashboardStyles } from './GameDashboardStyle';

export function GameDashboard() {
  // const config = useSelector((state: Reducers) => state.config);
  // const { isLoading, error, data, refetch } = useQuery<any, any, any>('listData', () => getGroceryList(config.user_config?.household));
  const classes = useGameDashboardStyles();

  return (
    <div className={classes.root}>
        Game dashboard
    </div>
  );
}