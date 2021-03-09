import { NextApiRequest, NextApiResponse } from "next";
import connect from "utils/database";

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
    const { username } = req.body;

    if (!username) {
        res.status(400).json({ error: "Missing Name" });
        return;
    }

    if (req.method === "POST") {
        const { db } = await connect();
        const userExists = await db.collection("users").findOne({
            username: username,
        });

        if (userExists) {
            res.status(200).json({ message: "Page Already Created" });
            return;
        } else {
            const user = db.collection("users").insertOne({
                username: username,
            });

            res.status(200).json({ message: "Created with Sucess" });
        }

        return;
    } else {
        res.status(400).json({ error: "Not POST Method" });
        return;
    }

    res.status(400).json({
        error: "Error",
    });
    return;
};
