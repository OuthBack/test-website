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
    const [shortLink, setShortLink] = useState<string>("");

    const domainUriPrefix = "https://testnextjs.page.link";
    const link = "https://test-website.vercel.app/user";

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

    const share = async (): Promise<void> => {
        const axios = require("axios");
        axios({
            method: "POST",
            url:
                "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=" +
                "AIzaSyAEw1Pw7bgC6XJTWHj3QvxJSZFPPKZT7aY",
            data: {
                dynamicLinkInfo: {
                    domainUriPrefix: domainUriPrefix,
                    link: link,
                    androidInfo: {
                        androidPackageName: "com.testnextjs.android",
                    },
                    iosInfo: {
                        iosBundleId: "com.testnextjs.ios",
                    },
                },
            },
        }).then((response: any) => {
            setShortLink(response.data.shortLink);
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
                <CardActions>
                    <Button href={shortLink} onClick={share}>
                        SHARE
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default Name;
