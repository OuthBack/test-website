import { Typography, Container, Card } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SimpleSnackbar from "@components/Layout/Snackbar";

const Name = () => {
    type Message = string | string[] | undefined;
    const router = useRouter();
    const [message, setMessage] = useState<Message>("");
    const [shortLink, setShortLink] = useState<string>("");
    const [url, setUrl] = useState("");
    const [copy, setCopy] = useState<boolean>(false);
    const [info, setInfo] = useState({
        message: "",
        severity: "",
        trigger: "",
    });

    const domainUriPrefix = "https://testnextjs.page.link";
    const link = "https://test-website.vercel.app/";

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
                    link: window.location.href,
                    androidInfo: {
                        androidPackageName: "com.testnextjs.android",
                    },
                    iosInfo: {
                        iosBundleId: "com.testnextjs.ios",
                    },
                },
            },
        }).then((response: any) => {
            setUrl(response.data.shortLink);
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
                    <Typography variant="h3" component="h2">
                        {message}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={share}>
                        SHARE
                    </Button>
                    {url && (
                        <>
                            <TextField color="primary" value={url} />
                            <CopyToClipboard
                                text={url}
                                onCopy={() => {
                                    setCopy(true);
                                    setInfo((previousState: any) => {
                                        return {
                                            ...previousState,
                                            message: "Copied to the Clipboard",
                                            severity: "success",
                                            trigger: true,
                                        };
                                    });
                                }}
                            >
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    <FileCopyIcon />
                                </Button>
                            </CopyToClipboard>
                            <SimpleSnackbar SetInfo={setInfo} Info={info} />
                        </>
                    )}
                </CardActions>
            </Card>
        </Container>
    );
};

export default Name;
