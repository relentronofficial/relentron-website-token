import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Enquiry from "../../../models/Enquiry";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, service, message, recaptchaToken } =
      await request.json();

    // 🧠 1. reCAPTCHA verification
    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA token missing" },
        { status: 400 }
      );
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(
          recaptchaToken
        )}`,
      }
    );

    const recaptchaResult = await verifyResponse.json();

    if (!recaptchaResult.success) {
      console.error("❌ reCAPTCHA verification failed:", recaptchaResult);
      return NextResponse.json(
        { success: false, message: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // 🧾 2. Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 💾 3. Save enquiry to MongoDB
    await connectToDatabase();
    const newEnquiry = new Enquiry({ name, email, phone, service, message });
    await newEnquiry.save();

    // 💌 4. Send Email Notification via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use Outlook, Yahoo, etc.
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
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

    // ✅ 5. Success response
    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully and email sent!",
    });
  } catch (error) {
    console.error("💥 Error in /api/enquiry:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
