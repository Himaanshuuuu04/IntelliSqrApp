import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import { BadRequestError, UnauthorizedError, NotFoundError } from '../utils/AppError.js';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      return next(new BadRequestError('Please fill all the fields'));
    }

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return next(new BadRequestError('User already exists'));
    }

    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    if (!newUser) {
      return next(new BadRequestError('Invalid user data'));
    }

    const argument = { userId: newUser.id, res };
    generateToken(argument);

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      message: 'User created successfully',
    });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return next(new UnauthorizedError('Invalid credentials'));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(new UnauthorizedError('Invalid credentials'));
    }

    const argument = { userId: user.id, res };
    generateToken(argument);

    res.status(200).json({
      id: user.id,
      email: user.email,
      message: 'Login successful',
    });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      return next(new UnauthorizedError('Unauthorized access'));
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};