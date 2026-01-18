import React, { useEffect, useMemo, useState } from "react";

const SeverityBadge = ({ s }) => {
  const map = {
    critical: "bg-rose-100 text-rose-700 border border-rose-200",
    high: "bg-amber-100 text-amber-700 border border-amber-200",
    medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    low: "bg-green-50 text-green-700 border border-green-200",
  };
  const label = s.charAt(0).toUpperCase() + s.slice(1);
  return (
    <span
      className={`px-2 py-1 rounded text-xs ${map[s] || "bg-gray-100 text-gray-700"}`}
    >
      {label}
    </span>
  );
};

const AlertsFeed = () => {
  const [recent, setRecent] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("all");
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [rResp, sResp] = await Promise.all([
        fetch("/api/alerts/recent"),
        fetch("/api/alerts/summary"),
      ]);
      const rJson = await rResp.json();
      const sJson = await sResp.json();
      if (!rResp.ok)
        throw new Error(rJson?.error || "Failed to load recent alerts");
      if (!sResp.ok) throw new Error(sJson?.error || "Failed to load summary");
      setRecent(rJson.items || []);
      setSummary(sJson);
    } catch (e) {
      setError(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return recent.filter((item) => {
      const matchesSeverity = severity === "all" || item.severity === severity;
      const matchesQuery = !query || String(item.fraudNumber).includes(query);
      return matchesSeverity && matchesQuery;
    });
  }, [recent, severity, query]);

  if (loading) return <div className="p-6">Loading alerts…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-2xl font-bold">Alerts</div>
              <div className="text-blue-100 text-sm">
                Community fraud reports and auto-flags
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-white text-sm"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
              <div className="text-xs text-gray-500">Critical</div>
              <div className="text-xl font-bold text-rose-600">
                {summary.critical}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
              <div className="text-xs text-gray-500">High</div>
              <div className="text-xl font-bold text-amber-600">
                {summary.high}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
              <div className="text-xs text-gray-500">Medium</div>
              <div className="text-xl font-bold text-yellow-600">
                {summary.medium}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
              <div className="text-xs text-gray-500">Low</div>
              <div className="text-xl font-bold text-green-600">
                {summary.low}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
              <div className="text-xs text-gray-500">Unique Numbers</div>
              <div className="text-xl font-bold text-gray-900">
                {summary.totalUnique}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="all">All severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search number"
              className="px-3 py-2 border rounded-lg flex-1"
            />
          </div>
        </div>

        {/* Feed */}
        <div className="bg-white rounded-2xl shadow border border-gray-100">
          <ul className="divide-y">
            {filtered.map((item, i) => (
              <li key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeverityBadge s={item.severity} />
                  <div>
                    <div className="font-semibold">{item.fraudNumber}</div>
                    <div className="text-xs text-gray-500">
                      Last seen: {new Date(item.lastSeen).toLocaleString()}
                    </div>
                    {item.details && (
                      <div className="text-sm text-gray-700 mt-1 line-clamp-2">
                        {item.details}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {item.count} reports
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="p-6 text-gray-500">
                No alerts match your filters.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertsFeed;
