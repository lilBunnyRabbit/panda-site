import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const usePandaListStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
      position: "relative"
    },
    list: {
      maxHeight: "100%",
      position: "relative",
      width: "100%",
      backgroundColor: theme.palette.background.default,
      overflowY: "auto",
      padding: 0,
      flex: 1
    },
    actionBar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      height: "auto",
      position: "relative",
      padding: theme.spacing(1),
      zIndex: 10
    }
  });
});
