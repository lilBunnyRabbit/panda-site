import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Reducers } from "../redux/reducer";
import { ConfigState } from "../redux/reducers/configReducer";
import BallotIcon from "@material-ui/icons/Ballot";
import HomeIcon from "@material-ui/icons/Home";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

import { Home } from "./home/Home";
import { GroceryList } from "./grocery-list/GroceryList";
import { Wishlist } from "./wishlist/Wishlist";
import { GameDashboard } from "./game-dashboard/GameDashboard";
import { AdminPanel } from "./admin-panel/AdminPanel";

export type RouteConfig = {
  name: string;
  path: string;
  element: any;
  permission?: string;
  icon: any;
};

export const routesConfigs: RouteConfig[] = [
  {
    name: "Home",
    path: "/",
    element: Home,
    icon: HomeIcon,
  },
  {
    name: "Grocery List",
    path: "/grocery-list",
    element: GroceryList,
    permission: "grocery_list",
    icon: BallotIcon,
  },
  {
    name: "Wishlist",
    path: "/wishlist",
    element: Wishlist,
    permission: "wishlist",
    icon: BallotIcon,
  },
  {
    name: "Game Dashboard",
    path: "/game-dashboard",
    element: GameDashboard,
    permission: "game_dashboard",
    icon: BallotIcon,
  },
  {
    name: "Admin Panel",
    path: "/admin-panel",
    element: AdminPanel,
    permission: "admin",
    icon: FingerprintIcon,
  },
];

export const getRoutes = (config: ConfigState): RouteConfig[] => {
  if (config.user_config?.permissions?.includes("admin")) return routesConfigs;
  return (
    routesConfigs.filter((routeConfig) => {
      if (!routeConfig.permission) return true;
      if (
        !config.user_config?.permissions ||
        !config.user_config.permissions.includes(routeConfig.permission)
      )
        return false;
      return true;
    }) || []
  );
};

export function Routes() {
  const config: ConfigState = useSelector((state: Reducers) => state.config);

  return (
    <Switch>
      {getRoutes(config).map((routesConfig) => (
        <Route
          exact
          path={routesConfig.path}
          children={<routesConfig.element />}
        />
      ))}
    </Switch>
  );
}
