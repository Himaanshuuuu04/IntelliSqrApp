import express from "express";
import { getDetails, deleteDetails ,getAllUsers} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const router = express.Router();

router.get("/details",protectRoute, getDetails);
router.delete("/remove-details",protectRoute, deleteDetails); 
router.post("/testing",getAllUsers);

export default router;