// src/pages/challenges/Challenges.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ChallengeCard from "./ChallengeCard";
import ChallengeModal from "./ChallengeModal";
import authFetch from "../../utils/authFetch";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [info, setInfo] = useState(null);
  const [active, setActive] = useState(null);

  // 1) 로그인 토큰 체크
  const token = localStorage.getItem("token");
  if (!token) {
    // 토큰이 없으면 로그인 페이지로
    return <Navigate to="/login" replace />;
  }

  // 2) 글로벌 스타일 override
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.maxWidth = "none";
      root.style.margin = "0";
      root.style.padding = "0";
    }
    return () => {
      if (root) {
        root.style.maxWidth = "";
        root.style.margin = "";
        root.style.padding = "";
      }
    };
  }, []);

  // 3) 데이터 fetch
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/api/challenge", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
      authFetch("http://localhost:3000/api/challenge/information").then((r) =>
        r.json()
      ),
    ])
      .then(([list, myInfo]) => {
        setChallenges(list.sort((a, b) => a.score - b.score));
        setInfo(myInfo);
      })
      .catch(console.error);
  }, [token]);

  // 로딩 처리
  if (!info) {
    return <div className="pt-[60px] p-6 text-center">Loading…</div>;
  }

  // solved 계산
  const solvedSet = new Set(
    challenges
      .filter((c) => info[`challenge_${c.challenge_id}_time`] !== 0)
      .map((c) => c.challenge_id)
  );
  const solvedCount = solvedSet.size;
  const progress = ((solvedCount / challenges.length) * 100).toFixed(0);

  return (
    <div className="fixed top-0 left-0 w-screen min-h-screen bg-gray-900 text-white overflow-auto">
      <main className="flex flex-col items-center pt-[60px] px-4 w-full">
        {/* 헤더 */}
        <header className="py-8 text-center w-full">
          <h1 className="text-3xl font-bold">Challenges</h1>
          <p className="text-gray-400">
            {solvedCount}/{challenges.length} solved
          </p>
        </header>

        {/* 카드 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {challenges.map((ch) => (
            <ChallengeCard
              key={ch.challenge_id}
              data={ch}
              solved={solvedSet.has(ch.challenge_id)}
              onClick={() => setActive(ch)}
            />
          ))}
        </div>

        {/* 진행률 바 */}
        <div className="w-full mt-8 relative max-w-4xl">
          <div className="h-8 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full overflow-hidden animate-pulse">
            <div
              className="h-full bg-white/30 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="absolute inset-0 flex justify-center items-center text-base font-semibold text-white">
            {progress}%
          </span>
        </div>

        {/* 모달 */}
        {active && (
          <ChallengeModal challenge={active} onClose={() => setActive(null)} />
        )}
      </main>
    </div>
  );
}
