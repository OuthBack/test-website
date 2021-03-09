import { NextApiRequest, NextApiResponse } from "next";
import connect from "utils/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";

interface ErrorResponseType {
    error: string;
}

interface SucessResponseType {
    message: string;
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
        const saltRounds: number = 10;

        const userExists = await db.collection("users").findOne({
            username: username,
        });

        if (userExists) {
            res.status(200).json({ message: "User Already Registred" });
            return;
        }
        await bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
            bcrypt.hash(password, salt, function (err: any, hash: any) {
                const user = db.collection("users").insertOne({
                    username: username,
                    password: hash,
                });
                res.status(200).json({ message: "User Registred with Sucess" });
            });
        });
        return;
    } else {
        res.status(400).json({ error: "Not POST Method" });
        return;
    }

    res.status(400).json({
        error: "Hash Error",
    });
    return;
};
