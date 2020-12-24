import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    red
} from "@material-ui/core/colors";

export const useLoginStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            marginTop: "30%",
            alignItems: "center",
        },
        title: {
            marginBottom: "15px"
        },
        button: {
            marginBottom: "30px"
        },
        error: {
            width: "80%",
            textAlign: "center"
        },
        errorTitle: {
            marginBottom: "15px",
            color: red[700]
        },
    })
});