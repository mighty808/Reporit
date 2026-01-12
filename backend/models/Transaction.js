import express from "express";
import mongoose from "mongoose";

// Define Schema
const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    recipientName: { type: Number, required: true },
    recipientPhoneNumber: { type: Number, required: true },
    amount: { type: Number, required: true }
})

// Creating Models / Collections
const TransactionModel = mongoose.model("Transaction", transactionSchema);

// Getting all 
const allDocs = async () => {
  const results = await TransactionModel.find();
  console.log(results)
}



export { allDocs }