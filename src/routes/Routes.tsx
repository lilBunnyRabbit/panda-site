import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Reducers } from "../redux/reducer";
import { ConfigState } from "../redux/reducers/configReducer";

import HomeIcon from "@material-ui/icons/Home";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import ListIcon from '@material-ui/icons/List';

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
    icon: LocalGroceryStoreIcon,
  },
  {
    name: "Wishlist",
    path: "/wishlist",
    element: Wishlist,
    permission: "wishlist",
    icon: ListIcon,
  },
  {
    name: "Game Dashboard",
    path: "/game-dashboard",
    element: GameDashboard,
    permission: "game_dashboard",
    icon: VideogameAssetIcon,
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
