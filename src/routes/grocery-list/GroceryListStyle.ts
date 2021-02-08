import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useGroceryListStyle = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      position: "relative",
    },
    tabsBox: {
      height: "48px",
      zIndex: 10
    },
    tabsPanelBox: {
      position: "relative",
      height: "calc(100% - 48px)"
    },
    tabPanel: {
      width: "100%",
      height: "100%",
      flex: 1,
      position: "relative"
    },
    userPanel: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
    },
    addButton: {
      width: "100%"
    },
    clickableItem: {
      cursor: "pointer"
    },
    usernameBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    username: {
      marginLeft: "5px"
    }
  });
});