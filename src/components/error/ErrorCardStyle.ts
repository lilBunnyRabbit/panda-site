import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useErrorCardStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          position: "relative"
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
        },
        card: {
          maxHeight: "100%",
          maxWidth: "100%",
          position: "relative"
        },
        accordion: {
          maxHeight: "50vh",
          overflowY: "auto",
        }
      })
});