import express from "express";
import env from "dotenv";
import dbConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";


env.config();
const app = express();
const allowedOrigins = ["http://localhost:5173"]

import { createServer } from "http";
import { Server } from "socket.io";

const server = new createServer(app);
const io = new Server(server, {
    // pingTimeout: 60000,// automaticallly turnoff after 60s when not in use
    cors: {
        origin: allowedOrigins,
        credentials: true,
    }
});
io.on("connection", (socket) => {
    console.log("user(socket) connected to io");
    // console.log(socket.id);

    socket.on("setup", (user) => {
        console.log("user joined to its personal room ", user._id);
        socket.join(user._id);
        socket.emit("connected");

    })

    // socket.on("join-chat", (room) => {
    //     socket.join(room);
    //     console.log("user joined room of reciver chat", room);
    // });

    socket.on("typing", (data) => {
        
        // console.log("started");
        socket.to(data.currentChat._id).emit("typing", data.currentUser._id);
    }
    );
    socket.on("stop-typing", (data) => {
        // console.log("stopped");
        socket.to(data.currentChat._id).emit("stop-typing", data.currentUser._id);
    }
    );

    socket.on("send-msg", (data) => {
        // console.log(data);
        // console.log(`📤 Sending message from ${data.from} to ${data.to}:`, data);
        socket.to(data.to).emit("msg-recieve", data);


    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
})

const PORT = process.env.PORT;

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/chatApp', chatRoutes);
app.use('/api/messages', messageRoutes);




dbConnect().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Database connection failed:", err);
});

