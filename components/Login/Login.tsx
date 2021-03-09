import React from "react";
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
import { Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },

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
    form: {},
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props: any) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.root}>
                <CardContent>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={props.username.username}
                        onChange={(e) =>
                            props.username.setUsername(e.target.value)
                        }
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={props.password.password}
                        onChange={(e) =>
                            props.password.setPassword(e.target.value)
                        }
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={props.enterLogin}
                    >
                        Login
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}
