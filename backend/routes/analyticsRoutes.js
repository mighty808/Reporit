import express from "express";
import { SummaryAnalyticsController } from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/summary", SummaryAnalyticsController);

export default analyticsRouter;
