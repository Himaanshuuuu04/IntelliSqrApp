import express from "express";
import { login, register,signin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login); 
router.post("/signin", signin);  

export default router;