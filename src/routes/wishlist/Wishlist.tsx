import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useWishlistStyle, useWishlistTableStyle } from "./WishlistStyle";
import { useQuery } from "react-query";
import {
  Chip,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  Paper,
  Slider,
  Typography,
} from "@material-ui/core";
import {
  householdsRequests,
  permissionsRequests,
  userRequests,
  wishlistRequests,
} from "../../utils/requests";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ClearIcon from "@material-ui/icons/Clear";
import { DataGrid, ColDef, ValueFormatterParams } from "@material-ui/data-grid";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import { yellow, red } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { Reducers } from "../../redux/reducer";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { ErrorCard } from "../../components/error/ErrorCard";
import { Loading } from "../../components/loading/Loading";
import { Rating } from "@material-ui/lab";
import DeleteIcon from "@material-ui/icons/Delete";

export function Wishlist() {
  const classes = useWishlistStyle();
  const config = useSelector((state: Reducers) => state.config);
  const { isLoading, error, data: users, refetch } = useQuery<any, any, any>(
    "wishlist-get-users-by-household",
    () => userRequests.GET_BY_HOUSEHOLD(config.user_config?.household)
  );
  const [value, setValue] = React.useState(0);

  if (error) return <ErrorCard error={error} />;
  if (isLoading) return <Loading />;
  if (!users) return <ErrorCard />;

  const sortUsers = (a: any, b: any) => {
    if (b._id == config.user_config?._id) return 1;
    if (a._id == config.user_config?._id) return -1;
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return a.name.localeCompare(b.name);
  };

  const tabs = (users || []).sort(sortUsers).map((user: any) => {
    return {
      label: user._id == config.user_config?._id ? "Me" : user.name,
      element: () => <WishlistTable userId={user._id} />,
    };
  });

  const TabHeader = (tab: any, i: number) => (
    <Tab label={tab.label} id={`tab-${i}`} style={{ textTransform: "none" }} />
  );

  const TabPanel = (tab: any, i: number) => (
    <div
      className={classes.tabPanel}
      role="tabpanel"
      hidden={value !== i}
      id={`tabpanel-${i}`}
      children={value === i && <tab.element />}
    />
  );

  return (
    <div className={classes.root}>
      <Tabs
        orientation="horizontal"
        value={value}
        onChange={(e: any, newValue: number) => setValue(newValue)}
        className={classes.tabs}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        children={tabs.map(TabHeader)}
        style={{ minWidth: "fit-content" }}
      />
      {tabs.map(TabPanel)}
    </div>
  );
}

function WishlistTable({ userId }: any) {
  const classes = useWishlistTableStyle();
  const config = useSelector((state: Reducers) => state.config);
  const { isLoading, error, data: wishlist, refetch } = useQuery<any, any, any>(
    "wishlist-get-items-" + userId,
    () => wishlistRequests.LIST(userId)
  );

  if (error) return <ErrorCard error={error} />;
  if (isLoading) return <Loading />;
  if (!wishlist) return <ErrorCard />;

  if (userId == config.user_config?._id)
    return (
      <PersonalList
        wishlist={wishlist}
        classes={classes}
        userId={userId}
        refetch={refetch}
      />
    );
  return <NormalList wishlist={wishlist} classes={classes} />;
}

function NormalList({ wishlist, classes }: any) {
  const Stars = ({ amount }: any) => {
    const stars = new Array(5)
      .fill(0)
      .map((el: any, i: number) => (
        <StarIcon style={i < amount ? { color: yellow[500] } : {}} />
      ));
    return <>{stars}</>;
  };

  const sortItems = (a: any, b: any) => {
    if (a.stars > b.stars) return -1;
    if (a.stars < b.stars) return 1;
    return a.name.localeCompare(b.name);
  };

  const PlainListItem = (item: any) => (
    <>
      <ListItem button style={{ alignItems: "center" }}>
        <Rating name="simple-controlled" value={item.stars} readOnly />
        <ListItemText inset primary={item.name} />
      </ListItem>
      <Divider />
    </>
  );

  const Items = wishlist.sort(sortItems).map(PlainListItem);

  return (
    <div style={{ height: "100%" }}>
      <List className={classes.root} children={Items} />
    </div>
  );
}

function PersonalList({ wishlist, classes, refetch, userId }: any) {
  const handleStarUpdate = (id: any, amount: any) => {
    wishlistRequests.UPDATE(id, { stars: amount }).then(() => refetch());
  };

  const handleRemoveItem = (id: any) => {
    wishlistRequests.DELETE(id).then(() => refetch());
  };

  const sortItems = (a: any, b: any) => {
    if (a.stars > b.stars) return -1;
    if (a.stars < b.stars) return 1;
    return a.name.localeCompare(b.name);
  };

  const Items = wishlist.sort(sortItems).map((item: any, i: number) => {
    return (
      <>
        {i == 0 && <Divider />}
        <ListItem style={{ alignItems: "center" }}>
          <IconButton
            onClick={() => handleRemoveItem(item._id)}
            children={<DeleteIcon />}
            style={{
              color: red[500],
              marginRight: "50px"
            }}
          />
          <Rating
            name={`item-${item._id}-rating`}
            value={item.stars}
            onChange={(event, newValue) => handleStarUpdate(item._id, newValue)}
          />
          <ListItemText inset primary={item.name} />
        </ListItem>
        <Divider />
      </>
    );
  });

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <AddWishBox refetch={refetch} userId={userId} />
      </div>
      <List className={classes.root} children={Items} />
    </div>
  );
}

function AddWishBox({ refetch, userId }: any) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [stars, setStars] = React.useState(0);

  const handleAddWish = () => {
    if (!name || name.trim() == "") return;

    wishlistRequests.ADD({ name, stars, user_id: userId }).then(handleClose);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    refetch();
    setOpen(false);
  };

  return (
    <div>
      <Button
        children="Add"
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        style={{ width: "10vw" }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Wish</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e: any) => setName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Rating
            name={`new-item-${userId}`}
            value={stars}
            onChange={(event, newValue) => setStars(newValue || 1)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddWish} color="secondary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
