import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const useWishlistStyle = makeStyles((theme: Theme) => {
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
  });
});

export const useWishlistTableStyle = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: "100%",
      position: "relative",
      width: "100%",
      backgroundColor: theme.palette.background.default,
      overflowY: 'auto'
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
      position: "relative"
    },
    removeButton: {
      color: red[700]
    },
    clickableStar: {
      cursor: "pointer"
    },
    editButton: {
      width: "50%",
      marginRight: theme.spacing(0.5)
    },
    addButton: {
      width: "50%",
      marginLeft: theme.spacing(0.5)
    }
  });
});
