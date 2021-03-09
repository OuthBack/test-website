import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const Logout = () => {
    const tokenCookie = "token";
    const [cookies, setCookie, removeCookie] = useCookies([tokenCookie]);
    const loginURL = "https://test-website.vercel.app";

    const cookieRemover = () => {
        removeCookie(tokenCookie);
    };

    return (
        <Button size="small" onClick={cookieRemover}>
            <a href={loginURL + "/login"}>Logout</a>
        </Button>
    );
};

export default Logout;
