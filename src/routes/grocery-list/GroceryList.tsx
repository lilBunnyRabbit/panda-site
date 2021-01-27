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
import { getGroceryList, deleteGroceryItem, addGroceryItem, relativeTimeDifference } from './GroceryListUtils';
import { useGroceryListStyles } from './GroceryListStyle';
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

const panels = [
  "List",
  "History"
]

export function GroceryList() {
  const config = useSelector((state: Reducers) => state.config);
  const { isLoading, error, data, refetch } = useQuery<any, any, any>('listData', () => getGroceryList(config.user_config?.household));
  const [historyData, setHistoryData] = React.useState<any[]>([]);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const classes = useGroceryListStyles();

  const addToHistory = (element: any) => setHistoryData([element, ...historyData]);
  const removeFromHistory = (element: any) => {
    const index = historyData.findIndex((el: any) => element.name == el.name);
    if (index == -1) return;
    historyData.splice(index, 1);
    setHistoryData(historyData);
  };

  const tabs = React.useMemo(() => panels.map((name: string) => <Tab label={name} />), [panels]);
  const list = React.useMemo(() => <ListTab
    data={data}
    refetch={refetch}
    addToHistory={addToHistory}
  />, [data, refetch, addToHistory]);

  const history_list = React.useMemo(() => <HistoryTab
    data={historyData}
    refetch={refetch}
    removeFromHistory={removeFromHistory}
  />, [historyData, refetch, removeFromHistory]);

  if (error) return <ErrorCard error={error} />;
  if (isLoading) return <Loading />
  if (!data) return <ErrorCard />;

  const handleClose = () => setOpen(false);

  const TabPanel = ({ children, value, index }: any) => <div
    role="tabpanel"
    hidden={value !== index}
    className={classes.tabPanel}
    children={value === index && children}
  />;

  return (
    <div className={classes.root}>
      <Paper elevation={4} square>
        <Tabs
          className={classes.tabNav}
          value={value}
          onChange={(e: any, value: number) => setValue(value)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
          children={tabs}
        />
      </Paper>

      <TabPanel value={value} index={0}>
        {list}
        <Fab
          className={classes.addButton}
          color="primary"
          children={<AddIcon />}
          onClick={() => setOpen(true)}
        />
        <Dialog open={open} onClose={handleClose}>
          <AddItemDialog handleClose={handleClose} refetch={refetch} />
        </Dialog>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {history_list}
      </TabPanel>
    </div>
  );
}

function ListTab({ data, refetch, addToHistory }: any) {
  const classes = useGroceryListStyles();
  const ListElement = ({ element }: any) => {
    const [clicked, setClicked] = React.useState(false);
    
    const itemText = clicked
      ? <ListItemText 
          primary={(
            <Typography className={classes.itemInfo}>
              Added by&nbsp;<Typography color="secondary">{element?.username}</Typography>
            </Typography>
          )} 
          secondary={<Typography color="textSecondary" children={relativeTimeDifference(element?.time_created)} />}
        />
      : <ListItemText
          primary={<Typography children={element?.name} />}
          secondary={<Typography color="textSecondary" children={element?.comment} />}
        />;

    return (
      <ListItem button divider={true} onClick={() => { if (element?.username) setClicked(!clicked); }}>
        <ListItemAvatar>
          <IconButton edge="end" aria-label="delete" onClick={() => {
            addToHistory(element);
            deleteGroceryItem(element).then(() => refetch())
          }}>
            <CheckIcon style={{ color: green[500] }} />
          </IconButton>
        </ListItemAvatar>
        <div children={itemText} />
      </ListItem>
    )
  };

  const listElements = data.map((item: any, value: any) => <ListElement element={data[data.length - value - 1]} />);

  return <List
    dense={false}
    style={{ padding: 0 }}
    children={listElements}
  />;
}

function AddItemDialog({ handleClose, refetch }: any) {
  const config = useSelector((state: Reducers) => state.config);
  const [name, setName] = React.useState("");
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    if (!name || name.trim() == "") return;
    const send_data: any = {
      name,
      username: config.user?.name,
      household: config.user_config?.household,
    };
    if (name && name.trim() !== "") send_data.comment = comment;

    addGroceryItem(send_data).then(() => {
      refetch();
      handleClose();
    });
  }
  return (
    <>
      <DialogTitle children="Add new item" />
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="comment"
          label="Comment"
          type="text"
          fullWidth
          value={comment}
          onChange={(e: any) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" children="Cancel" />
        <Button onClick={handleSubmit} color="primary" children="Add" />
      </DialogActions>
    </>
  )
}

function HistoryTab({ data, refetch, removeFromHistory }: any) {
  const ListElement = ({ element }: any) => (
    <ListItem button divider={true}>
      <ListItemAvatar>
        <IconButton edge="end" aria-label="delete" onClick={() => {
          removeFromHistory(element);
          addGroceryItem(element).then(() => refetch())
        }}>
          <HistoryIcon color="primary" />
        </IconButton>
      </ListItemAvatar>
      <ListItemText primary={<Typography children={element?.name} />} secondary={<Typography color="textSecondary" children={element?.comment} />} />
    </ListItem>
  );

  const listElements = data.map((item: any, value: any) => <ListElement element={item} />);

  return <List
    dense={false}
    style={{ padding: 0 }}
    children={listElements}
  />
}