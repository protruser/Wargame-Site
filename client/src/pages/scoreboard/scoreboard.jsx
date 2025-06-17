// src/pages/scoreboard/Scoreboard.jsx
import React, { useEffect, useState } from "react";
import ScoreChart from "./ScoreChart";
import ScoreTable from "./ScoreTable";

// Scoreboard component: Displays user statistics via chart and table
export default function Scoreboard() {
  const [rawData, setRawData] = useState(null); // Data fetched from API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch user statistics from backend
    fetch("http://localhost:3000/api/user/statistics")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setRawData(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Show loading indicator
  if (loading) {
    return (
      <div className="pt-[60px] p-8 text-center text-gray-200">Loading…</div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="pt-[60px] p-8 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="pt-[60px] flex-none w-screen ml-0 bg-gray-900 text-white min-h-screen">
      {/* Page title */}
      <header className="py-8 text-center text-3xl font-semibold">
        Scoreboard
      </header>

      {/* Main content section */}
      <div className="w-full space-y-12 px-4">
        {/* Chart section */}
        <div className="w-full">
          <ScoreChart data={rawData} />
        </div>

        {/* Table section */}
        <div className="w-full">
          <ScoreTable rows={rawData} />
        </div>
      </div>
    </main>
  );
}
