// src/pages/scoreboard/ScoreChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ScoreChart({ data }) {
  // 1) timestamp들을 모두 모아서 정렬
  const allTimestamps = Array.from(
    new Set(data.flatMap((user) => user.points.map((p) => p.timestamp)))
  ).sort((a, b) => new Date(a) - new Date(b));

  // 2) 사용자별로 timestamp→score 맵 생성
  const userScoreMap = {};
  data.forEach((user) => {
    userScoreMap[user.username] = Object.fromEntries(
      user.points.map((p) => [p.timestamp, p.score])
    );
  });

  // 3) Recharts에 넘길 데이터 형태로 가공
  const chartData = allTimestamps.map((ts) => {
    const row = { timestamp: ts };
    data.forEach((user) => {
      row[user.username] = userScoreMap[user.username][ts] ?? null;
    });
    return row;
  });

  // 색상 팔레트 (최대 10명 커버)
  const colors = [
    "#A855F7",
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",
    "#F97316",
    "#22D3EE",
    "#F43F5E",
  ];

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">
        Top 10 Users Over Time
      </h3>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(ts) =>
                new Date(ts).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              stroke="#DDD"
            />
            <YAxis stroke="#DDD" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
              itemStyle={{ color: "#FFF" }}
              labelFormatter={(label) =>
                new Date(label).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }
            />
            <Legend wrapperStyle={{ color: "#FFF" }} />
            {data.map((user, idx) => (
              <Line
                key={user.username}
                type="monotone"
                dataKey={user.username}
                stroke={colors[idx % colors.length]}
                dot={false}
                strokeWidth={2}
                connectNulls={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
