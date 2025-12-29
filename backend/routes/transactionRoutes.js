// This will hold the route for: POST /api/transaction/check
import express from "express";
import { CheckTransactionController } from "../controllers/checkTransactionController";

const transactionsRouter = express.Router();

transactionsRouter.post("/verify", CheckTransactionController);

export default transactionsRouter;
