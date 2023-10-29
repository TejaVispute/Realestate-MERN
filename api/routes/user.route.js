import express from 'express';
import { updateUser, userController } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get("/test", userController);
router.post("/update/:id", verifyToken, updateUser)

export default router