//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import connect from "utils/database";
import jwt from "jsonwebtoken";
import cookie from "cookie";

interface ErrorResponseType {
    error: string;
}

interface SucessResponseType {
    token: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<SucessResponseType | ErrorResponseType>
): Promise<void> => {
    const { username, password } = req.body.auth;

    if (!username || !password) {
        res.status(400).json({ error: "Missing Name" });
        return;
    }

    if (req.method === "POST") {
        const { db } = await connect();
        const user = await db.collection("users").findOne({
            username: username,
        });

        const bcrypt = require("bcrypt");

        await bcrypt.compare(
            password,
            user.password,
            function (err: any, result: boolean) {
                if (result) {
                    const token = jwt.sign(
                        {
                            username,
                            admin: username === "admin",
                        },
                        process.env.SECRET
                    );

                    res.setHeader(
                        "Set-Cookie",
                        cookie.serialize("token", token, {
                            sameSite: "strict",
                            path: "/",
                        })
                    );
                    res.status(200).json({
                        token: token,
                    });
                } else if (!result) {
                    res.status(400).json({
                        error: "Incorrect username or password",
                    });
                } else {
                    res.status(400).json({
                        error: "Hash Error",
                    });
                }
            }
        );
    } else {
        res.status(400).json({ error: "Not POST Method" });
    }
};
