import mongoose from "mongoose";
import "../models/Transaction.js";
import "../models/FraudReport.js";

export async function SummaryAnalyticsController(req, res) {
  try {
    const Transaction = mongoose.model("Transaction");
    const FraudReport = mongoose.model("FraudReport");

    const [
      totalTransactions,
      highAmountCount,
      avgAmountAgg,
      topRecipients,
      fraudReports,
    ] = await Promise.all([
      Transaction.countDocuments({}),
      Transaction.countDocuments({ amount: { $gte: 1000 } }),
      Transaction.aggregate([
        { $group: { _id: null, avg: { $avg: "$amount" } } },
      ]),
      Transaction.aggregate([
        {
          $group: {
            _id: "$recipientPhoneNumber",
            count: { $sum: 1 },
            name: { $first: "$recipientName" },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      FraudReport.countDocuments({}),
    ]);

    const avgAmount = avgAmountAgg?.[0]?.avg || 0;

    // Recent reports (last 7 days)
    const since = new Date();
    since.setDate(since.getDate() - 6); // include today + previous 6 days
    const reportsByDay = await FraudReport.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: {
            y: { $year: "$createdAt" },
            m: { $month: "$createdAt" },
            d: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.y": 1, "_id.m": 1, "_id.d": 1 } },
    ]);

    // Normalize into last 7 days array
    const dayKey = (date) =>
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const counts = new Map();
    for (const r of reportsByDay) {
      const key = `${r._id.y}-${r._id.m}-${r._id.d}`;
      counts.set(key, r.count);
    }
    const recent = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = dayKey(d);
      recent.push({ date: key, count: counts.get(key) || 0 });
    }

    return res.json({
      totalTransactions,
      avgAmount,
      highAmountCount,
      fraudReports,
      topRecipients: topRecipients.map((t) => ({
        phone: t._id,
        name: t.name,
        count: t.count,
      })),
      recentReports: recent,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}
