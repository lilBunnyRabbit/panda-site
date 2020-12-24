import React from "react";

import { ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BallotIcon from '@material-ui/icons/Ballot';
import HomeIcon from '@material-ui/icons/Home';
import SunIcon from '@material-ui/icons/Brightness5';
import MoonIcon from '@material-ui/icons/Brightness3';
import Box from "@material-ui/core/Box";
import { Avatar } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { useGoogleLogout } from 'react-google-login';

import { createAppTheme, useAppStyles } from "./AppStyle";
import { Login } from "./routes/login/Login";
import { Routes } from "./routes/Routes";
import { Reducers } from './redux/reducer';
import { configConstants } from "./redux/reducers/configReducer";

export default function App() {
  const config = useSelector((state: Reducers) => state.config);
  const MemoBase = React.useMemo(() => Base, []);

  if (!config?.user || !config?.user_config) return <Login />

  return (
    <Router>
      <MemoBase children={<Routes />} />
    </Router>
  )
}


function Base({ children }: any) {
  const config = useSelector((state: Reducers) => state.config);
  const [open, setOpen] = React.useState(false);
  const classes = useAppStyles();

  const NavBar = () => {
    return (
      <Box className={classes.navbar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(!open)}
          className={classes.drawerButton}
          edge="start"
          children={<MenuIcon />}
        />

        <div>
          <Typography variant="h6" className={classes.title}>
            Panda
          </Typography>
        </div>

        <UserSettings />
      </Box>
    )
  };

  const NavItem = ({ url, text, icon }: any) => <NavLink
    className={classes.drawerLink}
    to={url}
    children={(
      <ListItem button className={classes.drawerListItem} onClick={() => setOpen(false)}>
        <ListItemIcon children={icon} />
        <ListItemText primary={text} />
      </ListItem>
    )}
  />

  return (
    <ThemeProvider theme={createAppTheme(config.theme)}>
      <CssBaseline />
      <div className={classes.root}>
        <NavBar />
        <div className={classes.content} children={children} />
      </div>

      <Drawer anchor="left" open={open} onClose={() => { if (open) setOpen(false) }}>
        <Typography variant="h5" children="Navigation" align="left" className={classes.drawerTitle} />
        <Divider />
        <List>
          <NavItem url="/" text="Home" icon={<HomeIcon />} />
          { config?.user_config?.household && <NavItem url="/grocery-list" text="Grocery List" icon={<BallotIcon />} /> }
        </List>
      </Drawer>
    </ThemeProvider>
  );
}

function UserSettings() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const config = useSelector((state: Reducers) => state.config);
  const classes = useAppStyles();
  const dispatch = useDispatch();

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_ID || "",
    onLogoutSuccess: () => dispatch({ type: configConstants.SET_USER })
  })

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const changeTheme = () => dispatch({ type: configConstants.SET_THEME, payload: config.theme === "dark" ? "light" : "dark" });

  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        children={<Avatar alt={config?.user?.name} src={config?.user?.imageUrl} />}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={changeTheme} children={<div className={classes.themeIcon} 
          children={config.theme == "dark" ? <SunIcon /> : <MoonIcon />} 
        />} />
        <MenuItem onClick={() => signOut()} children="Logout" />
      </Menu>
    </div>
  );
}