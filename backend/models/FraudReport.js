import mongoose from "mongoose";

const fraudReportSchema = new mongoose.Schema(
  {
    fraudNumber: { type: String, required: true },
    details: { type: String, required: true },
    reporterPhone: { type: String },
  },
  { timestamps: true },
);

mongoose.model("FraudReport", fraudReportSchema);
