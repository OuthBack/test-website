import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AllPagesContext from "pages/_app";

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

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Welcome
                    </Typography>
                    <Button color="inherit">
                        <a href={process.env.SITE_URL + "/login"}>Login</a>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
