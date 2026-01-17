import express from "express";
import connectDb from "./db/connectDB.js";
import transactionsRouter from "./routes/transactionRoutes.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;
connectDb(MONGODB_URI);
// console.clear();

// Mount API routes
app.use("/api/transactions", transactionsRouter);

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
