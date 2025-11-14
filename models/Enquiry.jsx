// models/Enquiry.jsx
import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite during hot reload in Next.js
export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
