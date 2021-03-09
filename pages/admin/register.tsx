import isLoggedAsAdmin from "@api/islogged";
import { Typography, Container, Card } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Logout from "@components/Login/logout";
import { CookiesProvider } from "react-cookie";
import UserRegister from "@components/Login/Register";

export default function Register() {
    const [admin, setAdmin] = useState<boolean>(false);

    useEffect(() => {
        if (isLoggedAsAdmin) setAdmin(true);
    }, []);

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
            {admin && (
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Welcome to Register Admin
                        </Typography>
                        <UserRegister />
                    </CardContent>
                    <CardActions>
                        <Button size="small">
                            <a href="/register">Register Accounts</a>
                        </Button>
                        <CookiesProvider>
                            <Logout />
                        </CookiesProvider>
                    </CardActions>
                </Card>
            )}
            {!admin && (
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Not Logged
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <CookiesProvider>
                            <Logout />
                        </CookiesProvider>
                    </CardActions>
                </Card>
            )}
        </Container>
    );
}