import { NextApiRequest, NextApiResponse } from "next";
import connect from "utils/database";
import mongodb from "mongodb";

interface ErrorResponseType {
    error: string;
}

interface SucessResponseType {
    names: Array<string>;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<SucessResponseType | ErrorResponseType>
): Promise<void> => {
    if (req.method === "GET") {
        const { db } = await connect();
        const Users = await db
            .collection("users")
            .find({ username: { $exists: true } })
            .toArray();

        const users = (usersArray: Array<string>): Array<string> => {
            Users.forEach((element) => {
                usersArray.push(element.username);
            });
            return usersArray;
        };

        const names = users([]);

        if (!Users) {
            res.status(400).json({ error: "No Page Created" });
            return;
        }

        res.status(200).json({ names });
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
