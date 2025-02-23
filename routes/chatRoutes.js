import express from "express";
import {   getAllUsers, setAvatar } from "../controllers/chatController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router=express.Router();

// router.get("/getAvatars", getAvatars);
router.patch("/setAvatar",auth,setAvatar);
router.get("/getAllUsers",auth,getAllUsers);

export default router;