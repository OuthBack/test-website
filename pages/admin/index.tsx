//@ts-nocheck

import { Typography, Container, Card } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Logout from "@components/Login/logout";
import { CookiesProvider } from "react-cookie";

export default function Admin() {
    const useStyles = makeStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
                    <Typography variant="h5" component="h2">
                        Welcome Admin
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        size="small"
                    >
                        <a href={"/admin/register"}>CREATE</a>
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
}
