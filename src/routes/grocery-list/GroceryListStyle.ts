import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useGroceryListStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            position: "relative",
            width: '100%',
            height: "100%",
        },
        tabNav: {
            height: "5%",
        },
        tabPanel: {
            height: "95%",
            overflowX: "hidden",
            overflowY: "scroll",
        },
        list: {
            height: "100%",
            overflowX: "hidden",
            overflowY: "scroll",
            marginBottom: theme.spacing(3),
        },
        listItemDetails: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            flexWrap: "wrap",
        },
        inputBox: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
        },
        inputItem: {
            width: "45%",
            margin: theme.spacing(2)
        },
        inputButon: {
            width: "100%"
        },
        addButton: {
            position: "absolute",
            bottom: 5,
            right: 20
        },
        actionRow: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            position: "relative"
        },
        itemInfo: {
            display: 'flex',
            flexDirection: 'row',
        },
    })
});