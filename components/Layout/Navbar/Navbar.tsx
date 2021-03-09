import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AllPagesContext from "pages/_app";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

const Navbar: React.FC = () => {
    const classes = useStyles();
    const [url, setUrl] = useState("initialState");

    useEffect(() => {
        setUrl(window.location.origin);
    }, []);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid container direction="row" justify="space-between">
                        <Typography variant="h5">Welcome</Typography>
                        <Button color="inherit">
                            <a href={url + "/register"}>Create</a>
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
