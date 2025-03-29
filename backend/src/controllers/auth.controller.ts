import {Request,Response} from 'express';
import prisma from '../db/prisma.js';
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";

export const register = async (req: Request, res: Response): Promise<any> => {  
    try {
    const { email, password }: { email: string; password: string } = req.body;
    if ( !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Check if user already exists
    const userExists = await prisma.user.findUnique({
        where: { 
            email: email,
        },
    });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
        },
    });
    if (newUser) {
        // generate token in a sec
        const argument = {
            userId: newUser.id,
            res: res
        };
        generateToken(argument);

        res.status(201).json({
            id: newUser.id,
            email: newUser.email,
            message: "User created successfully",
        });
    } else {
        res.status(400).json({ error: "Invalid user data" });
    }
   
}catch (error) {
    console.log("Error in register controller",error);
    return res.status(500).json({ message: "Internal server error" });
};
}



export const login = async (req:Request,res:Response) => {

}

export const signin = async (req:Request,res:Response) => {

}