import express from "express";
import connectDb from "./db/connectDB.js";
import { insertOne } from "./models/Transaction.js";

const app = express();

const port = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;
connectDb(MONGODB_URI);
// console.clear();
insertOne();

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
