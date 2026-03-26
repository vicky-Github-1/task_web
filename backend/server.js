import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import errorMiddleware from "./middleware/errorMiddleware.js";
dotenv.config();

const app=express();
app.use(cors());
connectDB();
app.use(express.json());

// API VERSIONING
app.use("/api/v1/auth", (await import("./routes/authRoutes.js")).default);
app.use("/api/v1/tasks", (await import("./routes/taskRoutes.js")).default);

// ERROR HANDLER MIDDLEWARE
app.use(errorMiddleware);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})