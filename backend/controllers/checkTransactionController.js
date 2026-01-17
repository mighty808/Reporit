import mongoose from "mongoose";
import "../models/Transaction.js";

export async function CheckTransactionController(req, res) {
  try {
    const { senderPhone, recipientPhone, amount, transactionType } =
      req.body || {};

    const errors = [];
    if (!senderPhone) errors.push("senderPhone is required");
    if (!recipientPhone) errors.push("recipientPhone is required");
    const amtNum = Number(amount);
    if (amount === undefined || amount === null || Number.isNaN(amtNum)) {
      errors.push("amount must be a number");
    } else if (amtNum <= 0) {
      errors.push("amount must be greater than 0");
    }
    if (!transactionType) errors.push("transactionType is required");
    if (errors.length) {
      return res.status(400).json({ ok: false, errors });
    }

    const Transaction = mongoose.model("Transaction");

    const normalizedRecipient = String(recipientPhone).trim();
    const normalizedSender = String(senderPhone).trim();
    const amt = amtNum;

    const recipientCount = await Transaction.countDocuments({
      recipientPhoneNumber: normalizedRecipient,
    });

    let riskScore = 0;
    const reasons = [];

    if (recipientCount > 0) {
      riskScore += Math.min(60, recipientCount * 15);
      reasons.push("Recipient appears in prior transactions");
    }

    if (amt >= 1000) {
      riskScore += 20;
      reasons.push("High transfer amount");
    }

    if (!["mobile_money", "bank_transfer"].includes(String(transactionType))) {
      riskScore += 10;
      reasons.push("Unknown transaction type");
    }

    riskScore = Math.max(0, Math.min(99, riskScore));

    return res.json({ ok: riskScore < 50, riskScore, reasons });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}
