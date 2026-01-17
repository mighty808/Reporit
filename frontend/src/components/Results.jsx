import React from "react";

const Results = ({ data, loading }) => {
  if (loading) return null;
  if (!data) {
    return (
      <div className="text-sm text-gray-500">
        No results yet. Submit the form to check.
      </div>
    );
  }

  const { ok, riskScore, reasons = [] } = data;

  return (
    <div
      className={`rounded-xl border p-4 ${ok ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}`}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">
          {ok ? "Low Risk" : "Potential Risk Detected"}
        </div>
        <div className="text-sm font-mono">
          Risk Score: <span className="font-bold">{riskScore}</span>
        </div>
      </div>
      {reasons.length > 0 && (
        <ul className="mt-3 list-disc list-inside text-sm text-gray-800">
          {reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
