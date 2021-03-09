//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

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
    const token = req.cookies.token!;

    if (!token) {
        res.status(400).json({ error: "Missing Token" });
        return;
    }

    if (req.method === "GET") {
        try {
            const { admin } = jwt.verify(token, process.env.SECRET) as {
                [key: string]: boolean;
            };

            if (admin) {
                res.status(200).json({ message: "Admin Logged In" });
                return;
            } else {
                res.status(200).json({ message: "User Logged In" });
                return;
            }
        } catch (error) {
            res.status(400).json({ error: error });
            return;
        }
    } else {
        res.status(400).json({ error: "Not a GET Method" });
        return;
    }
};
