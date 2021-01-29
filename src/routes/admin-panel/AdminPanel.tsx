import React from "react";
import { useAdminPanelStyles } from "./AdminPanelStyle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { UsersPanel } from "./UserPanel";
import { PermissionsPanel } from "./PermissionsPanel";
import { HouseholdsPanel } from "./HouseholdsPanel";

const tabs = [
  {
    label: "Users",
    element: UsersPanel,
  },
  {
    label: "Permissions",
    element: PermissionsPanel,
  },
  {
    label: "Households",
    element: HouseholdsPanel,
  },
];

export function AdminPanel() {
  const classes = useAdminPanelStyles();
  const [value, setValue] = React.useState(0);

  const TabHeader = (tab: any, i: number) => (
    <Tab label={tab.label} id={`tab-${i}`} />
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
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(e: any, newValue: number) => setValue(newValue)}
        className={classes.tabs}
        indicatorColor="secondary"
        textColor="secondary"
        children={tabs.map(TabHeader)}
        style={{ minWidth: "fit-content" }}
      />
      {tabs.map(TabPanel)}
    </div>
  );
}
