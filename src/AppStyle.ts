import {
  createStyles,
  makeStyles,
  Theme,
  createMuiTheme,
} from "@material-ui/core/styles";
import { lightBlue, cyan, lightGreen } from "@material-ui/core/colors";

export const createAppTheme = (theme: "dark" | "light") => {
  const select = (dark: any, light: any) => (theme === "dark" ? dark : light);
  return createMuiTheme({
    palette: {
      type: theme,
      primary: {
        main: select(lightBlue[500], cyan[500]),
      },
      secondary: {
        main: select(lightGreen[500], lightGreen[500]),
      },
    },
  });
};

export const useAppStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
      height: "100vh",
      position: "relative",
    },
    navbar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      alignContent: "center",
      alignItems: "center",
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      height: "80px",
      borderBottom: "1px solid rgb(255, 255, 255, 0.1)",
    },
    content: {
      width: "100%",
      height: "calc(100vh - 80px)",
      position: "relative",
    },
    drawerTitle: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(2),
    },
    drawerListItem: {
      paddingRight: theme.spacing(10),
    },
    drawerLink: {
      color: "inherit",
      textDecoration: "inherit",
    },
    title: {
      flexGrow: 1,
    },
    drawerButton: {
      marginRight: theme.spacing(2),
    },
    errorCard: {
      marginTop: "30%",
    },
    themeIcon: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      textTransform: "capitalize",
    },
  });
});
