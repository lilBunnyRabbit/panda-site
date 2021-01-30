import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useWishlistStyle, useWishlistTableStyle } from "./WishlistStyle";
import { useQuery } from "react-query";
import { IconButton, Paper } from "@material-ui/core";
import { userRequests, wishlistRequests } from "../../utils/requests";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import { red } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { Reducers } from "../../redux/reducer";
import { ErrorCard } from "../../components/error/ErrorCard";
import { Loading } from "../../components/loading/Loading";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddItem } from "../../components/add-item/AddItem";
import { PandaList } from "../../components/panda-list/PandaList";
import { PandaRating } from "../../components/ratings/PandaRating";

export function Wishlist() {
  const classes = useWishlistStyle();
  const config = useSelector((state: Reducers) => state.config);
  const { isLoading, error, data: users } = useQuery<any, any, any>(
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
      <Paper elevation={4} square className={classes.tabsBox}>
        <Tabs
          orientation="horizontal"
          value={value}
          onChange={(e: any, newValue: number) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          children={tabs.map(TabHeader)}
          style={{ minWidth: "fit-content" }}
        />
      </Paper>
      <div className={classes.tabsPanelBox}>{tabs.map(TabPanel)}</div>
    </div>
  );
}

function WishlistTable({ userId }: any) {
  const classes = useWishlistTableStyle();
  const config = useSelector((state: Reducers) => state.config);
  const { isLoading, error, data: wishlist, refetch } = useQuery<any>(
    "wishlist-get-items-" + userId,
    () => wishlistRequests.LIST(userId)
  );
  const [edit, setEdit] = React.useState(false);

  if (error) return <ErrorCard error={error} />;
  if (isLoading) return <Loading />;
  if (!wishlist) return <ErrorCard />;

  const sortItems = (a: any, b: any) => {
    if (a.stars > b.stars) return -1;
    if (a.stars < b.stars) return 1;
    return a.name.localeCompare(b.name);
  };

  if (userId == config.user_config?._id) {
    const handleStarUpdate = (id: any, amount: any) => {
      wishlistRequests.UPDATE(id, { stars: amount }).then(() => refetch());
    };

    const handleRemoveItem = (id: any) => {
      wishlistRequests.DELETE(id).then(() => refetch());
    };

    return (
      <PandaList
        createItem={(item, i) => [
          edit && (
            <IconButton
              onClick={() => handleRemoveItem(item._id)}
              children={<DeleteIcon />}
              style={{
                color: red[500],
                marginRight: "50px",
              }}
            />
          ),
          <PandaRating
            name={`item-${item._id}-${i}`}
            value={item.stars}
            onChange={(event: any, newValue: any) =>
              edit && handleStarUpdate(item._id, newValue)
            }
            readOnly={!edit}
            theme={config.theme}
          />,
          <ListItemText inset primary={item.name} />,
        ]}
        data={wishlist}
        sort={sortItems}
        actionBar={[
          <Button
            children="Edit"
            variant={edit ? "outlined" : "contained"}
            color="primary"
            onClick={() => setEdit(!edit)}
            className={classes.editButton}
            style={{ width: "50%" }}
          />,
          <AddItem
            title="Add Wish"
            className={classes.addButton}
            handleAdd={(state: any) => {
              if (!state.name || state.name.trim() == "")
                return {
                  errors: { name: true },
                };

              return wishlistRequests
                .ADD({
                  name: state.name,
                  stars: state.stars,
                  user_id: userId,
                })
                .then(() => refetch())
                .catch(() => ({ errors: {} }));
            }}
            inputs={[
              {
                type: "search",
                id: "name",
                label: "Name",
              },
              {
                type: "rating",
                id: "stars",
                label: "Stars",
              },
            ]}
          />,
        ]}
      />
    );
  }

  return (
    <PandaList
      createItem={(item, i) => [
        <PandaRating
          name={`item-${item._id}-${i}`}
          value={item.stars}
          readOnly
          theme={config.theme}
        />,
        <ListItemText inset primary={item.name} />,
      ]}
      data={wishlist}
      sort={sortItems}
    />
  );
}
