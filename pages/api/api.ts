import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import connect from "utils/database";

// Pode ser algum servidor executando localmente:
// http://localhost:3000

const api = axios.create({
    baseURL: process.env.SITE_URL,
});

interface ErrorResponseType {
    error: string;
}

interface SucessResponseType {
    _id: string;
    name: string;
    age: number;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<SucessResponseType | ErrorResponseType>
): Promise<void> => {
    const { name, age } = req.body;

    if (!name || !age) {
        res.status(400).json({ error: "Missing Name" });
        return;
    }

    if (req.method === "POST") {
        const { db } = await connect();
        const response = await db.collection("users").insertOne({
            name,
            age,
        });

        res.status(200).json(response.ops[0]);
    } else {
        res.status(400).json({ error: name });
    }
};
