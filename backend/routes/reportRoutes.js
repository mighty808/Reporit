import express from "express";
import { ReportFraudController } from "../controllers/reportFraudController.js";

const reportRouter = express.Router();

reportRouter.post("/submit", ReportFraudController);

export default reportRouter;
