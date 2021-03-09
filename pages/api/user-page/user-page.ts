import { NextApiRequest, NextApiResponse } from "next";
import connect from "utils/database";
import jwt from "jsonwebtoken";

interface ErrorResponseType {
    error: string;
}

interface SucessResponseType {
    message: string | null;
    user: boolean;
}

type Message = string | string[] | undefined;

function capitalizeFirstLetter(string: Message) {
    if (typeof string == "string")
        return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<SucessResponseType | ErrorResponseType>
): Promise<void> => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: "Missing Name" });
        return;
    }

    if (req.method === "POST") {
        const { db } = await connect();

        const userExists = await db.collection("users").findOne({
            username: name,
        });

        if (userExists) {
            res.status(200).json({
                user: true,
                message: `This page is for ${capitalizeFirstLetter(name)}`,
            });
            return;
        } else {
            res.status(200).json({ message: null, user: false });
        }

        return;
    } else {
        res.status(400).json({ error: "Not POST Method" });
        return;
    }
};
