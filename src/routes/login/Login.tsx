import { useDispatch } from "react-redux";
import { configConstants } from "../../redux/reducers/configReducer";
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useLoginStyles } from "./LoginStyle";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import { addUser, fetchUser } from "./LoginUtils";
export function Login() {
    const [error, setError] = React.useState<any>();
    const classes = useLoginStyles();
    const dispatch = useDispatch();
    const handleLogin = async (res: any) => {
        if (!res.profileObj) return setError({ error: "Failed to fetch Google user" });
        let user_config = await fetchUser(res.profileObj.googleId).catch((err) => console.log({ err }));
        if(!user_config) {
            const response = await addUser(res.profileObj.googleId, res.profileObj.email);
            if(!response.ok) return setError(response);
            user_config = await fetchUser(res.profileObj.googleId).catch((err) => console.log({ err }));
        }
        if(!user_config) return setError(res.profileObj);
    
        dispatch({ type: configConstants.SET_USER_CONFIG, payload: user_config });
        dispatch({ type: configConstants.SET_USER, payload: res.profileObj })
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3" className={classes.title}>
                Login
            </Typography>
            <GoogleLogin 
                className={classes.button}
                clientId={process.env.REACT_APP_GOOGLE_ID || ""}
                onSuccess={handleLogin}
                onFailure={(res: any) => console.log({res})}
                isSignedIn={true}
            />
            { error && 
                <div className={classes.error}>
                    <Typography variant="h4" className={classes.errorTitle}>
                        User doesn't exist!
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                            {Object.keys(error || {}).map((key) => (
                                <TableRow key={key}>
                                    <TableCell component="th" scope="row" children={key} />
                                    <TableCell align="left" children={error?.[key]} />
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                
            }
        </div>
    )
}