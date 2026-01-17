import React, { useState } from "react";

const ReportForm = () => {
  const [fraudNumber, setFraudNumber] = useState("");
  const [details, setDetails] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fraudNumber || !details) {
      setError("Please provide the fraud number and details.");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch("/api/reports/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fraudNumber, details, reporterPhone }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        const msg =
          data?.errors?.join?.(", ") || data?.error || "Request failed";
        setError(msg);
      } else {
        setSuccess("Report submitted. Thank you for helping the community.");
        setFraudNumber("");
        setDetails("");
        setReporterPhone("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Report Fraud</h1>
            <p className="text-gray-600 mt-1">
              Share a suspected fraud number or details.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Fraud Phone Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={fraudNumber}
                onChange={(e) => setFraudNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                placeholder="e.g., 0551234567"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Details
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                placeholder="Describe what happened, amounts, context, etc."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Your Phone (optional)
              </label>
              <input
                type="text"
                value={reporterPhone}
                onChange={(e) => setReporterPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                placeholder="e.g., 0244123456"
              />
              <p className="text-xs text-gray-500">
                Optional, to follow up if needed.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-red-600 to-orange-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-orange-700 hover:to-red-800 transition-all duration-200 disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Submitting…" : "Submit Report"}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
