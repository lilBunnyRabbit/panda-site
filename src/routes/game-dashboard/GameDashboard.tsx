import React from "react";
import { useGameDashboardStyles } from "./GameDashboardStyle";

export function GameDashboard() {
  const classes = useGameDashboardStyles();

  return <div className={classes.root}>Game Dashboard</div>;
}
