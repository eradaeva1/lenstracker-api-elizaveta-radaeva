import express from "express";
import { register, login } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

export default router;