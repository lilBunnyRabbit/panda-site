import React from "react";
import { usePandaListStyles } from "./PandaListStyles";
import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

interface PandaListInterface<T> {
  createItem(item: any, i: number): any[];
  sort?(a: T, b: T): any;
  data: T[];
  actionBar?: any[];
  [key: string]: any;
}

export function PandaList<T>(props: PandaListInterface<T>) {
  const classes = usePandaListStyles();

  const mapItem = (item: T, i: number) => (
    <ListItem
      style={{ alignItems: "center" }}
      children={props.createItem(item, i)}
      divider={true}
    />
  );

  const items = (props.sort ? props.data.sort(props.sort) : props.data).map(
    mapItem
  );

  return (
    <div className={classes.root}>
      <List className={classes.list} children={items} />
      {props.actionBar && (
        <Paper elevation={3} square className={classes.actionBar} children={props.actionBar} />
      )}
    </div>
  );
}
