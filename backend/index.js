import express from "express";
import connectDb from "./db/connectDB.js";
import transactionModel from "./models/Transaction.js";

const app = express();

const port = process.env.PORT || 8000;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/transactions";
connectDb(DATABASE_URL);

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
