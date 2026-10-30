import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";
console.log("🔥 Userroutes.js loaded");
import userRoutes from "./routes/Userroutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import connectDB from "./config/db.js";
import ContactRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("CampusConnect Backend is running!");
});
app.use("/api/users", userRoutes);
app.use("/api/contact", ContactRoutes);

app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});