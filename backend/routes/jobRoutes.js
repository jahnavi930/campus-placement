import express from "express";
import Job from "../models/Job.js";
const router = express.Router();
import protect from "../middleware/autmiddleware.js";
import { isadmin } from "../middleware/autmiddleware.js";

// Create a new job
router.post("/create", protect, async (req, res) => {
    try{
        if(req.user.role!=="recruiter"){
            return res.status(403).json({message:"Only recruiters can create jobs"});
        }
        const {title,company,location,description}=req.body;
        const job=await Job.create({
            title,
            company,
            location,
            description,
            postedBy:req.user.id
        });
        res.status(201).json({
            message:"Job created successfully",
            job
        });
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

// Get all jobs
router.get("/", async (req, res) => {
    try{
        const jobs=await Job.find().populate("postedBy","name email");
        res.json(jobs);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});
router.post("/apply/:id", protect, async (req, res) => { 
    try {
        if(req.user.role!=="student"){
            return res.status(403).json({message:"Only students can apply for jobs"});
        }
        const application=await Application.create({
            student:req.user.id,
            job:req.params.id
        });
        res.status(201).json({
            message:"Applied successfully",
            application
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});
router.get("/my-applications", protect, async (req, res) => {
    try {
        const applications=await Application.find({student:req.user.id}).populate("job");
        res.json(applications);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});
export default router;