import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useQuery } from "react-query";
import {
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  groceryListRequests,
} from "../../utils/requests";
import ListItemText from "@material-ui/core/ListItemText";
import {  green } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { Reducers } from "../../redux/reducer";
import { ErrorCard } from "../../components/error/ErrorCard";
import { Loading } from "../../components/loading/Loading";
import { AddItem } from "../../components/add-item/AddItem";
import { PandaList } from "../../components/panda-list/PandaList";
import { useGroceryListStyle } from "./GroceryListStyle";
import CheckIcon from "@material-ui/icons/Check";
import { relativeTimeDifference } from "./GroceryListUtils";
import RestoreIcon from "@material-ui/icons/Restore";

export function GroceryList() {
  const classes = useGroceryListStyle();
  const config = useSelector((state: Reducers) => state.config);
  const { isLoading, error, data: groceryList, refetch } = useQuery<any>(
    "listData",
    () => groceryListRequests.LIST(config.user_config?.household)
  );
  const [history, setHistory] = React.useState<any[]>([]);
  const [value, setValue] = React.useState(0);

  if (error) return <ErrorCard error={error} />;
  if (isLoading) return <Loading />;
  if (!groceryList) return <ErrorCard />;

  const sortItems = (a: any, b: any) => {
    if (a.time_created > b.time_created) return -1;
    if (a.time_created < b.time_created) return 1;
    return a.name.localeCompare(b.name);
  };

  const ClickableItem = ({ item }: any) => {
    const [clicked, setClicked] = React.useState(false);

    return (
      <ListItemText
        inset
        primary={
          clicked ? (
            <span className={classes.usernameBox}>
              Added by{" "}
              <Typography
                color="secondary"
                className={classes.username}
                children={item.username}
              />
            </span>
          ) : (
            item.name
          )
        }
        secondary={
          clicked ? relativeTimeDifference(item.time_created) : item?.comment
        }
        onClick={() => setClicked(!clicked)}
        className={classes.clickableItem}
      />
    );
  };

  const handleRemoveItem = async (item: any) => {
    return groceryListRequests.DELETE(item).then(() => {
      setHistory([item, ...history]);
      refetch();
    });
  };

  const handleReAddItem = async (item: any) => {
    await groceryListRequests
      .ADD({
        name: item.name,
        username: config.user?.name,
        household: config.user_config?.household,
      })
      .then(() => {
        const new_history = [...history];
        const index = new_history.findIndex((it: any) => it._id == item._id);
        if (index == -1) return;
        new_history.splice(index, 1);
        setHistory(new_history);
        refetch();
      });
  };

  const lists = [
    {
      label: "List",
      list: (
        <PandaList
          createItem={(item, i) => [
            <IconButton
              onClick={() => handleRemoveItem(item)}
              edge="start"
              children={<CheckIcon />}
              style={{ color: green[500] }}
            />,
            <ClickableItem item={item} />,
          ]}
          data={groceryList}
          sort={sortItems}
          actionBar={[
            <AddItem
              title="Add item"
              className={classes.addButton}
              handleAdd={(state: any) => {
                if (!state.name || state.name.trim() == "")
                  return {
                    errors: { name: true },
                  };

                const send_data: any = {
                  name: state.name,
                  username: config.user?.name,
                  household: config.user_config?.household,
                };

                if (state.comment && state.comment.trim() !== "")
                  send_data.comment = state.comment;

                return groceryListRequests
                  .ADD(send_data)
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
                  type: "search",
                  id: "comment",
                  label: "Comment",
                },
              ]}
            />,
          ]}
        />
      ),
    },
    {
      label: "History",
      list: (
        <PandaList
          createItem={(item, i) => [
            <IconButton
              onClick={() => handleReAddItem(item)}
              edge="start"
              children={<RestoreIcon />}
              color="primary"
            />,
            <ListItemText inset primary={item.name} />,
          ]}
          data={history}
        />
      ),
    },
  ];

  const TabHeader = (tab: any, i: number) => (
    <Tab label={tab.label} id={`tab-${i}`} style={{ textTransform: "none" }} />
  );

  const TabPanel = (tab: any, i: number) => (
    <div
      className={classes.tabPanel}
      role="tabpanel"
      hidden={value !== i}
      id={`tabpanel-${i}`}
      children={tab.list}
    />
  );

  return (
    <div className={classes.root}>
      <Paper elevation={3} square className={classes.tabsBox}>
        <Tabs
          orientation="horizontal"
          value={value}
          onChange={(e: any, newValue: number) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          children={lists.map(TabHeader)}
          style={{ minWidth: "fit-content" }}
        />
      </Paper>
      <div className={classes.tabsPanelBox}>{lists.map(TabPanel)}</div>
    </div>
  );
}
