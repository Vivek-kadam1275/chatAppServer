import express from "express";
import env from "dotenv";
import dbConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

env.config();
const app=express();
const PORT=process.env.PORT;

const allowedOrigins=["http://localhost:5173"]
app.use(cors({
    origin:allowedOrigins,
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/chatApp',chatRoutes);
app.use('/api/messages',messageRoutes);



dbConnect();
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
