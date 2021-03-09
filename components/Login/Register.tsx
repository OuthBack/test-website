//@ts-ignore
import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SimpleSnackbar from "@components/Layout/Snackbar";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function UserRegister() {
    const [username, setUsername] = useState<string>("");
    const [info, setInfo] = useState({
        message: "",
        severity: "",
        trigger: "",
    });
    const [url, setUrl] = useState<string>("");

    const register = async (): Promise<void> => {
        const axios = require("axios");
        axios({
            method: "POST",
            url: "../api/auth/register",
            data: {
                username: username.toLocaleLowerCase(),
            },
        })
            .then((response: any) => {
                const created = "Page Already Created";
                const success = "Created with Sucess";

                if (response.data.message == created) {
                    setInfo((previousState: any) => {
                        return {
                            ...previousState,
                            message: created,
                            severity: "error",
                            trigger: true,
                        };
                    });
                } else if (response.data.message == success) {
                    setInfo((previousState: any) => {
                        return {
                            ...previousState,
                            message: success,
                            severity: "success",
                            trigger: true,
                        };
                    });
                } else {
                    setInfo((previousState: any) => {
                        return {
                            ...previousState,
                            message: response.error,
                            severity: "error",
                            trigger: true,
                        };
                    });
                }
            })
            .catch((error: any) => {
                setInfo((previousState: any) => {
                    return {
                        ...previousState,
                        message: "Error " + error.response.data.error,
                        severity: "error",
                        trigger: true,
                    };
                });
            });
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography
                    style={{ textAlign: "center" }}
                    component="h1"
                    variant="h5"
                >
                    Create
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label=""
                                name="username"
                                autoComplete="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        spacing={4}
                    >
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                type="button"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={register}
                            >
                                Create
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Button
                                fullWidth
                                type="button"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={username ? false : true}
                                href={"../" + username.toLocaleLowerCase()}
                            >
                                Go to the Page
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <SimpleSnackbar SetInfo={setInfo} Info={info} />
        </Container>
    );
}
