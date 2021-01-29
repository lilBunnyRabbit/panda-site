import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";

export const useJsonBoxStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            padding: theme.spacing(1),
        },
        column: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
        },
        row: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start"
        }
    })
});