import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import protect from "../middleware/autmiddleware.js";
import { isadmin } from "../middleware/autmiddleware.js";

const router = express.Router();

console.log("🔥 USER ROUTES FILE LOADED");


// ================= REGISTER =================

router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const {
      name,
      email,
      password,
      branch,
      year,
      role
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      branch,
      year,
      role: role || "student"
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
});


// ================= LOGIN =================

router.post("/login", async (req, res) => {
  try {
    console.log("🔥 LOGIN CALLED");

    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.trim()
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "secretkey",
      {
        expiresIn: "1d"
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
});


// ================= GET PROFILE =================

router.get("/profile", protect, async (req, res) => {
  try {
    console.log("🔥 GET PROFILE CALLED");

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user
    });

  } catch (error) {
    console.log("🔥 GET PROFILE ERROR:", error);

    res.status(500).json({
      message: "Unable to get profile",
      error: error.message
    });
  }
});


// ================= UPDATE PROFILE =================

router.put("/profile", protect, async (req, res) => {
  try {
    console.log("🔥 UPDATE PROFILE CALLED");
    console.log("PROFILE BODY:", req.body);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name.trim();
    }

    if (req.body.branch !== undefined) {
      user.branch = req.body.branch;
    }

    if (req.body.year !== undefined) {
      user.year = req.body.year;
    }

    if (req.body.ssc !== undefined) {
      user.ssc = req.body.ssc;
    }

    if (req.body.inter !== undefined) {
      user.inter = req.body.inter;
    }

    if (req.body.btech !== undefined) {
      user.btech = req.body.btech;
    }

    if (req.body.skills !== undefined) {
      user.skills = req.body.skills;
    }

    if (req.body.projects !== undefined) {
      user.projects = req.body.projects;
    }

    await user.save();

    const updatedUser = await User.findById(
      req.user.id
    ).select("-password");

    console.log("🔥 PROFILE SAVED TO MONGODB");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log("🔥 UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      message: "Profile update failed",
      error: error.message
    });
  }
});


export default router;
