import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScorePieChart from "./ScorePieChart";
import ScoreAreaChart from "./ScoreAreaChart";
import ScoreTable from "./ScoreTable";

/**
 * MyScore component fetches user score data and displays summary charts and table.
 */
export default function MyScore() {
  const navigate = useNavigate();
  const { nickname: routeNickname } = useParams();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user score data on mount or when route changes
  useEffect(() => {
    const isOther = Boolean(routeNickname);
    const url = isOther
      ? `http://localhost:3000/api/my_score/${encodeURIComponent(
          routeNickname
        )}`
      : "http://localhost:3000/api/my_score";

    const options = { method: "GET", headers: {} };
    if (!isOther && token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          if (!isOther && res.status === 401) throw new Error("Unauthorized");
          throw new Error("Failed to fetch statistics");
        }
        return res.json();
      })
      .then(setUserData)
      .catch((err) => {
        console.error(err);
        setError("Failed to load data");
        if (!isOther) {
          localStorage.clear();
          navigate("/login");
        }
      });
  }, [routeNickname, token, navigate]);

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  const { nickname, rank, total_score, success_rate = 0, points } = userData;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-5xl bg-gray-800 rounded-xl p-10 shadow-lg">
        {/* User header info */}
        <h2 className="text-3xl font-bold text-center mb-4">{nickname}</h2>
        <p className="text-center text-lg mb-6">
          <span className="font-bold">#{rank}</span> &middot; {total_score} pts
        </p>

        {points.length === 0 ? (
          <p className="text-center text-gray-400 mt-12">No solves yet</p>
        ) : (
          <>
            {/* Success rate donut chart */}
            <div className="flex justify-center mb-10">
              <ScorePieChart successRate={success_rate} />
            </div>
            {/* Cumulative score area chart */}
            <div className="mb-10">
              <ScoreAreaChart points={points} />
            </div>
            {/* Challenge detail table */}
            <ScoreTable points={points} />
          </>
        )}
      </div>
    </div>
  );
}
