import mongoose from "mongoose";
import "../models/FraudReport.js";

export async function ReportFraudController(req, res) {
  try {
    const { fraudNumber, details, reporterPhone } = req.body || {};

    const errors = [];
    if (!fraudNumber) errors.push("fraudNumber is required");
    if (!details) errors.push("details is required");
    if (errors.length) {
      return res.status(400).json({ ok: false, errors });
    }

    const FraudReport = mongoose.model("FraudReport");

    const doc = await FraudReport.create({
      fraudNumber: String(fraudNumber).trim(),
      details: String(details).trim(),
      reporterPhone: reporterPhone ? String(reporterPhone).trim() : undefined,
    });

    return res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}
