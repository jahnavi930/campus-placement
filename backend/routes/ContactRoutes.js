
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New CampusConnect Contact Message",
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    console.log("✅ CONTACT EMAIL SENT");

    res.json({
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log("❌ CONTACT EMAIL ERROR:", error);

    res.status(500).json({
      message: "Failed to send email",
    });
  }
});

export default router;