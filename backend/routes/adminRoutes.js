import express from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
const router = express.Router();
import protect from "../middleware/autmiddleware.js";
import { isadmin } from "../middleware/autmiddleware.js";
 router.get("/dashboard", protect, isadmin, async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalRecruiters = await User.countDocuments({ role: "recruiter" });
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        res.json({
            totalStudents,
            totalRecruiters,
            totalJobs,
            totalApplications
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/students", protect, isadmin, async (req, res) => {
    const students=await User.find({role:"student"});
    res.json(students);
});
router.get("/recruiters", protect, isadmin, async (req, res) => {
    const recruiters=await User.find({role:"recruiter"});
    res.json(recruiters);
});
router.get("/applications", protect, isadmin, async (req, res) => {
    const apps=await Application.find().populate("student","name email").populate("job","title company");
    res.json(apps);
});
router.get("/jobs", protect, isadmin, async (req, res) => {
    const jobs=await Job.find().populate("postedBy","name email");
    res.json(jobs);
});
router.delete("/user/:id", protect, isadmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({message:"User deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete("/job/:id", protect, isadmin, async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({message:"Job deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;  