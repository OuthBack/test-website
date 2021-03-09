//@ts-nocheck
import { Typography, Container, Card } from "@material-ui/core";
import React, { useState, useEffect, createContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Logout from "@components/Login/logout";
import { CookiesProvider } from "react-cookie";
import UserRegister from "@components/Login/Register";

export const Info = createContext();
export const SetInfo = createContext();

export default function Register() {
    const [info, setInfo] = useState({
        message: "",
        severity: "",
        trigger: "",
    });

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: "inline-block",
            margin: "0 2px",
            transform: "scale(0.8)",
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

    const classes = useStyles();

    return (
        <Container>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                        color="primary"
                        style={{ textAlign: "center" }}
                        variant="h5"
                        component="h2"
                    >
                        Welcome to Create Pages Admin
                    </Typography>
                    <br />
                    <UserRegister setInfo={setInfo} Info={Info} />
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" variant="contained">
                        <a href="./">Admin</a>
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
}
