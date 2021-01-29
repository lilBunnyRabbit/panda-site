import React from "react";
import DataTable from "./Table";
import { useWishlistStyle } from "./WishlistStyle";

import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const randomValue = (max: number, min?: number) =>
  Math.floor(Math.random() * max) + (min || 1);

const data: { [key: string]: any[] } = ((): { [key: string]: any[] } => {
  const output: any = {};
  for (let i = 0; i < 10; i++) {
    output[`user_${i}`] = new Array(10).fill(0).map(() => {
      return {
        _id: `${randomValue(50000, 50000)}`,
        name: `item_${randomValue(100)}`,
        user_id: `user_${i}`,
        time_created: randomValue(50000, 50000),
      };
    });
  }

  return output;
})();

export function Wishlist() {
  const classes = useWishlistStyle();

  return (
    <div className={classes.root}>
      <ScrollableTabsButtonAuto />
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const tabs: any = {
    headers: [],
    children: [],
  };

  Object.keys(data).map((key, i) => {
    tabs.headers.push(<Tab label={key} {...a11yProps(i)} />);
    tabs.children.push(
      <TabPanel value={value} index={i} children={<DataTable />} />
    );
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {tabs.headers}
        </Tabs>
      </AppBar>
      {tabs.children}
    </div>
  );
}
