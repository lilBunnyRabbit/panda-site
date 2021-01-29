import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const useWishlistStyle = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      position: "relative"
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    },
    tabPanel: {
      width: "100%",
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
    removeButton: {
      color: red[700]
    },
    clickableStar: {
      cursor: "pointer"
    }
  });
});
