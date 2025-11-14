import connectToDatabase from "../../../lib/mongodb";
import Enquiry from "../../../models/Enquiry";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, email, phone, service, message, recaptchaToken } = req.body;

    // ✅ reCAPTCHA verification
    if (!recaptchaToken) {
      return res
        .status(400)
        .json({ success: false, message: "reCAPTCHA token missing" });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${recaptchaToken}`,
      }
    );

    const recaptchaResult = await verifyResponse.json();

    if (!recaptchaResult.success) {
      console.error("⚠️ reCAPTCHA verification failed:", recaptchaResult);
      return res
        .status(400)
        .json({ success: false, message: "reCAPTCHA verification failed" });
    }

    // ✅ Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ✅ Save to MongoDB
    await connectToDatabase();
    const newEnquiry = new Enquiry({ name, email, phone, service, message });
    await newEnquiry.save();

    // ✅ Send Email Notification via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Relentron Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Enquiry from ${name}`,
      html: `
        <h2>📩 New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Enquiry email sent successfully!");

    // ✅ Respond success
    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully and email notification sent!",
    });
  } catch (error) {
    console.error("❌ Error in /api/enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
