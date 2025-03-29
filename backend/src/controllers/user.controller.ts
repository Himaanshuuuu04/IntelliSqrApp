import {Request,Response} from 'express';
import prisma from '../db/prisma.js';

export const getDetails = async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
  
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
        },
      });
  
      return res.status(200).json({ users: allUsers });
    } catch (error: any) {
      console.log("Error in getDetails controller", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteDetails = async (req: Request, res: Response): Promise<any> => {
    try {
      // Ensure the user is authenticated
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
  
      // Delete the user by their id
      const deletedUser = await prisma.user.delete({
        where: { id: req.user.id },
      });
  
      return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error: any) {
      console.log("Error in deleteDetails controller", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


  export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        // Ensure the user is authenticated
        console.log("req.user",req.user);
  
      return res.status(200).json({ message: "api hit successfully", user: req.user });
    } catch (error: any) {
      console.log("Error in getAllUsers controller", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  