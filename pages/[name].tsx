import { Typography, Container, Card } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const Name = () => {
    type Message = string | string[] | undefined;

    const router = useRouter();

    const [message, setMessage] = useState<Message>("");
    //const [name, setName] = useState<string>("");

    const register = async (name: Message): Promise<void> => {
        const axios = require("axios");
        axios({
            method: "POST",
            url: "./api/user-page/user-page",
            data: {
                name: name,
            },
        }).then((response: any) => {
            const user = response.data.user;
            if (user) {
                setMessage(response.data.message);
            } else if (!user) router.push("./404");
        });
    };

    useEffect(() => {
        if (router.asPath !== router.route) {
            const { name } = router.query;
            register(name);
        }
    }, [router]);

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
                    <Typography variant="h5" component="h2">
                        {message}
                    </Typography>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

export default Name;
