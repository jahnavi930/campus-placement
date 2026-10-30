import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import protect from "../middleware/autmiddleware.js";

const router = express.Router();


// =========================================================
// STUDENT APPLY
// POST /api/applications/apply/:id
// =========================================================

router.post("/apply/:id", protect, async (req, res) => {
  try {
    console.log("🔥 APPLY ROUTE CALLED");
    console.log("USER:", req.user);
    console.log("JOB ID:", req.params.id);

    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can apply for jobs"
      });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    const alreadyApplied = await Application.findOne({
      student: req.user.id,
      job: job._id
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already applied for this job"
      });
    }

    // IMPORTANT:
    // Application model uses "applied", NOT "pending"
    const application = await Application.create({
      student: req.user.id,
      job: job._id,
      status: "applied"
    });

    console.log("🔥 APPLICATION CREATED:", application);

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    console.log("🔥 APPLY ERROR:", error);

    res.status(500).json({
      message: "Unable to apply for job",
      error: error.message
    });
  }
});


// =========================================================
// STUDENT APPLICATIONS
// GET /api/applications/my
// =========================================================

router.get("/my", protect, async (req, res) => {
  try {

    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can view their applications"
      });
    }

    const applications = await Application.find({
      student: req.user.id
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);

  } catch (error) {
    console.log("🔥 GET MY APPLICATIONS ERROR:", error);

    res.status(500).json({
      message: "Unable to get applications",
      error: error.message
    });
  }
});


// =========================================================
// RECRUITER APPLICATIONS
// GET /api/applications/recruiter
// =========================================================

router.get("/recruiter", protect, async (req, res) => {
  try {

    console.log("🔥 RECRUITER APPLICATIONS CALLED");

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can view applications"
      });
    }

    const recruiterJobs = await Job.find({
      postedBy: req.user.id
    }).select("_id");

    const jobIds = recruiterJobs.map(
      (job) => job._id
    );

    const applications = await Application.find({
      job: { $in: jobIds }
    })
      .populate("student", "-password")
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);

  } catch (error) {

    console.log("🔥 RECRUITER APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Unable to get recruiter applications",
      error: error.message
    });
  }
});


// =========================================================
// RECRUITER UPDATE STATUS
// PUT /api/applications/status/:id
// =========================================================

router.put("/status/:id", protect, async (req, res) => {
  try {

    console.log("🔥 UPDATE STATUS CALLED");

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can update application status"
      });
    }

    const { status } = req.body;

    const allowedStatuses = [
      "applied",
      "shortlisted",
      "selected",
      "rejected"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status"
      });
    }

    const application = await Application.findById(
      req.params.id
    ).populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    if (
      !application.job ||
      application.job.postedBy.toString() !==
        req.user.id.toString()
    ) {
      return res.status(403).json({
        message: "You cannot update this application"
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application
    });

  } catch (error) {

    console.log("🔥 UPDATE STATUS ERROR:", error);

    res.status(500).json({
      message: "Unable to update application status",
      error: error.message
    });
  }
});


// =========================================================
// RECRUITER STATISTICS
// GET /api/applications/recruiter/stats
// =========================================================

router.get("/recruiter/stats", protect, async (req, res) => {
  try {

    console.log("🔥 RECRUITER STATS CALLED");

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can view application statistics"
      });
    }

    const recruiterJobs = await Job.find({
      postedBy: req.user.id
    }).select("_id");

    const jobIds = recruiterJobs.map(
      (job) => job._id
    );

    const total = await Application.countDocuments({
      job: { $in: jobIds }
    });

    // "applied" is displayed as Pending in the recruiter UI
    const pending = await Application.countDocuments({
      job: { $in: jobIds },
      status: "applied"
    });

    const shortlisted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "shortlisted"
    });

    const selected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "selected"
    });

    const rejected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "rejected"
    });

    res.status(200).json({
      total,
      pending,
      shortlisted,
      selected,
      rejected
    });

  } catch (error) {

    console.log("❌ RECRUITER STATS ERROR:", error);

    res.status(500).json({
      message: "Unable to get application statistics",
      error: error.message
    });
  }
});


export default router;
