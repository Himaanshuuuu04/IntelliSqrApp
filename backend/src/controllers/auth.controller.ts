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



export const login = async (req: Request, res: Response) :Promise<any> => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Generate JWT token and set it in the cookie
        const argument = {
            userId: user.id,
            res: res
        };
        generateToken(argument);

		res.status(200).json({
			id: user.id,
			email: user.email,
            message: "Login successful",
		});
	} catch (error: any) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export const logout = async (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error: any) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getMe = async (req: Request, res: Response) :Promise<any> => {
    try {
        // Ensure req.user is defined and has an id
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const user = await prisma.user.findUnique({ where: { id: req.user.id } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            message: "User retrieved successfully",
        });
    } catch (error: any) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};