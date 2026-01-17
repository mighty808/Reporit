import React, { useEffect, useMemo, useState } from "react";

const classNames = (...xs) => xs.filter(Boolean).join(" ");

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-2xl shadow p-5 border border-gray-100">
    <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
    <div className="h-6 w-20 bg-gray-200 rounded" />
  </div>
);

const KpiCard = ({
  label,
  value,
  icon,
  accent = "from-blue-600 to-blue-700",
}) => (
  <div className="relative overflow-hidden bg-white rounded-2xl shadow p-5 border border-gray-100">
    <div
      className={classNames(
        "absolute -top-6 -right-6 h-24 w-24 opacity-10 rounded-full blur-xl",
        "bg-linear-to-br",
        accent,
      )}
    />
    <div className="flex items-center gap-3">
      <div
        className={classNames(
          "h-10 w-10 rounded-xl flex items-center justify-center text-white",
          "bg-linear-to-br",
          accent,
        )}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
      </div>
    </div>
  </div>
);

const Donut = ({ segments, size = 140, thickness = 18 }) => {
  // segments: [{ value, color }]
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let current = 0;
  const stops = segments
    .map((s) => {
      const start = Math.round((current / total) * 360);
      current += s.value;
      const end = Math.round((current / total) * 360);
      return `${s.color} ${start}deg ${end}deg`;
    })
    .join(", ");
  const style = {
    width: size,
    height: size,
    background: `conic-gradient(${stops})`,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
  };
  const innerStyle = {
    width: size - thickness * 2,
    height: size - thickness * 2,
    background: "white",
    borderRadius: "50%",
  };
  return (
    <div style={style}>
      <div style={innerStyle} />
    </div>
  );
};

const Sparkline = ({ points, width = 320, height = 80, color = "#2563EB" }) => {
  const max = Math.max(...points, 1);
  const step = points.length > 1 ? width / (points.length - 1) : width;
  const path = points
    .map((p, i) => `${i * step},${height - (p / max) * height}`)
    .join(" ");
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="2" points={path} />
    </svg>
  );
};

const RecipientRow = ({ name, phone, count, max }) => {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  const initials = (name || "?")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <li className="py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
          {initials}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-gray-500">{phone}</div>
        </div>
      </div>
      <div className="w-40">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-blue-600 rounded"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="text-sm w-16 text-right">{count} tx</div>
    </li>
  );
};

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    setLoading(true);
    setError("");
    try {
      const resp = await fetch("/api/analytics/summary");
      const json = await resp.json();
      if (!resp.ok) throw new Error(json?.error || "Failed to load analytics");
      setData(json);
    } catch (e) {
      setError(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const exportJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-summary-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Header onRefresh={fetchSummary} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 h-48 animate-pulse" />
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 h-48 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Header onRefresh={fetchSummary} onExport={exportJson} />
          <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const maxRecent = Math.max(...data.recentReports.map((r) => r.count), 0);
  const maxTop = Math.max(...data.topRecipients.map((t) => t.count), 0);
  const normalCount = Math.max(
    data.totalTransactions - data.highAmountCount,
    0,
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Header onRefresh={fetchSummary} onExport={exportJson} />

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KpiCard
            label="Total Transactions"
            value={data.totalTransactions}
            icon={<span>🔄</span>}
          />
          <KpiCard
            label="Avg Amount (GHS)"
            value={data.avgAmount.toFixed(2)}
            icon={<span>₵</span>}
            accent="from-emerald-600 to-emerald-700"
          />
          <KpiCard
            label="High Amount (≥1000)"
            value={data.highAmountCount}
            icon={<span>⚡</span>}
            accent="from-amber-500 to-orange-600"
          />
          <KpiCard
            label="Reported Fraud"
            value={data.fraudReports}
            icon={<span>🚨</span>}
            accent="from-rose-600 to-pink-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Composition donut + sparkline */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-xl mr-3">📊</div>
              <div>
                <div className="text-xl font-bold">Transaction Composition</div>
                <div className="text-gray-600 text-sm">
                  High vs normal amounts
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Donut
                segments={[
                  { value: data.highAmountCount, color: "#F59E0B" },
                  { value: normalCount, color: "#22C55E" },
                ]}
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: "#F59E0B" }}
                  />{" "}
                  <span className="text-sm">
                    High (≥1000): {data.highAmountCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: "#22C55E" }}
                  />{" "}
                  <span className="text-sm">Normal: {normalCount}</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-xs text-gray-500 mb-2">
                Fraud Reports Trend (7 days)
              </div>
              <Sparkline points={data.recentReports.map((r) => r.count)} />
            </div>
          </div>

          {/* Top recipients */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-xl mr-3">📈</div>
              <div>
                <div className="text-xl font-bold">Top Recipients</div>
                <div className="text-gray-600 text-sm">
                  By transaction frequency
                </div>
              </div>
            </div>
            <ul className="divide-y">
              {data.topRecipients.map((t, i) => (
                <RecipientRow
                  key={i}
                  name={t.name}
                  phone={t.phone}
                  count={t.count}
                  max={maxTop}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ onRefresh, onExport }) => (
  <div className="mb-8">
    <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-xl">📊</div>
          <div>
            <div className="text-2xl font-bold">Community Analytics</div>
            <div className="text-blue-100 text-sm">
              Live overview of transactions and reported fraud
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-white text-sm"
            >
              Refresh
            </button>
          )}
          {onExport && (
            <button
              onClick={onExport}
              className="px-4 py-2 rounded-xl bg-white text-blue-700 text-sm font-semibold"
            >
              Export JSON
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticsDashboard;
