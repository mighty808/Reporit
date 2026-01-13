import express from "express";
import mongoose from "mongoose";

// Define Schema
const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientPhoneNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  
});

// Creating Models / Collections
const TransactionModel = mongoose.model("Transaction", transactionSchema);

// Getting all
/*
  const allDocs = async () => {
  const results = await TransactionModel.find();
  console.log(results);
};
*/

/*
const insertOne = async () => {
  const doc = new TransactionModel({
    transactionId: "53479513587",
    recipientName: "Mark Atta",
    recipientPhoneNumber: "0206874512",
    amount: 2200,
  });

  const result = await doc.save();
  console.log("Inserted:", result);
};
*/

// export { allDocs };
