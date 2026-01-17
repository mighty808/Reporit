import mongoose from "mongoose";

// Define Schema
const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientPhoneNumber: { type: String, required: true },
  amount: { type: Number, required: true },
});

// Register model (accessible via mongoose.model("Transaction"))
mongoose.model("Transaction", transactionSchema);

// Note: use mongoose.model("Transaction") where needed; no direct exports here.

// Example insert (for reference):
// const Transaction = mongoose.model("Transaction");
// await Transaction.create({ transactionId, recipientName, recipientPhoneNumber, amount });
