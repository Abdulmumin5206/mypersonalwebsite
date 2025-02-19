require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Your email (from Render environment)
        pass: process.env.EMAIL_PASS,  // App password (from Render environment)
    },
});

app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,  // Send to your own email
            subject: `New Message from ${name}`,
            text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send email", error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
