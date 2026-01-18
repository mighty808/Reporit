import express from "express";
import {
  RecentAlertsController,
  SummaryAlertsController,
} from "../controllers/alertsController.js";

const alertsRouter = express.Router();

alertsRouter.get("/recent", RecentAlertsController);
alertsRouter.get("/summary", SummaryAlertsController);

export default alertsRouter;
