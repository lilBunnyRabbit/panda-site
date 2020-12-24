import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useLoadingStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            marginTop: "30%"
        }
    })
});