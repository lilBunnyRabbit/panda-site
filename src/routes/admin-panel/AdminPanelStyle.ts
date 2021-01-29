import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const useAdminPanelStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "100%",
      width: "100%",
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    },
    tabPanel: {
      width: "100%",
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
    userPanel: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
    },
  });
});

export const useUserPanelStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
    },
    root2: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    titleBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: theme.spacing(3),
    },
    tableBox: {
      height: "100%",
      width: "100%",
      flex: 1,
    },
    userJson: {
      backgroundColor: "#303030",
      padding: theme.spacing(1),
      color: theme.palette.primary.light,
      resize: "none",
      width: "100%"
    },
  });
});
