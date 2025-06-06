// src/pages/scoreboard/Scoreboard.jsx
import React, { useEffect, useState } from "react";
import ScoreChart from "./ScoreChart";
import ScoreTable from "./ScoreTable";

export default function Scoreboard() {
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vite 프록시를 사용하지 않으므로 절대 경로
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

  if (loading) {
    return (
      <div className="pt-[60px] p-8 text-center text-gray-200">Loading…</div>
    );
  }
  if (error) {
    return (
      <div className="pt-[60px] p-8 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    // ① flex-none: body가 flex 여도 메인 컨테이너가 축소되지 않도록
    // ② w-screen: 가급적 화면 전체 너비(100vw)를 차지하도록
    // ③ ml-0 (또는 left-0) 과 같은 margin/offset을 줘서 좌측 정렬을 명시
    <main className="pt-[60px] flex-none w-screen ml-0 bg-gray-900 text-white min-h-screen">
      {/* ─── 페이지 상단 타이틀 ─────────────────────────────── */}
      <header className="py-8 text-center text-3xl font-semibold">
        Scoreboard
      </header>

      {/* ─── 콘텐츠 영역 (가로 100%) ──────────────────────── */}
      <div className="w-full space-y-12 px-4">
        {/* ─ 차트: 부모가 w-full 이므로 화면 전체 폭을 차지합니다 ─ */}
        <div className="w-full">
          <ScoreChart data={rawData} />
        </div>

        {/* ─ 테이블: 부모가 w-full 이므로 화면 전체 폭을 차지합니다 ─ */}
        <div className="w-full">
          <ScoreTable rows={rawData} />
        </div>
      </div>
    </main>
  );
}
