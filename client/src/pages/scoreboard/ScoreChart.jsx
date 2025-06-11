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
  // 1) Top 10 필터
  const top10 = data
    .filter((u) => u.rank >= 1 && u.rank <= 10)
    .sort((a, b) => a.rank - b.rank);

  // 2) 모든 타임스탬프 수집 및 정렬
  const allTimestamps = Array.from(
    new Set(top10.flatMap((u) => u.points.map((p) => p.timestamp)))
  ).sort((a, b) => new Date(a) - new Date(b));

  // 3) 유저별 누적 점수 맵 생성
  const userCumMap = {};
  top10.forEach((user) => {
    // iso 문자열 정렬
    const sorted = [...user.points].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    let cum = 0;
    const map = {};
    sorted.forEach((p) => {
      cum += p.score;
      map[p.timestamp] = cum;
    });
    userCumMap[user.username] = map;
  });

  // 4) 차트용 데이터 생성
  const chartData = allTimestamps.map((ts) => {
    const row = { timestamp: ts };
    top10.forEach((user) => {
      row[user.username] = userCumMap[user.username][ts] ?? null;
    });
    return row;
  });

  // 5) 색상 팔레트
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
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="timestamp"
              type="category"
              interval={0}
              tickFormatter={(ts) =>
                new Date(ts).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              stroke="#DDD"
            />
            <YAxis
              stroke="#DDD"
              domain={[0, "dataMax + 10"]}
              allowDataOverflow={true}
            />
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
            {top10.map((user, idx) => (
              <Line
                key={user.username}
                type="monotone"
                dataKey={user.username}
                stroke={colors[idx]}
                dot={false}
                strokeWidth={2}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
