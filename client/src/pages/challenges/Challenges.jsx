// src/pages/challenges/Challenges.jsx
import React, { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard";
import ChallengeModal from "./ChallengeModal";
import authFetch from "../../utils/authFetch"; // 토큰 자동 부착

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [info, setInfo] = useState(null); // { challenge_1_time, challenge_2_time, ... }
  const [active, setActive] = useState(null);

  // ① 문제 목록 + 내 solved 정보 동시 로드
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/api/challenge").then((r) => r.json()),
      authFetch("http://localhost:3000/api/challenge/information").then((r) =>
        r.json()
      ),
    ])
      .then(([list, myInfo]) => {
        setChallenges(list.sort((a, b) => a.score - b.score));
        setInfo(myInfo);
      })
      .catch(console.error);
  }, []);

  // 아직 info가 로드되지 않았으면 로딩 표시
  if (!info) {
    return <div className="pt-[60px] p-6 text-center">Loading…</div>;
  }

  // ② solved 계산: time !== 0
  const solvedSet = new Set(
    challenges
      .filter((c) => info[`challenge_${c.challenge_id}_time`] !== 0)
      .map((c) => c.challenge_id)
  );

  const solvedCount = solvedSet.size;
  const progress = ((solvedCount / challenges.length) * 100).toFixed(0);

  return (
    <main className="pt-[60px] bg-gray-900 min-h-screen text-white px-4">
      {/* 헤더 & 진행률 */}
      <header className="py-8 text-center">
        <h1 className="text-3xl font-bold">Challenges</h1>
        <p className="text-gray-400">
          {solvedCount}/{challenges.length} solved
        </p>
        <div className="w-full bg-gray-700 rounded h-3 mt-2 max-w-2xl mx-auto">
          <div
            className="h-3 bg-teal-500 rounded transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* 카드 그리드 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((ch) => (
          <ChallengeCard
            key={ch.challenge_id}
            data={ch}
            solved={solvedSet.has(ch.challenge_id)}
            onClick={() => setActive(ch)}
          />
        ))}
      </div>

      {/* 문제 모달 */}
      {active && (
        <ChallengeModal challenge={active} onClose={() => setActive(null)} />
      )}
    </main>
  );
}
