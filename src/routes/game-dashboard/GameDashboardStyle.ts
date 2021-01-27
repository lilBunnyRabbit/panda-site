import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useGameDashboardStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            position: "relative",
            width: '100%',
            height: "100%",
        },
    })
});