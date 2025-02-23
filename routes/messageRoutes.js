import express from "express";
import { addMsg, getMsgs } from "../controllers/messageController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/addMsg",auth,addMsg);
router.post("/getMsgs",auth,getMsgs);

export default router;