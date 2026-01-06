import express from "express";
import mongoose from "mongoose";

// Define Schema
const transactionSchema = new mongoose.Schema({
    senderNumber: { type: Number, required: true },
    receiverNumber: { type: Number, required: true },
    name: { type: String, required: true },

    money: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    validate: {
      validator: function (v) {
        // Convert Decimal128 to number for comparison
        return parseFloat(v.toString()) >= 10;
      },
    }
  }
})

