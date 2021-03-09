import Login from "@components/Login";
import axiosApi from "@api/api";
import { useState, useContext } from "react";
import AllPagesContext from "./_app";
import { debug } from "node:console";
import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import adminApi from "./admin";

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const login = async (): Promise<void> => {
        const axios = require("axios");
        axios({
            method: "POST",
            url: "./api/auth/login",
            data: {
                auth: {
                    username: username.toLocaleLowerCase(),
                    password: password,
                },
            },
        }).then((response: any) => {
            if (response.status === 200) router.push("./admin");
        });
    };

    return (
        <>
            {message}
            <Login
                username={{
                    username: username,
                    setUsername: setUsername,
                }}
                password={{ password: password, setPassword: setPassword }}
                enterLogin={login}
            />
        </>
    );
}
