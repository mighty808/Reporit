import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  RefreshCw,
  Search,
  Filter,
  AlertCircle,
  ChevronRight,
  Clock,
  Shield,
  TrendingUp,
  X,
} from "lucide-react";

const SeverityBadge = ({ severity }) => {
  const severityConfig = {
    critical: {
      label: "Critical",
      className: "bg-red-50 text-red-700 border-red-100",
      icon: "🔴",
    },
    high: {
      label: "High",
      className: "bg-orange-50 text-orange-700 border-orange-100",
      icon: "🟠",
    },
    medium: {
      label: "Medium",
      className: "bg-yellow-50 text-yellow-700 border-yellow-100",
      icon: "🟡",
    },
    low: {
      label: "Low",
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: "🟢",
    },
  };

  const config = severityConfig[severity] || {
    label: severity.charAt(0).toUpperCase() + severity.slice(1),
    className: "bg-gray-50 text-gray-700 border-gray-100",
    icon: "⚪",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.className}`}
    >
      <span className="text-xs">{config.icon}</span>
      <span className="text-sm font-medium">{config.label}</span>
    </div>
  );
};

const SummaryCard = ({ title, value, color, icon: Icon, trend }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between mb-2">
      <div className={`p-2 rounded-lg ${color.bg}`}>
        <Icon className={`w-4 h-4 ${color.text}`} />
      </div>
      {trend && (
        <div
          className={`text-xs font-medium px-1.5 py-0.5 rounded ${trend > 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}
        >
          {trend > 0 ? `+${trend}%` : `${trend}%`}
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500 mt-1">{title}</div>
  </div>
);

const AlertItem = ({ item, onClick }) => (
  <div
    className="p-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer group"
    onClick={() => onClick?.(item)}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <SeverityBadge severity={item.severity} />
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(item.lastSeen).toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="font-mono font-bold text-lg bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {item.fraudNumber}
          </div>
          <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            {item.count} {item.count === 1 ? "report" : "reports"}
          </div>
        </div>

        {item.details && (
          <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-900 transition-colors">
            {item.details}
          </p>
        )}

        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
          {item.source && (
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              {item.source}
            </span>
          )}
          {item.region && (
            <span className="bg-gray-100 px-2 py-0.5 rounded">
              {item.region}
            </span>
          )}
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100" />
    </div>
  </div>
);

const AlertsFeed = () => {
  const [recent, setRecent] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    setError("");
    try {
      const [recentResp, summaryResp] = await Promise.all([
        fetch("/api/alerts/recent"),
        fetch("/api/alerts/summary"),
      ]);

      if (!recentResp.ok || !summaryResp.ok) {
        throw new Error("Failed to fetch alerts data");
      }

      const [recentData, summaryData] = await Promise.all([
        recentResp.json(),
        summaryResp.json(),
      ]);

      setRecent(recentData.items || []);
      setSummary(summaryData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Unable to load alerts. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const filteredAlerts = useMemo(() => {
    return recent.filter((alert) => {
      const matchesSeverity =
        selectedSeverity === "all" || alert.severity === selectedSeverity;
      const matchesSearch =
        !searchQuery ||
        String(alert.fraudNumber).includes(searchQuery) ||
        (alert.details &&
          alert.details.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSeverity && matchesSearch;
    });
  }, [recent, selectedSeverity, searchQuery]);

  const severityCounts = useMemo(() => {
    const counts = { critical: 0, high: 0, medium: 0, low: 0 };
    recent.forEach((alert) => {
      if (counts[alert.severity] !== undefined) {
        counts[alert.severity]++;
      }
    });
    return counts;
  }, [recent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading security alerts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to Load Alerts
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Security Alerts
              </h1>
              <p className="text-gray-600 mt-2">
                Real-time fraud detection and community reports
              </p>
            </div>
            <div className="flex items-center gap-3">
              {lastUpdated && (
                <div className="text-sm text-gray-500">
                  Updated{" "}
                  {lastUpdated.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
              <button
                onClick={fetchData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Summary Dashboard */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <SummaryCard
              title="Critical Alerts"
              value={summary.critical}
              color={{ bg: "bg-red-50", text: "text-red-600" }}
              icon={AlertCircle}
              trend={summary.criticalTrend}
            />
            <SummaryCard
              title="High Priority"
              value={summary.high}
              color={{ bg: "bg-orange-50", text: "text-orange-600" }}
              icon={TrendingUp}
              trend={summary.highTrend}
            />
            <SummaryCard
              title="Medium"
              value={summary.medium}
              color={{ bg: "bg-yellow-50", text: "text-yellow-600" }}
              icon={AlertCircle}
            />
            <SummaryCard
              title="Low"
              value={summary.low}
              color={{ bg: "bg-emerald-50", text: "text-emerald-600" }}
              icon={AlertCircle}
            />
            <SummaryCard
              title="Unique Numbers"
              value={summary.totalUnique}
              color={{ bg: "bg-blue-50", text: "text-blue-600" }}
              icon={Shield}
            />
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Severity Filters */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Severity
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSeverity("all")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedSeverity === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  All ({recent.length})
                </button>
                {Object.entries(severityCounts).map(([sev, count]) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(sev)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedSeverity === sev ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {sev.charAt(0).toUpperCase() + sev.slice(1)} ({count})
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="lg:w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search numbers or details..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Alerts ({filteredAlerts.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert, index) => (
                <AlertItem
                  key={`${alert.fraudNumber}-${index}`}
                  item={alert}
                  onClick={setSelectedAlert}
                />
              ))
            ) : (
              <div className="p-12 text-center">
                <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No alerts found
                </h3>
                <p className="text-gray-600">
                  {recent.length === 0
                    ? "No alerts reported yet."
                    : "Try adjusting your filters or search term."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Alert Detail Modal */}
        {selectedAlert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Alert Details
                  </h3>
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <SeverityBadge severity={selectedAlert.severity} />
                    <div className="text-sm text-gray-500">
                      {selectedAlert.count}{" "}
                      {selectedAlert.count === 1 ? "report" : "reports"}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Phone Number
                    </h4>
                    <div className="text-2xl font-bold font-mono text-gray-900">
                      {selectedAlert.fraudNumber}
                    </div>
                  </div>

                  {selectedAlert.details && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Description
                      </h4>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedAlert.details}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        First Reported
                      </h4>
                      <p className="text-gray-900">
                        {new Date(
                          selectedAlert.firstSeen || selectedAlert.lastSeen,
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Last Seen
                      </h4>
                      <p className="text-gray-900">
                        {new Date(selectedAlert.lastSeen).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsFeed;
