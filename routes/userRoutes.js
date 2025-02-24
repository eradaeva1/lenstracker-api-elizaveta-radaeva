import express from "express";
import { register, login } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get('/current', authMiddleware, async (req, res, next)=>{
    try {
    const { email, username, phone, id  } = req.user;
    res.json({
    email,
    phone,
    username,
    id
    })
    }
    catch(error) {
    next(error);
    }
   })

export default router;