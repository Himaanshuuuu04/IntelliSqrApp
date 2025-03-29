import jwt from "jsonwebtoken";
import { Response } from "express";

interface GenerateTokenOptions {
    userId: string;
    res: Response;
}

const generateToken = ({ userId, res }: GenerateTokenOptions): string => {
    if (!userId || typeof userId !== "string") {
        throw new Error("Invalid userId. It must be a non-empty string.");
    }

    if (!res || typeof res.cookie !== "function") {
        throw new Error("Invalid Response object.");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: "5d",
    });

    res.cookie("jwt", token, {
        maxAge: 5 * 24 * 60 * 60 * 1000, // MS,
        httpOnly: true, // prevent XSS cross site scripting
        sameSite: "strict", // CSRF attack cross-site request forgery
        secure: process.env.NODE_ENV !== "development", // HTTPS
    });

    return token;
};

export default generateToken;

