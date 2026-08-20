import express from "express";
import cors from "cors";
import path from 'path';
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import postRoutes from "./routes/post.route.js";
import eventRoutes from "./routes/event.route.js";
import jobRoutes from "./routes/job.route.js";
import resourceRoutes from "./routes/resource.route.js";
import userRoutes from "./routes/user.route.js";
import relationshipRoutes from "./routes/relationship.route.js";
import notificationRoutes from "./routes/notification.route.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/connect", relationshipRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/resources", resourceRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});


