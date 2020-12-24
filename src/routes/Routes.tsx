import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Reducers } from "../redux/reducer";

import { GroceryList } from "./grocery-list/GroceryList";
import { Home } from "./home/Home";

export function Routes() {
  const config = useSelector((state: Reducers) => state.config);

  return (
    <Switch>
      <Route path="/" exact children={<Home />} />
      { config.user_config?.household && <Route path="/grocery-list" exact children={<GroceryList />} /> }
    </Switch>
  )
}
