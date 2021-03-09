import React, { useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import { TransitionProps } from "@material-ui/core/transitions";

export default function SimpleSnackbar(props: any) {
    const [state, setState] = React.useState<{
        open: boolean;
        Transition: React.ComponentType<
            TransitionProps & { children?: React.ReactElement<any, any> }
        >;
    }>({
        open: false,
        Transition: Fade,
    });

    const { message, severity, trigger } = props.Info;

    useEffect(() => {
        if (trigger)
            setState((previousState: any) => {
                return {
                    ...previousState,
                    open: true,
                    Fade,
                };
            });
    }, [trigger]);

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
        props.SetInfo((previousState: any) => {
            return { ...previousState, trigger: false };
        });
    };

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                autoHideDuration={6000}
            >
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
