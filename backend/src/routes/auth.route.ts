import express from "express";
import { getMe, login, logout, register, } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login); 
router.post("/me",protectRoute, getMe);  
router.post("/logout",logout);

export default router;