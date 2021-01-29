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
    card: {
      width: "100%",
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
    userDataBox: {
      backgroundColor: "#303030",
      padding: theme.spacing(1),
      color: theme.palette.primary.light,
      resize: "none",
      width: "100%",
      maxHeight: "200px",
      overflowY: "auto",
    },
    userData: {
      width: "100%",
      backgroundColor: "rgb(0, 0, 0, 0)",
      outline: "none",
      border: "none",
      resize: "none",
      padding: theme.spacing(1),
      color: theme.palette.secondary.light,
    },
    inputName: {
      marginBottom: theme.spacing(3),
    },
    inputHouseholdForm: {
      width: "100%",
      marginBottom: theme.spacing(3),
    },
    inputHousehold: {
      width: "100%",
    },
    backButton: {
      marginBottom: theme.spacing(3),
    },
    updateUserButton: {
      width: "100%",
      margin: "8px",
    },
    accordion: {
      marginBottom: theme.spacing(2),
    },
  });
});

export const usePermissionsPanelStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
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
    permissionsBox: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    }
  });
});

export const useHouseholdsPanelStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
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
  });
});
