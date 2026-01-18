import mongoose from "mongoose";
import "../models/FraudReport.js";

function severityFromCount(n) {
  if (n >= 5) return "critical";
  if (n >= 3) return "high";
  if (n >= 2) return "medium";
  return "low";
}

export async function RecentAlertsController(req, res) {
  try {
    const FraudReport = mongoose.model("FraudReport");
    const days = Number(req.query.days || 7);
    const since = new Date();
    since.setDate(since.getDate() - Math.max(1, days - 1));

    // Aggregate reports by fraudNumber since timeframe
    const agg = await FraudReport.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$fraudNumber",
          count: { $sum: 1 },
          lastSeen: { $first: "$createdAt" },
          lastDetails: { $first: "$details" },
        },
      },
      { $sort: { count: -1, lastSeen: -1 } },
      { $limit: 50 },
    ]);

    const recent = agg.map((a) => ({
      fraudNumber: a._id,
      count: a.count,
      severity: severityFromCount(a.count),
      lastSeen: a.lastSeen,
      details: a.lastDetails,
    }));

    return res.json({ items: recent });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}

export async function SummaryAlertsController(req, res) {
  try {
    const FraudReport = mongoose.model("FraudReport");
    const days = Number(req.query.days || 7);
    const since = new Date();
    since.setDate(since.getDate() - Math.max(1, days - 1));

    const agg = await FraudReport.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: "$fraudNumber",
          count: { $sum: 1 },
        },
      },
    ]);

    let critical = 0,
      high = 0,
      medium = 0,
      low = 0;
    for (const a of agg) {
      const s = severityFromCount(a.count);
      if (s === "critical") critical++;
      else if (s === "high") high++;
      else if (s === "medium") medium++;
      else low++;
    }

    const totalUnique = agg.length;

    // Top flagged numbers
    const top = [...agg]
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((t) => ({ fraudNumber: t._id, count: t.count }));

    return res.json({ critical, high, medium, low, totalUnique, top });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}
