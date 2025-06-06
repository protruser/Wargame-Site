// src/pages/scoreboard/Scoreboard.jsx
import React, { useEffect, useState } from "react";
import ScoreChart from "./ScoreChart";
import ScoreTable from "./ScoreTable";

export default function Scoreboard() {
  // 백엔드에서 받아온 전체 응답
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 백엔드가 3000번 포트에서 동작하므로 CORS 혹은 proxy 설정이 필요할 수 있음
    fetch("http://localhost:3000/api/statistics")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setRawData(json.data); // json.data 안에 배열이 들어 있음
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading…</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <main className="pt-[60px] bg-gray-900 text-white min-h-screen">
      <header className="py-16 text-center text-4xl">Scoreboard</header>
      <div className="max-w-5xl mx-auto space-y-12 px-4">
        {/* Chart 컴포넌트에 rawData(Top 10 user 객체 배열) 넘기기 */}
        <ScoreChart data={rawData} />
        {/* Table 컴포넌트에 rawData(Top 10 user 객체 배열) 넘기기 */}
        <ScoreTable rows={rawData} />
      </div>
    </main>
  );
}
