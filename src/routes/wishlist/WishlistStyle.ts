import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";

export const useWishlistStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            color: red[700],
            padding: theme.spacing(2)
        },
    })
});