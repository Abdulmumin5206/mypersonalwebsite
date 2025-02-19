require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for frontend requests
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// ✅ Route to handle form submission
app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        // ✅ Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // You can change this based on your email provider
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        // ✅ Email options
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER, // Your email to receive messages
            subject: "New Contact Form Submission",
            text: `You have a new message from ${name} (${email}):\n\n${message}`,
        };

        // ✅ Send email
        await transporter.sendMail(mailOptions);

        console.log("✅ Email sent successfully!");
        res.status(200).json({ success: "Message sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
