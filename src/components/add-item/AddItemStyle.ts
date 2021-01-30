import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useAddItemStyles = makeStyles((theme: Theme) => {
  return createStyles({
    textInput: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    ratingInput: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    addButton: {
      width: "100%"
    }
  });
});
